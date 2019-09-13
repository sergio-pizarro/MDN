jQuery.support.cors = true;
var appPensionadosFiltros = new Vue({
    el: '#contPensionados',
    data: {
        filtros: {
            comuna: [],
            prioridad: [],
            estados: [],
            //subEstados: [],
        },
        modelos: {
            comuna: '',
            prioridad: '',
            estados: '',
        }
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerPrioridad();
        //this.loadTablaSeguroCesantia();
        this.obtenerComunas();
        this.CargaEjecutivoPensionados();

    },
    updated() {
        //console.log('cambió')
    },
    methods: {

        obtenerEstados() {
            fetch(`http://${motor_api_server}:4002/pensionados/prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(prioridadJSON => {
                    this.filtros.prioridad = prioridadJSON;
                });
        },
        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/pensionados/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerComunas() {
            let ofic = getCookie('Oficina')
            fetch(`http://${motor_api_server}:4002/pensionados/comunas/${ofic}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(comunasJSON => {
                    this.filtros.comuna = comunasJSON;
                });
            //$('#dllComunaPen').chosen({
            //    width: '100%'
            //});

        },
        CargaEjecutivoPensionados() {

            let oficina = getCookie("Oficina");
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            fetch(`http://${motor_api_server}:4002/pensionados/lista-ejecutivo-pensionado/${oficina}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $("#dllEjePensiondos").html("");
                    $("#dllEjecutivo").html("");
                    $("#dllEjePensiondos").append($("<option>").attr("value", "0").html("Seleccione..."));
                    $("#dllEjecutivo").append($("<option>").attr("value", "").html("Todos"));
                    $.each(datos, function (i, e) {
                        $("#dllEjePensiondos").append($("<option>").attr("value", e.Rut).html(e.Nombre))
                        $("#dllEjecutivo").append($("<option>").attr("value", e.Rut).html(e.Nombre))
                    });
                });
        },
        handleEventoClickFiltrar() {
            let rut;
            let nombre = $('#txtNombrePen').val()
            if (getCookie('Cargo') != 'Agente' && getCookie('Cargo') != 'Jefe Servicio al Cliente') {
                rut = getCookie('Rut')
            }
            else {
                rut = $('#dllEjecutivo').val();
            }

            $("#tblAsigPen").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/pensionados/leads`,
                query: {
                    nombre: nombre,// this.modelos.nombre,
                    comuna: this.modelos.comuna,
                    prioridad: this.modelos.prioridad,
                    estadoGestion: this.modelos.estado,
                    rutEjecutivo: rut,
                    oficina: getCookie('Oficina')
                }
            });
        },
        loadTablaSeguroCesantia() {
            $("#tblAsigPen").bootstrapTable();
        }
    }
});


function idFormatter(value, row, index) {
    return `<a href="${value}" class="btn-link" data-id="${value}"  data-estado="${row.PRIORIDAD}" data-toggle="modal" data-target="#mdl_data_gestion_pensionado" data-lead="${row.id}"  data-rut="${row.rut}">${value}</a>`;
}


function seguroCesantiaNombresFormatter(value, row, index) {
    try {
        return value + ' ' + row.afiliado.apellidos;
    }
    catch
    {
        return 'No tenemos el dato Registrado';
        console.log({ row })
    }
}

function seguroCesantiaPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function formatoMoneyFormatter(value, row, index) {
    return value.toMoney(0);
}

function estadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.id === maximo;
        });
        return `<span class="${objetoFinal.estado.color}">${objetoFinal.estado.nombre}</span>`
    }
    return 'Sin Gestion';
}

function subEstadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.id === maximo;
        });
        return `<span class="${objetoFinal.estado.padre.color}">${objetoFinal.estado.padre.nombre}</span>`
    }
    return 'Sin Gestion';
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


