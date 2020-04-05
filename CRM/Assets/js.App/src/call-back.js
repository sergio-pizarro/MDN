jQuery.support.cors = true;
var appCallBack = new Vue({
    el: '#callBack',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
        }
    },
    mounted() {
        this.obtenerLead();
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        eventoCambiaEstadoCall() {
            this.obtenerSubEstados(this.modelos.estados)
        },

        obtenerLead() {
            let oficina = getCookie("Oficina");
            $("#tblCall").bootstrapTable({
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-call/${oficina}`
            });
        },

        cargaLeadCall() {
            let oficina = getCookie("Oficina");
            $("#tblCall").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-call/${oficina}`,
            });
        },

        cargaLeadFiltroCall() {
            let estado = $('select[name="dllEstadoCall"] option:selected').text()
            let subEstado = $('select[name="dllSubEstadoCall"] option:selected').text()
            if (estado == 'Todos...') {
                estado = ""
            }
            if (subEstado == 'Todos...') {
                subEstado = ""
            }

            $("#tblCall").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/leads-filtro-call`,
                query: {
                    estado: estado,
                    sub_estado: subEstado,
                    rut: $('#txtRutFiltroCall').val(),
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    let estado = "";
    if (row.ultimaGestion != null) {
        estado = row.ultimaGestion.estado
    }
    return `<a href="${value}" class="btn-link" data-flujo="${row.flujo}" data-nombre="${row.nombre}" data-rut="${row.rut}" data-fono="${row.telefonoContacto}"  data-toggle="modal" data-target="#modal_atencion_call" data-backdrop="static" data-keyboard="false">${value}</a>`;
}

var appCallBackModal = new Vue({
    el: '#modal_atencion_call',
    data: {
        filtrosM: {
            estadosM: [],
            subEstadosM: [],
        },
        modelosM: {
            estadosM: '',
            subEstadosM: '',
        },
        dataModalHist: {},
    },
    mounted() {
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosM.estadosM = estadosJSON;
                    console.log({
                    })
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosM.subEstadosM = estadosSubJSON;
                });
        },
        eventoCambiaEstado() {

            this.obtenerSubEstados(this.modelosM.estadosM)

        },

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/historial-call-back/${rut}`, {
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

        handleSubmitGuadarGestion() {
            let sub_estado = '';
            if ($('#dllEstadoCallModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un estado.',
                    container: '#msjCall',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoCallModal').val() != 3) {
                if ($('#dllSubEstadoCallModal').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar un sub-estado.',
                        container: '#msjCall',
                        timer: 3000
                    });
                    return false;
                }
                else {
                    sub_estado = $('select[name="dllSubEstadoCallModal"] option:selected').text()
                }
            }
            else {
                sub_estado = "";
            }

            if ($('#txtRespuestaCall').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una respuesta.',
                    container: '#msjCall',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut: $('#txtRutCall').val(),
                nombre: $('#txtNombreCall').val(),
                estado: $('select[name="dllEstadoCallModal"] option:selected').text(),
                sub_estado: sub_estado,
                respuesta: $('#txtRespuestaCall').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                fono: $('#txtFonoCall').val(),
            };

            fetch(`http://${motor_api_server}:4002/atencion-cliente/guardar-gestion-call-back`, {
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
                        container: '#msjCall',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjCall',
                    timer: 3000
                });

            });
            setTimeout(function () {
                this.appCallBackModal.setDefaultsModalData();
            }, 300);
            setTimeout(function () {
                this.appCallBackModal.obtenerHistorial($('#txtRutCall').val())
            }, 300);
            setTimeout(function () {
                this.appCallBack.cargaLeadCall();
            }, 300);




            //this.appCallBack.obtenerLead();
        },
        setDefaultsModalData() {
            this.modelosM = {
                estadosM: '',
                subEstadosM: ''
            }
            $('#dllEstadoCallModal').val('')
            $('#dllSubEstadoCallModal').val('')
            $('#txtRespuestaCall').val('')
        }
    },
});


$('#modal_atencion_call').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    let fono = $(event.relatedTarget).data('fono')
    let nombre = $(event.relatedTarget).data('nombre')
    let flujo = $(event.relatedTarget).data('flujo')

    $('#txtRutCall').val(rut);
    $('#txtNombreCall').val(nombre);
    $('#txtFonoCall').val(fono);
    $('#txtFlujoCall').val(flujo);
    appCallBackModal.obtenerEstados();
    appCallBackModal.obtenerHistorial(rut);
});

$('#modal_atencion_call').on('hidden.bs.modal', async (event) => {
    $('#txtRutCall').val("");
    $('#txtFonoCall').val("");
    $('#txtRespuestaCall').val("");
});

$('#dllEstadoCallModal').change(function (e) {

    switch (this.value) {

        case "3":
            $("#dllSubEstadoCallModal").prop("disabled", true);
            setTimeout(function () {
                $("#dllSubEstadoCallModal").val("")
            }, 800);

            break;
    }
    if (this.value != 3) {
        $("#dllSubEstadoCallModal").prop("disabled", false);
    }
});

$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});




















