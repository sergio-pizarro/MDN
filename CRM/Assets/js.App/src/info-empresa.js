jQuery.support.cors = true;
var appInfoEmpresa = new Vue({
    el: '#infoEmpresa',
    data: {
        dataModal: {}
    },

    mounted() {
        
    },
    methods: {
        obtenerInfoEmpresa(rutEmpresa) {
            //let rutEmpresa = $('#afi_empresa_rut').val();
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            fetch(`http://${motor_api_server}:4002/info-empresa/lista-info-empresa/${rutEmpresa}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos[0];
                    return datos
                })
        },
    }
});