var appPensionadoUniversal = new Vue({
    el: '#demo-lg-modal-pensionado',
    data: {
        dataModal: {}
    },
    mounted() {

    },
    updated() {
    },
    methods: {
        handleEventoClickBuscaUniversal() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            let rut = $('#afi_rut_Pens').val()
            let rutEjecutivo = getCookie('Rut')
            let oficina = getCookie('Oficina')
            fetch(`http://${motor_api_server}:4002/pensionados/leadsUniversal/${rut}/${periodo}/${rutEjecutivo}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        this.dataModal = datos[0];
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Pensionado no existe en base...',
                            container: '#NotfGenericaPensionado',
                            timer: 5000
                        });
                        this.dataModal = datos[0];
                        $("#afi_rut_Pens").val("");
                        appPensionadoUniversal.setDefaultsModal();
                    }
                });
        },
        setDefaultsModal() {
            this.dataModal = {}
        }
    },
});

$(function () {

    $('#demo-lg-modal-pensionado').on('hidden.bs.modal', async (event) => {

        //$(".limpiarUni").html("-------------");
        $("#afi_rut_Pens").val("");
        appPensionadoUniversal.setDefaultsModal();

    });
});

////////////////////////////////////////////////////////////////////////////////////////





var appPensionadosModal = new Vue({
    el: '#mdl_data_gestion_pensionado',
    data: {
        filtrosModal: {
            comuna: [],
            estados: [],
        },
        modelosModal: {
            comuna: '',
            estados: '',
        },
        comportamientos: {
            mostrarProximaGestion: false
        },
        dataModal: {}

    },
    mounted() {
        //this.CargaEjecutivoPensionados();
        this.cargaComunaPensionado();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        obtenerLead(rut) {
            fetch(`http://${motor_api_server}:4002/pensionados/leads/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {

                    console.log({
                        dep: datos
                    })
                    this.dataModal = datos[0];
                    return datos;
                }).then(x => {
                    //this.obtenerEstadoCliente(x);
                });
        },
        handleEventoClickbtn_interes() {
            if ($('#btn_interes').html() == 'Finalizar') {
                limpiaModal();
                $("#mdl_data_gestion_pensionado").modal('hide');
            }
        },
        handleEventoClickbtn_interes_guardar() {
            var fecha;
            var fechaCompromete = $('#txtFechacita').val() + ' ' + $('#slHoraInteres').val();
            if (fechaCompromete == " " || fechaCompromete == "") {
                fechaCompromete = '01-01-1900';
            }

            var ges_subEstado_interes;
            var ges_estado_interes = $('input:radio[name=inline-form-radioInteres]:checked').val()
            if (ges_estado_interes == '1') {
                ges_subEstado_interes = $('input:radio[name=gRbInteresSI]:checked').val()
            }
            else if (ges_estado_interes == '2') {
                ges_subEstado_interes = $('input:radio[name=gRbInteresTerminada]:checked').val()
            }
            else if (ges_estado_interes == '3') {
                ges_subEstado_interes = $('input:radio[name=gRbInteresNoInteresado]:checked').val()
            }

            if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '303' && $('#selectNoInteresadoConforme').val().length == 0) {

                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
            else {
                webSaveGestionContPensionado.tags_conforme = $('#selectNoInteresadoConforme').val();
            }

            if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '303' && $('#selectNoInteresadoConforme').val().length == 0) {

                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
            else {
                webSaveGestionContPensionado.tags_conforme = $('#selectNoInteresadoConforme').val();
            }

            if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '307' && $('#selectNoQuiereEstar').val().length == 0) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
            else {
                webSaveGestionContPensionado.tags_noQuiere = $('#selectNoQuiereEstar').val();
            }


            if (ges_estado_interes == '1') {
                if ($('#txtFechacita').val() == "" || $('#slHoraInteres').val() == "" || $('input:radio[name=gRbInteresSI]:checked').val() == undefined) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar una opción e indicar fecha y hora',
                        container: '#msjMantPensionado',
                        timer: 4000
                    });
                    return false;
                }
            }
            if (ges_estado_interes == '2') {
                if ($('input:radio[name=gRbInteresTerminada]:checked').val() == undefined) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar una opción',
                        container: '#msjMantPensionado',
                        timer: 4000
                    });
                    return false;
                }
            }
            if (ges_estado_interes == '3') {
                if ($('input:radio[name=gRbInteresNoInteresado]:checked').val() == undefined) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar una opción',
                        container: '#msjMantPensionado',
                        timer: 4000
                    });
                    return false;
                }
            }

            const formData = {
                ges_bcam_uid: $('#txtId').val(),
                ges_fecha_compromete: fechaCompromete,
                ges_estado_gst: ges_estado_interes,
                ges_sub_estado_gst: ges_subEstado_interes,
                ges_descripcion_gst: $('#txt_interes_comentarios_pen').val(),
                ges_ejecutivo_rut: getCookie('Rut'),
                ges_oficina: getCookie("Oficina"),
                estado_gestion: ges_subEstado_interes,
                tags_conforme: [],
                tags_noQuiere: []
            };

            fetch(`http://${motor_api_server}:4002/pensionados/guardar-gestion-pensionados`, {
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
                        message: 'Error al intentar guardar gestión.',
                        container: '.msjMantGestionPen',
                        timer: 3000
                    });
                    $('#btn_interes').attr('disabled', true);
                    $('#btn_interes_guardar').attr('disabled', false);
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjMantGestionPen',
                    timer: 3000
                });
                appPensionadosModal.CargaHistorialGestPensionados($('#txtId').val());
                render.ModalUltimaGestion($('#txtId').val());
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $('#btn_interes').attr('disabled', false);
                $('#btn_interes_guardar').attr('disabled', true);
                limpiaModal();
                appPensionadosFiltros.handleEventoClickFiltrar();
            });
        },

        ModalCargaRB_ANGT() {
            $("#divInteresNoInteresado").html("");
            $("#divInteresSI").html("");
            $("#divInteresTerminada").html("");

            fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/3`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        if (e.eges_id != '301' && e.id != '302') {
                            var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.id}`).text(e.nombre);
                            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.id}` }).val(e.id)
                            var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.id}` }).addClass('activarSub' + e.id).css('display', 'none').css('margin-left', '40px'))
                            $("#divInteresNoInteresado").append(dv)
                        }
                    });
                });

            fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/1`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdInteresSi-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresSI', id: `contacto-rdInteresSi-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#divInteresSI").append(dv)
                    });
                });

            fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/2`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdInteresTerminada-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresTerminada', id: `contacto-rdInteresTerminada-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#divInteresTerminada").append(dv)
                    });
                });

            //  $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 2 }, function (datos) {

        },
        ModalCargaRBContactoSI() {
            $("#dvRbMedioSi").html("");
            // $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 6 }, function (datos) {
            fetch(`http://${motor_api_server}:4002/pensionados/lista-estado-gestion/6`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rd-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoSIMedio', id: `contacto-rd-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbMedioSi").append(dv)
                    });
                });

        },
        ModalCargaRBContactoNO() {
            $("#dvRbMedioNoFono").html("");
            $("#dvRbMedioNoDomi").html("");


            fetch(`http://${motor_api_server}:4002/pensionados/lista-estado-gestion/7`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdFonoNO-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoNoFono', id: `contacto-rdFonoNO-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbMedioNoFono").append(dv)
                    });
                });
            //  $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 7 }, function (datos) {

            fetch(`http://${motor_api_server}:4002/pensionados/lista-estado-gestion/8`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdDomNo-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoNoDomi', id: `contacto-rdDomNo-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbMedioNoDomi").append(dv)
                    });
                });
            // $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 8 }, function (datos) {
        },
        handleSubmitContactoPensionado() {
            var estado;
            var con_form_Contacto = $('input:radio[name=rbContactoSIMedio]:checked').val()
            if (con_form_Contacto == undefined) {
                con_form_Contacto = 0
            }
            var con_no_fono = $('input:radio[name=rbContactoNoFono]:checked').val()
            if (con_no_fono == undefined) {
                con_no_fono = 0
            }
            var con_no_domi = $('input:radio[name=rbContactoNoDomi]:checked').val()
            if (con_no_domi == undefined) {
                con_no_domi = 0
            }
            if (con_form_Contacto != 0) {
                estado = con_form_Contacto;
            }
            else if (con_no_domi != 0) {
                estado = con_no_domi;
            }
            else if (con_no_fono != 0) {
                estado = con_no_fono;
            }

            var webSaveGestionPensionado = {
                ges_bcam_uid: $('#txtId').val(),
                ges_fecha_compromete: '1900-01-01',
                ges_estado_gst: con_form_Contacto,
                ges_sub_estado_gst: 0,
                ges_descripcion_gst: $('#txtObservacionContacto').val(),
                ges_ejecutivo_rut: getCookie('Rut'),
                ges_oficina: getCookie("Oficina"),
                estado_gestion: 0,
                tags_conforme: [],
                tags_noQuiere: []
            }

            if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'SI' && $('input:radio[name=rbContactoSIMedio]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Seleccionar una opción y observación',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
            else if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'NO' && $('input:radio[name=rbContactoNoFono]:checked').val() == undefined && $('input:radio[name=rbContactoNoDomi]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Seleccionar las 2 opciones y observación',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }


            fetch(`http://${motor_api_server}:4002/pensionados/guardar-gestion-pensionados`, {
                method: 'POST',
                body: JSON.stringify(webSaveGestionPensionado),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al Guardar Contacto...',
                        container: '#msjMantPensionado',
                        timer: 4000
                    });
                    $('#btn_contacto').attr('disabled', true);
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Se guardo Contacto Correctamente...',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                $('#txtObservacionContacto').val("");
                $('#btn_contacto').attr('disabled', true);
                if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'SI') {
                    //$('#btn_contacto').attr('disabled', false);
                    $('#etapaContacto').css('display', 'none');
                    $('#etapaDomicilio').css('display', 'none');
                    $('#etapaSucursal').css('display', 'none');
                    $('#etapaInteres').css('display', 'block');

                    $('#lbTitulo').html("Interes")
                }
                else {
                    $('#btn_contacto').attr('disabled', true);
                }
                appPensionadosModal.ModalUltimoContacto($('#txtId').val());

                var RutEjec;
                if (getCookie('Cargo') != 'Agente' && getCookie('Cargo') != 'Jefe Servicio al Cliente') {
                    RutEjec = getCookie('Rut')
                }
                else {
                    RutEjec = $('#dllEjecutivo').val();
                }
                appPensionadosFiltros.handleEventoClickFiltrar();
            });
        },
        ModalUltimaGestion(id) {

            let oficina = getCookie("Oficina")
            fetch(`http://${motor_api_server}:4002/pensionados/lista-estado-gestion/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(respuesta => {
                    if (respuesta['eges_nombre'] != null) {
                        if (respuesta['ges_estado_gst'] == 1) {
                            $('#msjBloqueo').css('display', 'none');
                            $('#lbTitulo').html(respuesta['eges_nombre'])
                            $("#txt_interes_comentarios_pen").removeAttr("disabled");
                            $('#txt_interes_comentarios_pen').val("");
                            $("input[name=inline-form-radioInteres]").prop('checked', false);
                            $("input[name=inline-form-radioInteres]").removeAttr("disabled");
                            $('#btn_interes_guardar').attr('disabled', true);
                        }
                        else if (respuesta['ges_estado_gst'] == 3) {
                            $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
                            $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).trigger("click");
                            $('#divInteresNoInteresado').css('display', 'none');
                            $('#Interes_Terminada').css('display', 'none');
                            $('#Interes_Si').css('display', 'none');
                            $('#divInteresNO').css('display', 'block');
                            $('#Interes_NO').css('display', 'block');

                            $('#msjBlockPen').html(' Se encuentra en estado de ' + respuesta['eges_nombre'] + ', gestionado en la fecha: ' + respuesta['ges_fecha_accion'].toFecha())
                            $('#lbTitulo').html(respuesta['eges_nombre'])
                            $('#msjBloqueo').css('display', 'block');
                            $('#txt_interes_comentarios_pen').val(respuesta['ges_descripcion_gst']);

                            $("#txt_interes_comentarios_pen").attr("disabled", "disabled");
                            $("#contacto-rdInteresNo-" + respuesta['ges_sub_estado_gst']).prop('checked', true);
                            $("input[name=inline-form-radioInteres]").attr("disabled", "disabled");
                            $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);

                            $('#btn_interes_guardar').attr('disabled', true);

                            if (respuesta['ges_sub_estado_gst'] != 301 && respuesta['ges_sub_estado_gst'] != 302) {
                                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
                                $("#interes-rdInteresNoInteresado-" + respuesta['ges_sub_estado_gst']).prop('checked', true);
                                $('#divInteresNO').css('display', 'none');
                                $('#divInteresNoInteresado').css('display', 'block');


                                var tags = respuesta['tags'];
                                var arrayTags = []
                                if (respuesta['ges_sub_estado_gst'] == 303) {
                                    $("#interes-rdInteresNoInteresado-303").trigger("click");
                                    arrayTags.length = 0;
                                    $.each(tags, function (i, ex) {
                                        arrayTags[i] = ex.id
                                        $("#selectNoInteresadoConforme").append($("<option>").attr("value", ex.id).html(ex.nombre))
                                    });
                                    $('#selectNoInteresadoConforme').val(arrayTags).trigger('chosen:updated');
                                    $('#selectNoInteresadoConforme').prop('disabled', true).trigger("chosen:updated");

                                }
                                else if (respuesta['ges_sub_estado_gst'] == 307) {
                                    $("#interes-rdInteresNoInteresado-307").trigger("click");
                                    arrayTags.length = 0;
                                    $.each(tags, function (i, ee) {
                                        arrayTags[i] = ee.id
                                        $("#selectNoQuiereEstar").append($("<option>").attr("value", ee.id).html(ee.nombre))
                                    });
                                    $('#selectNoQuiereEstar').val(arrayTags).trigger('chosen:updated');
                                    $('#selectNoQuiereEstar').prop('disabled', true).trigger("chosen:updated");
                                }
                                $("input[name=gRbInteresNoInteresado]").attr("disabled", "disabled");
                                bandera_bloqueo_elementos = true;
                            }
                            //sergio
                        }
                        else if (respuesta['ges_estado_gst'] == 2) {
                            $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).trigger("click");
                            $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
                            $('#msjBlockPen').html(' Se encuentra en estado de ' + respuesta['eges_nombre'] + ', gestionado en la fecha: ' + respuesta['ges_fecha_accion'].toFecha())
                            $('#lbTitulo').html(respuesta['eges_nombre'])
                            $('#msjBloqueo').css('display', 'block');
                            $('#Interes_Si').css('display', 'none');
                            $('#Interes_NO').css('display', 'none');


                            $('#txt_interes_comentarios_pen').val(respuesta['ges_descripcion_gst']);
                            $("input[name=inline-form-radioInteres]").attr("disabled", "disabled");
                            $("input[name=gRbInteresTerminada]").attr("disabled", "disabled");
                            $("#txt_interes_comentarios_pen").attr("disabled", "disabled");
                            $("#contacto-rdInteresTerminada-" + respuesta['ges_sub_estado_gst']).prop('checked', true);


                            // $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
                            $('#Interes_Terminada').css('display', 'block');
                            $('#btn_interes_guardar').attr('disabled', true);
                        }
                        $('#etapaContacto').css('display', 'none');
                        $('#etapaInteres').css('display', 'block');
                    }
                    else {
                        $('#msjBloqueo').css('display', 'none');
                        $('#etapaInteres').css('display', 'none');
                        //$('#lbTitulo').html('Contacto')
                        $("input[name=inline-form-radioInteres]").removeAttr("disabled");
                        $("#txt_interes_comentarios_pen").removeAttr("disabled");
                        $('#etapaContacto').css('display', 'block');
                    }
                });

        },
        ModalUltimoContacto(id) {
            let oficina = getCookie("Oficina")
            fetch(`http://${motor_api_server}:4002/pensionados/lista-estado-gestion/${id}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(respuesta => {
                    if (respuesta['con_contacto'] == 'SI') {
                        //render.ModalCargaRBContactoSI();
                        $('#lbTitulo').html(respuesta['nomContatoSi']);
                        $("#rdkContactoNO").prop('checked', false);
                        $("#rdkContactoSi").prop('checked', true);
                        $("#contacto-rd-" + respuesta['con_forma_contacto']).prop('checked', true);
                        $('#txtObservacionContacto').val(respuesta['con_no_observacion_contacto'])
                        $('#btn_contacto').attr('disabled', true);
                        $('#btn_contacto').attr('disabled', false);
                        $('#paso1_No').css('display', 'none');
                        $('#paso1_Si').css('display', 'block');
                    }
                    else if (respuesta['con_contacto'] == 'NO') {
                        // render.ModalCargaRBContactoNO();
                        $('#lbTitulo').html(respuesta['nomConFono'] + ' ... ' + respuesta['nomConDom']);
                        $("#rdkContactoSi").prop('checked', false);
                        $("#rdkContactoNO").prop('checked', true);

                        if (respuesta['con_no_contacto_fono'] != '0') {
                            $("#contacto-rdFonoNO-" + respuesta['con_no_contacto_fono']).prop('checked', true);
                        }
                        if (respuesta['con_no_contacto_domicilo'] != '0') {
                            $("#contacto-rdDomNo-" + respuesta['con_no_contacto_domicilo']).prop('checked', true);
                        }

                        $('#txtObservacionContacto').val(respuesta['con_no_observacion_contacto'])
                        $('#btn_contacto').attr('disabled', true);
                        $('#paso1_Si').css('display', 'none');
                        $('#paso1_No').css('display', 'block');
                    }
                });
        },
        CargaHistorialGestPensionados(id) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/pensionados/historial_Gestion_pensionado/${id}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    $("#gestiones_realizadas_pensionados").html("");
                    $.each(datos, function (i, e) {
                        $("#gestiones_realizadas_pensionados").append($("<a>").attr("href", '#')
                            .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Ejecutivo.OrdenaNombreCompleto()))
                            .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.ges_fecha_accion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.ges_fecha_compromete.toFechaHora()))
                            .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.estado + ",  <strong>Sub Estado:</strong> " + e.subEstado))
                            .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.ges_descripcion_gst))
                        );
                    });
                }).then(x => {
                    //this.obtenerEstadoCliente(x);
                });
        },
        cargaComunaPensionado() {
            fetch(`http://${motor_api_server}:4002/pensionados/lista-comuna-pensionados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(comunasJSON => {
                    this.filtrosModal.comuna = comunasJSON;
                });

        },
















        handleSubmitSeguroCesantia() {

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                nombreEjecutivo: getCookie('Usuario'),
                rutAfiliado: $('#txtRutAfiSegC').val(),
            };

            fetch(`http://${motor_api_server}:4002/pensionados`, {
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
                        message: 'Error al intentar guardar gestión.',
                        container: '.msjSeguroCesantia',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjSeguroCesantia',
                    timer: 3000
                });
                $('#btGestSeguroCesantia').attr("disabled", true);
                $('#fpg_seguroCesantia').css('display', 'none');
                appSeguroCesantiaModal.setDefaultsModal();
                appSeguroCesantiaFiltros.handleEventoClickFiltrar();
            });
        }
    },
});

