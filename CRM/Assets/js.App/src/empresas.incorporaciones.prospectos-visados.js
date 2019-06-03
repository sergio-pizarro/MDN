var prospectoDefaults = {
    rut: 'Sin Información',
    razonSocial: 'Sin Información',
    empleados: 0,
    clasificacion: 'Z',
    caja: 'Sin Información',
    holding: '',
    segmento: '',
    rubro: '',
    hito: '',
    historial: [],
    contactos: []
};

var app = new Vue({
    el: '#page-content',
    data: {
        prospectosVisados: [
            {
                rut: '1111-1',
                razonSocial: 'I. Municipalidad del Desarrollo',
                empleados: 20,
                clasificacion: 'A',
                caja: 'Los Andes',
                holding: '',
                segmento: 'Pública - No Afecta',
                rubro: 'Administracion Pública',
                hito: 'Campaña Inicial',
                historial: [],
                contactos: [
                    {
                        id: 1,
                        nombre: 'Carlos Pradenas',
                        cargo: 'RRHH',
                        correo: 'cpradenasp@laaraucana.cl',
                        telefono: '+56945189023',
                        celular: '+56945189023'
                    },
                    {
                        id: 2,
                        nombre: 'Alexandra Pradenas',
                        cargo: 'Sindicato',
                        correo: 'lpradenash@laaraucana.cl',
                        telefono: '+56945189023',
                        celular: '+56945189023'
                    }
                ]
            },
            {
                rut: '1111-3',
                razonSocial: 'Aserraderos M.O.',
                empleados: 670,
                clasificacion: 'B',
                caja: 'Los Andes',
                holding: '2222-2 - CMPC',
                segmento: 'Privada',
                rubro: 'Industria de la Madera',
                hito: 'Planificación',
                historial: [],
                contactos: [
                    {
                        id: 3,
                        nombre: 'Luciana Pradenas',
                        cargo: 'RRHH',
                        correo: 'lpradenast@laaraucana.cl',
                        telefono: '+56945189023',
                        celular: '+56945189023'
                    }
                ]
            },
            {
                rut: '1111-4',
                razonSocial: 'Thor SA',
                empleados: 345,
                clasificacion: 'C',
                caja: 'Los Andes',
                holding: '',
                segmento: 'Pública - Afecta',
                rubro: 'Administracion Pública',
                hito: 'Tubo Comercial',
                historial: [],
                contactos: [
                    {
                        id: 4,
                        nombre: 'Ivonne Hernandez',
                        cargo: 'Sindicato',
                        correo: 'ihernandezl@laaraucana.cl',
                        telefono: '+56945189023',
                        celular: '+56945189023'
                    }
                ]
            }
        ],
        seleccionadoModal: prospectoDefaults,
        selectedQuorum: [],
        toipics: [
            {
                id: 1,
                nombre: 'Crédito',
                descripcion: 'Bonito'
            },
            {
                id: 2,
                nombre: 'Beneficios',
                descripcion: 'Bonito'
            },
            {
                id: 3,
                nombre: 'Servicio',
                descripcion: 'Bonito'
            },
            {
                id: 4,
                nombre: 'Regimenes Legales',
                descripcion: 'Bonito'
            },
        ]

    },
    mounted: function () {
        console.log('App mounted');

    },
    updated: function () {
        console.log('updated');
        $("#managementQuorum").trigger("chosen:updated");
    },
    methods: {

    },
    computed: {
        clasificacionClass: function () {
            return {
                'alert': true,
                'alert-success': this.seleccionadoModal.clasificacion === 'A',
                'alert-warning': this.seleccionadoModal.clasificacion === 'B',
                'alert-danger': this.seleccionadoModal.clasificacion === 'C'
            };
        }
    }
});




//Eventos JQUERY
$('#modalGestion').on('show.bs.modal', function (event) {
    var $opener = $(event.relatedTarget);

    var empresaRut = $opener.text();
    var idx = app.$data.prospectosVisados.findIndex(function (pv) {
        return pv.rut === empresaRut;
    });
    app.$data.seleccionadoModal = app.$data.prospectosVisados[idx];

});


$('#modalGestion').on('hidden.bs.modal', function (event) {
    app.$data.seleccionadoModal = prospectoDefaults;
});

$('#managementQuorum').chosen({ width: '100%' });
$('#conversationTopics').chosen({ width: '100%' });
