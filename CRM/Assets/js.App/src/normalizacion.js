jQuery.support.cors = true;
var appNormalizacionFiltros = new Vue({
    el: '#demo-lft-tab-2',
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
        },
        modelos: {
            estado: '',
            subEstado: '',
            causa: '',
            prioridad: '',
            estadoCliente: '',
            tipoCampana: '',
            derivacion: '',
        }
    },
    mounted() {
        this.obtenerCausas();
        this.obtenerEstados();
        this.loadTablaNormalizacion();
        this.obtenerPrioridad();
        this.obtenerEstadoCliente();
        this.obtenerTipoCamapana();
        this.obtenerDerivacion();
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
        obtenerEstadoCliente() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadoCliente = estadosJSON;
                });
        },
        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/normalizacion/Prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.prioridad = estadosJSON;
                });
        },
        obtenerTipoCamapana() {
            fetch(`http://${motor_api_server}:4002/normalizacion/tipocampana`, {
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
            fetch(`http://${motor_api_server}:4002/normalizacion/derivacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.derivacion = estadosJSON;
                });
        },
        eventoCambiaEstado() {

            this.obtenerSubEstados(this.modelos.estado)

        },
        handleEventoClickFiltrar() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            console.log({
                modelo: this.modelos
            })
            $("#tabla_recuperaciones").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/normalizacion/leads`,
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
    return value.toString().toEtiquetaPrioridad();
}

function normalizacionFormaterBasal(value, row, index) {
    if (row.gestiones[row.gestiones.length - 1] != undefined) {
        return row.gestiones[row.gestiones.length - 1].causaBasal.nombre
    } else {
        return '-';
    }
}

function normalizacionFormaterEstado(value, row, index) {
    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return '-';
}


function formatoMoneyFormatter(value, row, index) {
    return value.toMoney(0);
}

function estadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return 'Sin Gestion';
}


var appNormalizacionModal = new Vue({
    el: '#mdl_data_normalizacion',
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
            comentarios: '',
            folioCredito: '',
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
        obtenerEstadoCliente(datos) {
            if (datos.gestiones.length > 0) {
                const maximo = Math.max.apply(Math, datos.gestiones.map(function (o) {
                    //console.log({ o })
                    //return o.estadoCliente.id;
                    return o.estado.id;
                }));
                const objetoFinal = datos.gestiones.find((e) => {
                    return e.estadoCliente.id === maximo;

                    console.log({ objetoFinal });
                });
                $("#estadoClieModalNorm").html(`<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`);
            } else {
                $("#estadoClieModalNorm").html('Sin Gestion');
            }
        },
        obtenerEstadoClienteModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estadoCliente`, {
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
            fetch(`http://${motor_api_server}:4002/normalizacion/leads/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    console.log({ datos })
                    this.dataModal = datos;
                    return datos
                }).then(x => {
                    //this.obtenerEstadoCliente(x);
                });
        },
        handleSubmitNormalizacion() {

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                nombreEjecutivo: getCookie('Usuario'),
                rutAfiliado: $('#txtRutAfiNorm').val(),
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
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjNormalizacion',
                    timer: 3000
                });
            }).catch(reasons => {
                console.log({ reasons });
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al intentar guardar gestión.',
                    container: '.msjNormalizacion',
                    timer: 3000
                });
            });
        },
    },
});

$(function () {
    $('#mdl_data_normalizacion').on('show.bs.modal', async (event) => {
        const rut = $(event.relatedTarget).data('rut');
        console.log({ rut })
        await appNormalizacionModal.obtenerLead(rut);
        $('#form-registro-contacto-nomalizacion').trigger("reset");
    });

});