$(function () {

    if (getCookie('Cargo') == 'Agente' || getCookie('Cargo') == 'Jefe Servicio al Cliente') {
        $('#divAgente').css('display', 'block')
        $('#mdAsigEjePen').css('display', 'block');
    }
    else {
        $('#divAgente').css('display', 'none')
        $('#mdAsigEjePen').css('display', 'none');
    }

    if (getCookie('Cargo') == 'Ejecutivos Incorporación y Prospección Pensionados' || getCookie('Cargo') == 'Ejecutivo Pensionado') {
        $('#tab_derivaciones').css('display', 'none')
        $('#tab_segcesantia').css('display', 'none')
        $('#tab_recuperaciones').css('display', 'none')
        $('#tab_preaprobados').css('display', 'none')
        $('#demo-lft-tab-5').css('display', 'none')

        $('[href="#demo-lft-tab-6"]').tab('show');
        $('[href="#demo-lft-tab-5"]').tab('hide');

    }

    $('#modalAsignacion').click(function () {
        if (result['length'] != 0) {
            $('#modal_asigna_pensionado').modal('show')
        }
        else {
            $.niftyNoty({
                type: 'danger',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar Pensionados antes de Asignar!',
                focus: false,
                timer: 5000
            });
        }
    });


    $('#mdl_data_gestion_pensionado').on('show.bs.modal', async (event) => {

        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        const idLead = $(event.relatedTarget).data('lead');
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appPensionadosModal.obtenerLead(rut);


        $("#form-info-pensionado").bootstrapValidator('resetForm', true);
        $('#txtId').attr("disabled", true);
        $('#pen_estado').attr("disabled", true);
        $('#pen_nombre').attr("disabled", true);
        $('#btn_save_contact_pensionado').attr('disabled', true);

        appPensionadosModal.ModalCargaRB_ANGT();
        appPensionadosModal.ModalCargaRBContactoSI();
        appPensionadosModal.ModalCargaRBContactoNO();

        appPensionadosModal.ModalUltimoContacto(idLead);
        appPensionadosModal.ModalUltimaGestion(idLead);

        //appPensionadosModal.CargaHistorialGestPensionados(idLead);



        cargaDatosDeContacto(rutCont, '#bdy_datos_contactos_seguro_cesantia')
        appSeguroCesantiaModal.setDefaultsModal();
        $('#fpg_seguroCesantia').css('display', 'none');
        $('#btGestSeguroCesantia').attr("disabled", false);
    });


    var result = [];
    $('#btAsignarPensionado').click(function () {
        if ($("#dllEjePensiondos").val() != "") {
            var malos = []
            var buenos = 0;
            $.each(result, function (i, e) {
                var webPensionado = {
                    Token: getCookie('Token'),
                    Rut_Ejecutivo: $("#dllEjePensiondos").val(),
                    id_Asign: result[i],
                }
                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/asigna-ejecutivo-pensionado", webPensionado, function (respuesta) {
                    if (respuesta.Estado === "OK") {
                        $('input[type="checkbox"]').prop('checked', false);
                        result = []
                        buenos++;
                    }
                    else {
                        malos.push(e)
                    }
                });
            });
            setTimeout(function () {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '<strong>OK..</strong>Se Asignaron ' + buenos + ' Pensionados  Correctamente...!',
                    container: '#msjAsigPensionado',
                    timer: 4000
                });
            }, 100);
            $('#dllEjePensiondos').val('0')
        }
        else {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error..</strong> Debe Seleccionar un Ejecutivo!',
                container: '#msjAsigPensionado',
                timer: 4000
            });
        }
    });

    $('#tblAsigPen').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {
        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {
            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                result[i] = $(this).parent().parent().find('td').eq(1).text();
                ++i;
            }
        });
        $("#cantPensScheck").html(result['length'])
        console.log(result);
    });

    $('#modalAsignacion').click(function () {
        if (result['length'] != 0) {
            $('#modal_asigna_pensionado').modal('show')
        }
        else {
            $.niftyNoty({
                type: 'danger',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar Pensionados antes de Asignar!',
                focus: false,
                timer: 5000
            }); dllEstadoGestionPadre
        }
    });



    $('#PrintPensionados').click(function () {
        if (result['length'] != 0) {
            var openEnderContent = $('#tblPrinPensionado').html()
            var numero = 1;
            $('#printPensionado').css('display', 'block')
            $('#tblPrinPensionado').css('display', 'block')
            $.each(result, function (i, e) {
                fetch(`http://${motor_api_server}:4002/pensionados/printPensionados/${result[i]}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {

                        var newTable = $('#base-table').clone();
                        console.log({ newTable });
                        newTable.show().appendTo('#tblPrinPensionado')
                        newTable.find(`td:contains('([id])')`).text('ID: ' + result[i] + ' / CODIGO: ' + datos[0].codigo);
                        newTable.find(`td:contains('([email])')`).text('Email: ' + datos[0].correo);
                        newTable.find(`td:contains('([name])')`).text(datos[0].nombre);
                        newTable.find(`td:contains('([phone])')`).text(datos[0].fono_particular + ' / ' + datos[0].celular);
                        newTable.find(`td:contains('([address])')`).text(datos[0].DIRECCION);
                        newTable.find(`td:contains('([city])')`).text(datos[0].comuna);
                        if (numero !== 1 && numero % 2 !== 0) {
                            newTable.css('page-break-before', 'always').css('margin-top', '50px');
                        }
                        numero++;
                        console.log({ newTable });
                        return datos;
                    })
            });

            $('#printPensionado').printThis();
            setTimeout(function () {
                $('#printPensionado').css('display', 'none')
                $('#tblPrinPensionado').css('display', 'none')
                $('input[type="checkbox"]').prop('checked', false);
                $('#tblPrinPensionado').html(openEnderContent)
                result = []
            }, 3000);
        }
        else {
            $.niftyNoty({
                type: 'warning',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar Pensionados antes de Imprimir!',
                focus: false,
                timer: 5000
            });
        }
        $('.cancel-button').click(function () {
            $('#printPensionado').hide()
            $('#tblPrinPensionado').css('display', 'none')
        });
    });


    $('#btn_edit_contact_pensionado').click(function () {
        $('#pen_comuna').prop('disabled', false).trigger("chosen:updated");
        $('#pen_direccion').removeAttr("disabled");
        $('#pen_fono_1').removeAttr("disabled");
        $('#pen_fono_2').removeAttr("disabled");
        $('#pen_correo').removeAttr("disabled");
        $('#pen_N_direccion').removeAttr("disabled");
        $('#btn_save_contact_pensionado').attr('disabled', false);
    });


    $("#mdl_data_gestion_pensionado").on("shown.bs.modal", function (event) {
        console.log({ bandera_bloqueo_elementos })
        if (bandera_bloqueo_elementos) {
            $("input[name=gRbInteresNoInteresado]").attr("disabled", "disabled");
            bandera_bloqueo_elementos = false;
        }
    });

    $("#mdl_data_gestion_pensionado").on("hidden.bs.modal", function () {
        limpiaModal();
    });

    function limpiaModal() {
        $('#btn_save_contact_pensionado').attr('disabled', true);
        $('#pen_comuna').prop('disabled', true).trigger("chosen:updated");
        $('#pen_direccion').attr("disabled", true);
        $('#pen_fono_1').attr("disabled", true);
        $('#pen_fono_2').attr("disabled", true);
        $('#pen_correo').attr("disabled", true);
        $('#pen_N_direccion').attr("disabled", true);


        $('#paso1_Si').css('display', 'none');
        $('#paso1_No').css('display', 'none');
        $("input[name=inline-form-radioContacto]").prop('checked', false);
        $("input[name=rbContactoSIMedio]").prop('checked', false);
        $("input[name=rbContactoNoFono]").prop('checked', false);
        $("input[name=rbContactoNoDomi]").prop('checked', false);
        $('#txtObservacionContacto').val("")
        //$('#btn_contacto_guardar').attr('disabled', true);
        $('#btn_contacto').attr('disabled', true);
        $('#lbTitulo').html('Contacto')

        $('#Interes_Si').css('display', 'none');
        $('#Interes_Terminada').css('display', 'none');
        $('#Interes_NO').css('display', 'none');
        $("input[name=inline-form-radioInteres]").prop('checked', false);
        $("input[name=gRbInteresSI]").prop('checked', false);
        $("input[name=gRbInteresTerminada]").prop('checked', false);
        //$("input[name=gRbInteresNO]").prop('checked', false);
        $('#txt_interes_comentarios_pen').val("")
        $('#txtFechacita').val("")
        $('#slHoraInteres').val("")
        $('#btn_interes_guardar').attr('disabled', true);
    }

    $('#mdl_data_gestion_pensionado').on('show.bs.modal', function () {
        $('#dp-component-pensionados-interes .input-group.date').datepicker(
            { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
        ).on('changeDate', function (event) {
            event.stopPropagation();
        }).on('show.bs.modal hide.bs.modal', function (event) {
            event.stopPropagation();
        });
    });

    $("#btn_savearPensionado").click(function (ev) {
        // mouse click on button
        ev.stopPropagation();
    });



    $(document).on('click', 'input:radio[name=gRbInteresNoInteresado]', function () {
        switch (this.value) {
            case "303":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                var lb = $('<label>').prop('for', `selectNoInteresadoConforme`).addClass('sr-only').text('Conforme en su Caja');
                var inp = $('<select>').prop({ id: 'selectNoInteresadoConforme', tabindex: '4', 'multiple': true }).data('placeholder', 'Seleccione..')                //.prop({ type: 'radio', name: 'gRbInteresNoInteresadoSalud', id: `interes-rdInteresNoInteresadoSalud-${e.egesNo_id}` }).val(e.egesNo_id)
                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb)
                $('#divInteresNoInteresadoSub-303').append(dv)
                $("#selectNoInteresadoConforme").html("");

                fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/303`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        $.each(datos, function (i, e) {
                            $.each(datos, function (i, e) {
                                $("#selectNoInteresadoConforme").append($("<option>").attr("value", e.id).html(e.nombre))
                            });
                            $('#selectNoInteresadoConforme').chosen({
                                width: '100%'
                            });
                        });

                    });
                $('.activarSub303').toggle();
                break;
            case "304":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
            case "305":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
            case "306":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;

            case "307":
                $("#divInteresNoInteresadoSub-307").html("");
                $("#divInteresNoInteresadoSub-303").html("");
                var lb = $('<label>').prop('for', `selectNoQuiereEstar`).addClass('sr-only').text('No Quiere estar en La Araucana');
                var inp = $('<select>').prop({ id: 'selectNoQuiereEstar', tabindex: '4', 'multiple': true }).data('placeholder', 'Seleccione..')                //.prop({ type: 'radio', name: 'gRbInteresNoInteresadoSalud', id: `interes-rdInteresNoInteresadoSalud-${e.egesNo_id}` }).val(e.egesNo_id)
                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb)
                $('#divInteresNoInteresadoSub-307').append(dv)
                $("#selectNoQuiereEstar").html("");


                fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/307`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        $.each(datos, function (i, e) {
                            $.each(datos, function (i, e) {
                                $("#selectNoQuiereEstar").append($("<option>").attr("value", e.id).html(e.nombre))
                            });
                            $('#selectNoQuiereEstar').chosen({
                                width: '100%'
                            });
                        });
                    });

                $('.activarSub307').toggle();
                break;
            case "308":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
        }

    })


    $('#dllEstadoGestionPadre').change(function (e) {
        e.preventDefault();
        $("#dllEstadoGestion").html("");
        if ($(this).val() != 0) {

            fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/$(this).val()`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $("#dllEstadoGestion").append($("<option>").attr("value", "0").html("Todos"));
                    $.each(datos, function (i, e) {
                        $("#dllEstadoGestion").append($("<option>").attr("value", e.id).html(e.nombre))
                    });
                });
        }
        else {
            $("#dllEstadoGestion").append($("<option>").attr("value", "0").html("Todos"));
        }
    });


    $(document).on('click', 'input:radio[name=inline-form-radioInteres]', function () {
        switch (this.value) {
            case "1":
                $("#Interes_NO").css('display', 'none')
                $("#Interes_Terminada").css('display', 'none')
                $("#Interes_Si").css('display', 'block')
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresSI").html("");
                $('#btn_interes_guardar').attr('disabled', false);

                fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/1`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        $.each(datos, function (i, e) {
                            var lb = $('<label>').prop('for', `contacto-rdInteresSi-${e.id}`).text(e.nombre);
                            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresSI', id: `contacto-rdInteresSi-${e.id}` }).val(e.id)
                            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                            $("#divInteresSI").append(dv)
                        });
                    });
                break;


            case "2":
                $("#Interes_Si").css('display', 'none')
                $("#Interes_NO").css('display', 'none')
                $("#Interes_Terminada").css('display', 'block')
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresTerminada").html("");
                $('#btn_interes_guardar').attr('disabled', false);


                fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/2`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        $.each(datos, function (i, e) {
                            var lb = $('<label>').prop('for', `contacto-rdInteresTerminada-${e.id}`).text(e.nombre);
                            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresTerminada', id: `contacto-rdInteresTerminada-${e.id}` }).val(e.id)
                            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                            $("#divInteresTerminada").append(dv)
                        });
                    });
                break;
            case "3":
                $("#Interes_Si").css('display', 'none');
                $("#Interes_Terminada").css('display', 'none');
                $("#Interes_NO").css('display', 'block')
                //$('#divInteresNoInteresado').css('display', 'block');
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresNO").html("");
                $('#btn_interes_guardar').attr('disabled', false);


                $("#divInteresNoInteresado").html("");
                fetch(`http://${motor_api_server}:4002/pensionados/lista-sub-estado-gestion/3`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        $.each(datos, function (i, e) {
                            if (e.eges_id != '301' && e.eges_id != '302') {
                                var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.id}`).text(e.nombre);
                                var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.id}` }).val(e.id)
                                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.id}` }).addClass('activarSub' + e.id).css('display', 'none').css('margin-left', '40px'))
                                $("#divInteresNoInteresado").append(dv)
                            }
                        });
                    });
                $('#divInteresNO').css('display', 'none');
                $('#divInteresNoInteresado').css('display', 'block');
                break;
        }
    })


    $("input:radio[name=inline-form-radioContacto]").click(function () {
        switch (this.value) {
            case "SI":
                $("#paso1_No").css('display', 'none')
                $("#paso1_Si").css('display', 'block')
                $('input:radio[name=rbContactoNoFono]:checked').prop('checked', false)
                $('input:radio[name=rbContactoNoDomi]:checked').prop('checked', false)
                $('#btn_contacto').attr('disabled', false);
                appPensionadosModal.ModalCargaRBContactoSI();
                break;
            case "NO":
                $("#paso1_Si").css('display', 'none')
                $("#paso1_No").css('display', 'block')
                //$('#btn_contacto_guardar').attr('disabled', false);
                $('#btn_contacto').attr('disabled', false);
                $('input:radio[name=rbContactoSIMedio]:checked').prop('checked', false);
                appPensionadosModal.ModalCargaRBContactoNO();
                break;
        }
    });


    $("input:radio[name=inline-form-radioDomicilio]").click(function () {
        switch (this.value) {
            case "SI":
                $("#DomicilioVisita_NO").css('display', 'none')
                $("#preguntaInteresDom").css('display', 'block')
                break;
            case "NO":
                $("#preguntaInteresDom").css('display', 'none')
                $("#DomicilioVisita_NO").css('display', 'block')
                $("#Domicilio_NO").css('display', 'none')
                $("#Domicilio_Si").css('display', 'none')
                $('#btn_domicilio').html("Siguiente")
                break;
        }
    });

    $("input:radio[name=inline-form-radioDomicilioInteresado]").click(function () {
        switch (this.value) {
            case "SI":
                $("#Domicilio_NO").css('display', 'none')
                $("#Domicilio_Si").css('display', 'block')
                $('#btn_domicilio').html("Siguiente")
                break;
            case "NO":
                $("#Domicilio_Si").css('display', 'none')
                $("#Domicilio_NO").css('display', 'block')
                $('#btn_domicilio').html("Finalizar")
                break;
        }
    });

    $("input:radio[name=inline-form-radioSucursal]").click(function () {
        switch (this.value) {
            case "SI":
                $("#SucursalVisita_NO").css('display', 'none')
                $("#preguntaInteresSurc").css('display', 'block')
                break;
            case "NO":
                $("#preguntaInteresSurc").css('display', 'none')
                $("#SucursalVisita_NO").css('display', 'block')
                $("#Sucursal_NO").css('display', 'none')
                $("#Sucursal_Si").css('display', 'none')
                break;
        }
    });

    $("input:radio[name=inline-form-radiordkSucursalInteresado]").click(function () {
        switch (this.value) {
            case "SI":
                $("#Sucursal_NO").css('display', 'none')
                $("#Sucursal_Si").css('display', 'block')
                break;
            case "NO":
                $("#Sucursal_Si").css('display', 'none')
                $("#Sucursal_NO").css('display', 'block')
                break;
        }
    });

    //poner

    $('#form-info-pensionado').bootstrapValidator({
        excluded: [':disabled', ':not(:visible)'],
        feedbackIcons: [],
        excluded: [':disabled'],
        fields: {
            pen_fono_2: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un fono particular'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_fono_1: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un celular'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese dirección'
                    }
                }
            },
            pen_N_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese numero de dirección'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_comuna: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese una comuna'
                    }
                }
            },
            pen_correo: {
                validators: {
                    notEmpty: {
                        message: 'Ingresar un correo electronico'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Ingrese un correo valido'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var webUpdateContactPensionado = {
            id_Asign: $('#txtId').val(),
            FonoParticular: $('#pen_fono_2').val(),
            FonoCelular: $('#pen_fono_1').val(),
            Direccion: $('#pen_direccion').val(),
            N_direccion: $('#pen_N_direccion').val(),
            Comuna: $('#pen_comuna option:selected').text(),
            Mail: $('#pen_correo').val(),
        }
        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/update-contacto-pensionados", webUpdateContactPensionado, function (respuesta) {
            if (respuesta.Estado === "OK") {
                $('#btn_save_contact_pensionado').attr('disabled', true);
                $('#pen_comuna').prop('disabled', true).trigger("chosen:updated");
                $('#pen_direccion').attr("disabled", true);
                $('#pen_fono_1').attr("disabled", true);
                $('#pen_fono_2').attr("disabled", true);
                $('#pen_correo').attr("disabled", true);
                $('#pen_N_direccion').attr("disabled", true);

                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Datos de Contacto Actualizado Correctamente...',
                    container: '#msjMantPensionadoContacto',
                    timer: 4000
                });
            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al Actualizar Contacto...',
                    container: '#msjMantPensionadoContacto',
                    timer: 4000
                });
            }
        });
    });
});

