jQuery.support.cors = true;
var appAcuerdoPagosFiltros = new Vue({
    el: '#demo-lft-tab-8',
    data: {
        filtros: {
            causas: [],
            estados: [],
            subEstados: [],
            prioridad: [],
            vencimiento: [],
            estadoCliente: [],
            tipoCampana: [],
            derivacion: [],
            prioridad: []
        },
        modelos: {
            estado: '',
            subEstado: '',
            causa: '',
            prioridad: '',
            estadoCliente: '',
            tipoCampana: '',
            derivacion: '',
            prioridad: ''
        }
    },
    mounted() {
        this.obtenerCausasAcuerdoPago();
        this.obtenerEstadosAcuerdoPago();
        this.obtenerEstadoCliente();
        this.obtenerTipoCamapana();
        this.loadTablaAcuerdoPago();
        this.obtenerDerivacion();
        this.obtenerPrioridad();
    },
    updated() {
       // console.log('cambió')
    },
    methods: {
        obtenerCausasAcuerdoPago() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtros.causas = causasJSON;
                });
        },
        obtenerEstadosAcuerdoPago() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerEstadoCliente() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadoCliente = estadosJSON;
                });
        },

        obtenerTipoCamapana() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/tipocampana`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.tipoCampana = estadosJSON;
                });
        },

        obtenerDerivacion() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/derivacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.derivacion = estadosJSON;
                });
        },

        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/Prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.prioridad = estadosJSON;
                });
        },

        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        eventoCambiaEstado() {

            this.obtenerSubEstados(this.modelos.estado)

        },
        handleEventoClickFiltrar() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            $("#tabla_recuperaciones_acuerdo").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/acuerdopago/leads`,
                query: {
                    periodo: periodo,
                    asignado: getCookie('Rut'),
                    causa: this.modelos.causa,
                    estado: this.modelos.estado,
                    subEstado: this.modelos.subEstado,
                    prioridad: this.modelos.prioridad,
                    estadoCliente: this.modelos.estadoCliente,
                    tipoCampana: this.modelos.tipoCampana,
                    derivacion: this.modelos.derivacion,
                    prioridad: this.modelos.prioridad,
                    oficina: getCookie('Oficina'),

                }
            });
        },
        loadTablaAcuerdoPago() {
            $("#tabla_recuperaciones_acuerdo").bootstrapTable();
        }
    },
    computed: {

    }
});


function AcuerdoPagoLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_acuerdo_pago" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}

function AcuerdoPagoNombresFormatter(value, row, index) {
    return value + ' ' + row.afiliado.apellidos;
}

function AcuerdoPagoPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function formatoMoneyFormatterAcuerdo(value, row, index) {
    return value.toMoney(0);
}

function AcuerdoPagoEstadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return 'Sin Gestion';
}

function NombreEmpresaFormatter(value, row, index) {
    return row.empresa.nombre;
}

var appAcuerdoPagoModal = new Vue({
    el: '#mdl_data_acuerdo_pago',
    data: {
        filtrosModal: {
            causasModal: [],
            estadosModal: [],
            subEstadosModal: [],
            estadoCliente: []
        },
        modelosModal: {
            estado: '',
            subEstado: '',
            causaBasal: '',
            fechaCompromiso: '',
            comentarios: ''
        },
        comportamientos: {
            mostrarProximaGestion: false
        },
        dataModal: {}
    },
    mounted() {
        this.obtenerCausasModal();
        this.obtenerEstadosModal();
        this.obtenerEstadoClienteModal();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        obtenerCausasModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtrosModal.causasModal = causasJSON;
                });
        },
        obtenerEstadoCliente(datos) {
            if (datos.gestiones.length > 0) {
                const maximo = Math.max.apply(Math, datos.gestiones.map(function (o) { return o.estadoCliente.id; }));
                const objetoFinal = datos.gestiones.find((e) => {
                    return e.estadoCliente.id === maximo;
                });
                $("#estadoClieModal").html(`<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`);
            } else {
                $("#estadoClieModal").html('Sin Gestion');
            }
        },
        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstadosModal(padre) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
                });
        },
        obtenerEstadoClienteModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadoCliente = estadosJSON;
                });
        },
        eventoCambiaEstadoModal() {
            this.obtenerSubEstadosModal(this.modelosModal.estado)
        },
        manejarVisibilidadCalendario() {
            const sbestado = this.filtrosModal.subEstadosModal.find(est => est.id == this.modelosModal.subEstado);
            this.comportamientos.mostrarProximaGestion = (new RegExp('--compromiso')).test(sbestado.opciones);
        },
        obtenerLead(rut) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/leads/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                }).then(x => {
                    this.obtenerEstadoCliente(x);
                });
        },
        handleSubmitAcuerdoPago() {

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                nombreEjecutivo: getCookie('Usuario'),
                oficina: parseInt(getCookie('Oficina')),
                rutAfiliado: $('#txtRutAfiAcuerdo').val()
            };
            fetch(`http://${motor_api_server}:4002/acuerdopago`, {
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
                        container: '.msjAcuerdo_pago',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjAcuerdo_pago',
                    timer: 3000
                });
                appAcuerdoPagoModal.obtenerLead($('#txtRutAfiAcuerdo').val());
                appAcuerdoPagosFiltros.handleEventoClickFiltrar();
                $('#new_datos-gestion_acuerdo_pago').trigger("reset");

            });
            //    .catch(reasons => {
            //    console.log({ reasons });
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Error al intentar guardar gestión.',
            //        container: '.msjAcuerdo_pago',
            //        timer: 3000
            //    });
            //});
        },
        setDefaultsModal() {
            this.modelosModal = {
                estado: '',
                subEstado: '',
                causaBasal: '',
                fechaCompromiso: '',
                comentarios: '',
                folioCredito: '',
            }
        }
    },
});

$(function () {
    $('#mdl_data_acuerdo_pago').on('show.bs.modal', async (event) => {

        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appAcuerdoPagoModal.obtenerLead(rut);
        cargaDatosDeContacto(rutCont, '#bdy_datos_contactos_acuerdo_pago')
        $('#new_datos-gestion_acuerdo_pago').trigger("reset");
        $('#fpg_acuerdo').css('display', 'none');
        appAcuerdoPagoModal.setDefaultsModal();
        $('#btGestAcuerdoPago').attr("disabled", false);
    });


    $('#mdl_data_acuerdo_pago').on('hidden.bs.modal', async (event) => {
        appNormalizacionModal.setDefaultsModal();
        $('#slBasalAcuerdoPago').attr("disabled", true);
    });

    $('#slEstadoAcuerdoPago').change(function (e) {
        e.preventDefault();
        if ($(this).val() == 1) {
            $('#slBasalAcuerdoPago').attr("disabled", false);
        }
        else {
            $('#slBasalAcuerdoPago').attr("disabled", true);
            $('#fpg_acuerdo').css('display', 'none');
            $('#slBasalAcuerdoPago').val("");
        }

    });

});