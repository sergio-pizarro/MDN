jQuery.support.cors = true;
var appAtencion = new Vue({
    el: '#contAtencion',
    data: {
        filtros: {
            estado: [],
        },
        modelos: {
            estado: '',
        }
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {
        obtenerLead() {
            $("#tblAtencion").bootstrapTable({
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-atencion`
            });
        },

        obtenerEstados() {
            let oficina = getCookie("Oficina");
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estados/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },

        cargaLeadFiltroCliente() {
            $("#tblAtencion").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/leads-filtro`,
                query: {
                    estado: $('#dllEstadoCliente').val(),
                    requerimiento: $('#slRequerimiento').val(),
                    rut: $('#txtRutFiltro').val(),
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterGestion(value, row, index) {
    // return `<button class="btn btn-primary btn-icon btn-circle editaWapp" data-id="${row.id}"><i class="demo-psi-pen-5 icon-xs add-tooltip" data-toggle="tooltip" data-original-title="Actualiza datos"></i></button>`;
}

function formaterRut(value, row, index) {
    let estado = "";
    if (row.ultimaGestion != null) {
        estado = row.ultimaGestion.estado
    }
    return `<a href="${value}" class="btn-link" data-estado="${estado}" data-rutcompleto="${row.rut}-${row.dv}" data-rut="${row.rut}" data-nombre="${row.nombre}"  data-toggle="modal" data-target="#modal_atencion_cliente" data-backdrop="static" data-keyboard="false">${value}</a>`;
}

var appAtencionModal = new Vue({
    el: '#modal_atencion_cliente',
    data: {
        filtros: {
            estado: [],
            sucursal: [],
        },
        modelos: {
            estado: '',
            sucursal: '',
        },
        dataModal: {},
        dataModalHist: {},
        dataModalDif: {},
        dataModaPop: {},
    },
    mounted() {
        this.obtenerEstadosModal();
        this.obtenerSucursal();
    },
    methods: {
        obtenerLeadAtencion(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lead/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                })
        },

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/historial/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalHist = datos;
                    return datos
                })
        },
        obtenerDiferimiento(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-diferimiento/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalDif = datos[0];

                    if (datos[0].validacion_mail == true) {
                        $("#checkMail").prop("checked", true);
                    }
                    else {
                        $("#checkMail").prop("checked", false);
                    }
                    if (datos[0].validacion_web == true) {
                        $("#checkWeb").prop("checked", true);
                    }
                    else {
                        $("#checkWeb").prop("checked", false);
                    }
                    if (datos[0].validacion_call == true) {
                        $("#checkCall").prop("checked", true);
                    }
                    else {
                        $("#checkCall").prop("checked", false);
                    }

                    return datos
                })
        },

        obtenerEstadosModal() {
            let oficina = getCookie("Oficina");
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estados/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },

        obtenerSucursal() {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-oficina`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(sucursalJSON => {
                    this.filtros.sucursal = sucursalJSON;
                });
        },
        obtenerEstadoPop(rut, estado) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estado-pop-up/${rut}/${estado}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModaPop = datos[0];

                    setTimeout(function () {
                        $("#dllEstadoClienteModal option:contains("+ datos[0].estado +")").attr('selected', true);

                        if (datos[0].estado == 'Volver a llamar') {
                            $("#divFechaCompromiso").css('display', 'block')
                            $("#ges_prox_compromiso").val(datos[0].fechaCompromiso)
                        }
                        else {
                            $("#divFechaCompromiso").css('display', 'none')
                        }
                        if (datos[0].estado == 'Diferimiento Aprobado') {
                            $("#divCovid").css('display', 'block')
                        }
                        else {
                            $("#divCovid").css('display', 'none')
                        }
                        if (datos[0].estado == 'Derivado a Sucursal') {
                            $("#divSucursalDerivacion").css('display', 'block')
                        }
                        else {
                            $("#divSucursalDerivacion").css('display', 'none')
                        }
                    }, 1200);
                    return datos
                })
        },
        handleSubmitGuadarGestion() {
            let v_comite_sucursal = $('#dllEstadoClienteModal').val()

            if ($('#dllEstadoClienteModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un estado.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 2 && $('#slSucursal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una sucursal.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 3) {
                if ($('#txtFolio').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar un folio.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtCuotaDiferir').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una cuota a diferir.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtMontoCuota').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar un monto cuota.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtPriCuotadif').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera cuota a diferir.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#ges_fecha_ven').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera fecha vencimiento actual.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#ges_new_fecha_ven').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera nueva fecha vencimiento.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
            }
            if ($('#dllEstadoClienteModal').val() == 4 || $('#dllEstadoClienteModal').val() == 13) {
                if ($('#ges_prox_compromiso').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una fecha de compromiso.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
            }

            if ($('#txtRespuesta').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una respuesta.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut_afiliado: $('#txtRutClie').val(),
                dv_afiliado: $('#txtdvClie').val(),
                nombre_afiliado: $('#txtNombreClie').val(),
                estado: $('select[name="dllEstadoClienteModal"] option:selected').text(),
                respuesta: $('#txtRespuesta').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                fecha_compromiso: $('#ges_prox_compromiso').val(),
                fono: $('#txtFonoClie').val(),
            };

            let mailCheck;
            if ($('#checkMail').prop('checked') == true) {
                mailCheck = 1;
            }
            else {
                mailCheck = 0;
            }
            const formDataDiferimiento = {
                rut_afiliado: $('#txtRutClie').val(),
                dv_afiliado: $('#txtdvClie').val(),
                folio: $('#txtFolio').val(),
                cuota_diferir: $('#txtCuotaDiferir').val(),
                monto_cuota: $('#txtMontoCuota').val(),
                primera_cuota_diferir: $('#txtPriCuotadif').val(),
                fecha_vencimiento: $('#ges_fecha_ven').val(),
                nueva_fecha_vencimiento: $('#ges_new_fecha_ven').val(),
                validacion_mail: mailCheck,
                validacion_web: 0,
                validacion_call: 0,
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };

            const formDataSucursal = {
                rut_afiliado: $('#txtRutClie').val(),
                oficina: $('#slSucursal').val(),
            };

            const formDataComite = {
                rut_afiliado: $('#txtRutClie').val(),
                oficina: 888,
            };


            if ($('#dllEstadoClienteModal').val() == 9) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/derivacion-sucursal`, {
                    method: 'POST',
                    body: JSON.stringify(formDataComite),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjAtencion',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Devuelta a Comite.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                });
            }

            if ($('#dllEstadoClienteModal').val() == 2) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/derivacion-sucursal`, {
                    method: 'POST',
                    body: JSON.stringify(formDataSucursal),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjAtencion',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Derivada a Sucursal.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                });
            }

            fetch(`http://${motor_api_server}:4002/atencion-cliente`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjAtencion',
                    timer: 3000
                });

            });

            if ($('#dllEstadoClienteModal').val() == 3) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/diferimiento`, {
                    method: 'POST',
                    body: JSON.stringify(formDataDiferimiento),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjDif',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Guardada Correctamente.',
                        container: '#msjDif',
                        timer: 3000
                    });
                });
            }
            setTimeout(function () {
                this.appAtencionModal.setDefaultsModal();
            }, 300);
            setTimeout(function () {
                this.appAtencionModal.obtenerHistorial($('#txtRutClie').val())
            }, 300);
            setTimeout(function () {
                this.appAtencion.cargaLeadFiltroCliente();
            }, 300);
        },
        setDefaultsModal() {
            //$('#txtFolio').val('')
            //$('#txtCuotaDiferir').val('')
            //$('#txtMontoCuota').val('')
            //$('#txtPriCuotadif').val('')
            //$('#ges_fecha_ven').val('')
            //$('#ges_new_fecha_ven').val('')
            $('#ges_prox_compromiso').val('')
            $('#slSucursal').val('').trigger('chosen:updated')
            $('#dllEstadoClienteModal').val('')
            $('#txtRespuesta').val('')
        },
        setDefaultsModalData() {
            this.dataModalDif = {}
            this.dataModaPop = {}
        }
    }
});


$('#modal_atencion_cliente').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    let rutCompleto = $(event.relatedTarget).data('rutcompleto')
    let estado = $(event.relatedTarget).data('estado')


    $('#dp-component-atencion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    $('#dp-component-fecha-vencimiento .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    $('#dp-component-nueva-fecha .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    appAtencionModal.obtenerLeadAtencion(rut)
    appAtencionModal.obtenerHistorial(rut)
    appAtencionModal.setDefaultsModal();
    appAtencionModal.obtenerDiferimiento(rutCompleto)
    appAtencionModal.obtenerEstadoPop(rut, estado)

    setTimeout(function () {
        $('.slSucursal').chosen({ width: '100%' });
    }, 800);
});

$('#modal_atencion_cliente').on('hidden.bs.modal', async (event) => {
    appAtencionModal.setDefaultsModalData();
    $("#divFechaCompromiso").css('display', 'none')
    $("#divCovid").css('display', 'none')
    $("#divSucursalDerivacion").css('display', 'none')
});

$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

$('#dllEstadoClienteModal').change(function (e) {

    switch (this.value) {

        case "4":
            $("#divFechaCompromiso").css('display', 'block')
            break;

        case "13":
            $("#divFechaCompromiso").css('display', 'block')
            break;
        case "3":
            $("#divCovid").css('display', 'block')
            break;

        case "2":
            $("#divSucursalDerivacion").css('display', 'block')
            break;
    }
    if (this.value != 4 && this.value != 13) {
        $("#divFechaCompromiso").css('display', 'none')
    }
    if (this.value != 3) {
        $("#divCovid").css('display', 'none')
    }
    if (this.value != 2) {
        $("#divSucursalDerivacion").css('display', 'none')
    }
});



















