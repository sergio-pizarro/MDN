jQuery.support.cors = true;
var appWapp = new Vue({
    el: '#contWapp',
    mounted() {
        this.cargalistaWapp();
    },
    methods: {

        cargalistaWapp() {
            let oficina = getCookie('Oficina');
            $("#tblWapp").bootstrapTable({
                url: `http://${motor_api_server}:4002/wapp/lista-wapp/${oficina}`
            });
        },
        loadTablaListaWapp() {
            let oficina = getCookie('Oficina');
            $("#tblWapp").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/wapp/lista-wapp/${oficina}`
            });
        },

        handleSubmitfiltroWapp() {

            $("#tblWapp").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/wapp/filtro-wapp`,
                query: {
                    oficina: getCookie('Oficina'),
                    rut: $('#txtRutBuscar').val(),
                    estamento: $('#slEstamentoWapp').val(),
                }
            });
        },

        handleSubmitGuadarWapp() {
            if ($('#txtRutIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Rut.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtDvIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Dv.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtNomContIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Nombre de Contacto.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtPuntotIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Punto de Atención.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtEstamentotIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estamento.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtCelulartIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Numero de Celular.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut: $('#txtRutIng').val(),
                dv: $('#txtDvIng').val(),
                nombre_contacto: $('#txtNomContIng').val(),
                punto_atencion: $('#txtPuntotIng').val(),
                estamento: $('#txtEstamentotIng').val(),
                n_celular: '+56 9 ' + $('#txtCelulartIng').val(),
                oficina: parseInt(getCookie('Oficina')),
                rutEjecutivo: getCookie('Rut'),
            };

            fetch(`http://${motor_api_server}:4002/wapp`, {
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
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjIgn',
                    timer: 3000
                });

                appWapp.setDefaultsModal();
                appWapp.loadTablaListaWapp();
            });
        },
        setDefaultsModal() {
            $('#txtRutIng').val('');
            $('#txtDvIng').val('');
            $("#txtNomContIng").val('');
            $('#txtPuntotIng').val('');
            $('#txtEstamentotIng').val('');
            $("#txtCelulartIng").val('');
        },
    }
});












