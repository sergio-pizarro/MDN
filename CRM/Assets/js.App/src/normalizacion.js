jQuery.support.cors = true;
var appNormalizacionFiltros = new Vue({
    el: '#demo-lft-tab-2',
    data: {
        filtros: {
            causas: [],
            estados: [],
            subEstados: [],
            prioridad: [],
            vencimiento: []
        },
        modelos: {
            estado: '',
            subEstado: ''
        }
    },
    mounted() {
        this.obtenerCausas();
        this.obtenerEstados();
        this.loadTablaNormalizacion();
    },
    updated() {
        console.log('cambió')
    },
    methods: {
        obtenerCausas() {
            fetch(`http://${motor_api_server}:4002/normalizacion/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtros.causas = causasJSON;
                });
        },
        obtenerEstados() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estados`, {
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
            fetch(`http://${motor_api_server}:4002/normalizacion/estados?padre=${padre}`, {
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
            $("#tabla_recuperaciones").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/normalizacion/leads`,
                query: {
                    periodo: 201906,
                    asignado: getCookie('Rut'),
                }
            });
        },
        loadTablaNormalizacion() {
            $("#tabla_recuperaciones").bootstrapTable();
        }
    }
});


function normalizacionLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_normalizacion" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}

function normalizacionNombresFormatter(value, row, index) {
    return value + ' ' + row.afiliado.apellidos;
}

function normalizacionPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPloma();
}






var appNormalizacionModal = new Vue({
    el: '#mdl_data_normalizacion',
    data: {
        filtrosModal: {
            causasModal: [],
            estadosModal: [],
            subEstadosModal: []
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
    },
    updated() {
        console.log('cambió', {
            form: this.modelosModal
        })
    },
    methods: {
        obtenerCausasModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtrosModal.causasModal = causasJSON;
                });
        },
        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estados`, {
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
            fetch(`http://${motor_api_server}:4002/normalizacion/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
                });
        },
        eventoCambiaEstadoModal() {

            this.obtenerSubEstadosModal(this.modelosModal.estado)

        },
        manejarVisibilidadCalendario() {
            const sbestado = this.filtrosModal.subEstadosModal.find(est => est.id == this.modelosModal.subEstado);
            this.comportamientos.mostrarProximaGestion = (new RegExp('--compromiso')).test(sbestado.opciones);
        },
        obtenerLead(id) {
            fetch(`http://${motor_api_server}:4002/normalizacion/leads/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    console.log({
                        datos
                    })
                });
        },
        handleSubmitNormalizacion() {

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina'))
            };



            fetch(`http://${motor_api_server}:4002/normalizacion`, {
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
                        container: '.msjNormalizacion',
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjNormalizacion'
                });
            }).catch(reasons => {
                console.log({ reasons });
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al intentar guardar gestión.',
                    container: '.msjNormalizacion',
                });
            });
        },
    },
});


$(function () {

    $('#mdl_data_normalizacion').on('show.bs.modal', async (event) => {

        const leadId = $(event.relatedTarget).data('lead');
        console.log({ leadId })
        appNormalizacionModal.obtenerLead(leadId);


    });

    $('#mdl_data_normalizacion').on('hidden.bs.modal', function (event) {

    });

});