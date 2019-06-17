//@charlie Prä//
var app = new Vue({
    el: '#page-content',
    data: {
        sesion: {
            rutEjecutivo: function () {
                return getCookie('Rut');
            },
            oficina: function () {
                return parseInt(getCookie('Oficina'));
            }
        },
        leadModal: {
            id: 0,
            empresaRut: '',
            empresaCodigoPuntoAtencion: '',
            empresaNombre: '',
            empresaNombrePuntoAtencion: '',
            empresaCantidadTrabajadores: 0,
            directoresLaborales: []
        },
        leads: [
            {
                id: 0,
                empresaRut: '',
                empresaCodigoPuntoAtencion: '',
                empresaNombre: '',
                empresaNombrePuntoAtencion: '',
                empresaCantidadTrabajadores: 0,
                directoresLaborales: []
            }
        ],
        modeloFormulario: {
            nombre: '',
            cargo: '',
            telefonoFijo: '',
            telefonoCelular: '',
            correo: ''
        },
        erroresValidacion: []
    },
    mounted: async function () {
        this.leads = await this.fetchLeads();
    },
    updated: function () {
        this.chequeaFormulario();
    },
    methods: {
        async fetchLeads() {
            return fetch(`http://${motor_api_server}:4002/directores-laborales?ejecutivo=${this.sesion.rutEjecutivo()}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            }).then(response => response.json());
        },
        async fetchLead(id) {
            console.log(`Rescatado lead #${id}`);
            return fetch(`http://${motor_api_server}:4002/directores-laborales/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());

        },
        async agregaDirectivo() {

            if (this.erroresValidacion.length > 0) {
                $('#mensajes').html("");
                $.niftyNoty({
                    type: 'danger',
                    title: `<strong>Debes Ingresar los campos Obligatorios</strong> `,
                    message: `<ul><li> ${this.erroresValidacion.join('</li><li>')}</li></ul>` ,
                    container: '#mensajes'
                });
                return false;
            }

            $('.bloquear-onsubmit').prop('disabled', true);
            const formdata = {
                ...this.modeloFormulario,
                empresaId: this.leadModal.id,
                ejecutivoIngreso: this.sesion.rutEjecutivo(),
                oficinaIngreso: this.sesion.oficina()
            };

            
            fetch(`http://${motor_api_server}:4002/directores-laborales`, {
                method: 'POST',
                body: JSON.stringify(formdata),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {

                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar ingresar "Directivo", porfavor intenta nuevamente mas tarde.',
                        container: '#mensajes'
                    });
                    return false;
                }

                this.modeloFormulario = {
                    nombre: '',
                    cargo: '',
                    telefonoFijo: '',
                    telefonoCelular: '',
                    correo: ''
                };

                await this.initModal(formdata.empresaId);
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '#mensajes'
                });

                $('.bloquear-onsubmit').prop('disabled', false);
            });


        },
        async chequeaFormulario() {
            this.erroresValidacion = [];

            if (this.modeloFormulario.nombre.length === 0) {
                this.erroresValidacion.push('Debes ingresar un "Nombre"');
            }

            if (this.modeloFormulario.cargo.length === 0) {
                this.erroresValidacion.push('Debes seleccionar un "Cargo"');
            }
        },
        async initModal(leadId) {
            this.leadModal = await this.fetchLead(leadId);
        }
    },
    computed: {
        
    }
});



//Eventos JQUERY
$(function () {
    $('#modalGestion').on('show.bs.modal', async (event) => {
        var $opener = $(event.relatedTarget);
        var leadId = $opener.data('lead');
        await app.initModal(leadId);
    });

    $('#modalGestion').on('hidden.bs.modal', async (event) => {
        app.$data.leads = await app.fetchLeads();
        $('#mensajes').html("");
    });

});
