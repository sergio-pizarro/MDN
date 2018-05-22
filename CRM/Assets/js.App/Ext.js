
function httpGet(param) {
    url = document.URL;
    url = String(url.match(/\?+.+/));
    url = url.replace("?", "");
    url = url.split("&");

    x = 0;
    while (x < url.length) {
        p = url[x].split("=");
        if (p[0] == param) {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) +
      ((exdays == null) ? "" : ("; expires=" + exdate.toUTCString()));
    document.cookie = c_name + "=" + c_value + "; path=/";
}

function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'].replace(/\./g,'');
    }
    return returnArray;
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getHabilDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        if (date.toString().charAt(0) !== "S") {
            days.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getDaysNoTrabajados(fini, ffin, laAusencia) {
    var init = new Date(fini);
    var finit = new Date(ffin);
    var days = [];
    while (init <= finit) {
        days.push({ fecha: new Date(init), ausencia: laAusencia });
        init.setDate(init.getDate() + 1);
    }
    return days;
}

function CalcularDiasHabiles(fechaInicio, cantidadDias) {
    var fecha_inicio = parseDate(fechaInicio)
    var i = 1;
    while (i < parseInt(cantidadDias)) {
        fecha_inicio.setDate(fecha_inicio.getDate() + 1);
        if (fecha_inicio.toString().charAt(0) !== "S") {
            i++;
        }
    }
    return fecha_inicio.getDate().toString().paddingLeft("00") + "-" +(fecha_inicio.getMonth() +1).toString().paddingLeft("00") + "-" +fecha_inicio.getFullYear().toString();        
}

function CalcularDiasHabilesFer(fechaInicio, cantidadDias, feriados) {
    var fecha_inicio = parseDate(fechaInicio)
    var i = 1;
    while (i < parseInt(cantidadDias)) {
        fecha_inicio.setDate(fecha_inicio.getDate() + 1);

        if (fecha_inicio.toString().charAt(0) !== "S" && $.inArray(fechaNumerica(fecha_inicio), feriados) == -1) {
            i++;
        }
    }
    return fecha_inicio.getDate().toString().paddingLeft("00") + "-" + (fecha_inicio.getMonth() + 1).toString().paddingLeft("00") + "-" + fecha_inicio.getFullYear().toString();
}

function fechaNumerica(e) {
    return e.getFullYear().toString() + (e.getMonth() + 1).toString().paddingLeft("00") + e.getDate();
}

function fechaToPeriodo(e) {
    return e.getFullYear().toString() + (e.getMonth() + 1).toString().paddingLeft("00");
}


function CantidadDiasHabiles(FechaInicio, FechaFin) {
    var fecha_inicio = parseDate(FechaInicio);
    var fecha_fin = parseDate(FechaFin);
    var i = 1;
    while (fecha_inicio <= fecha_fin) {
        fecha_inicio.setDate(fecha_inicio.getDate() + 1);
        if (fecha_inicio.toString().charAt(0) !== "S") {
            i++;
        }
    }
    return i;
}

function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

function CantidadDiasCorridos(FechaInicio, FechaFin) {
    return Math.round((FechaFin - FechaInicio) / (1000 * 60 * 60 * 24)) +1;
}

function CalcularDiasCorridos(FechaInicio, CantidadDias) {
    var f = parseDate(FechaInicio);
    CantidadDias = CantidadDias - 1;
    f.setDate(f.getDate() + CantidadDias);
    return f.getDate().toString().paddingLeft("00") + "-" + (f.getMonth() + 1).toString().paddingLeft("00") + "-" + f.getFullYear().toString();
}

(function (window, undefined) {


    jQuery.each(["SecGetJSON", "SecPostJSON", "SecGetBLOB"], function (i, method) {
        jQuery[method] = function (url, data, callback) {
            var typdat = 'json';
            var metodo_peticion = 'get';
            if (method === 'SecPostJSON') {
                metodo_peticion = 'post'
            }

            if (method === 'SecGetBLOB') {
                typdat = 'blob'
            }

            if (jQuery.isFunction(data)) {
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: metodo_peticion,
                headers: {
                    "Token": getCookie("Token"),
                    "TokenExpiry": "900",
                    "Access-Control-Expose-Headers": "Token,TokenExpiry"
                },
                dataType: typdat,
                data: data,
                success: callback
            });
        };
    });

})(window);

Date.prototype.monthDays = function()
{
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

Date.prototype.monthDaysLeft = function () {

    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate() - this.getDate();
}

Date.prototype.toChileanDateString = function()
{
    var month = String(this.getMonth() + 1);
    var day = String(this.getDate());
    const year = String(this.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + '-' + month + '-' + year;
}

Date.prototype.toChileanDateTimeString = function () {
    var month = String(this.getMonth() + 1);
    var day = String(this.getDate());
    const year = String(this.getFullYear());

    var hour = String(this.getUTCHours());
    var minute = String(this.getMinutes());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + '-' + month + '-' + year + ' ' + hour + ':' + minute;
}

String.prototype.toFechaHora = function () {
    var x = this.split("T")
    var fec = x[0]
    var hor = x[1]
    var y = fec.split("-")
    return y[2] + '-' + y[1] + '-' + y[0] + ' ' + hor;

}

String.prototype.toFecha = function () {

    if (this == "N/A")
        return this;

    var x = this.split("T")
    var fec = x[0]
    var y = fec.split("-")
    return y[2] + '-' + y[1] + '-' + y[0];
}

String.prototype.addSlashes = function()
{
    //return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    return this.replace(/\'/g, '')
}

String.prototype.OrdenaNombre = function () {


    if (this.indexOf(",") > -1) {
        var EjecName = this.split(',');
        var EjecApellidos = EjecName[0];
        var EjecNombres = EjecName[1];
        var EjecNN = EjecNombres.trim().split(" ")
        var EjecAP = EjecApellidos.trim().split(" ")

        return EjecNN[0]+ ' ' +EjecAP[0];
    } else {
        return this;
    }
}

function Evalua(valor) {
    return valor == null ? '' : valor;
}

String.prototype.toEtiquetaPreAprobados = function(hijo)
{
    var sinGestion = 'label-default', pendientes = 'label-warning', cierrePositivo = 'label-success', cierreNegativo = 'label-danger'

    var f = [];
    f['Teléfonos no corresponden'] = cierreNegativo
    f['Se llama en diferente horario fonos, buzón de voz'] = cierreNegativo
    f['Cliente Molesto'] = cierreNegativo
    f['Crédito Cursado'] = cierrePositivo
    f['Desiste Cliente'] = cierreNegativo
    f['No se interesa por un Crédito'] = cierreNegativo
    f['Rechazo Caja'] = cierreNegativo

    f['Agendé Visita'] = pendientes
    f['Cliente Re agenda Visita'] = pendientes
    f['Ingresado a Comité'] = pendientes
    f['Crédito Aprobado'] = pendientes
    f['Cliente Ocupado'] = pendientes
    f['No pude hablar con nadie'] = pendientes
    f['Teléfono correcto, se habló con tercero válido'] = pendientes
    f['Telefonos no corresponden'] = pendientes
    f['Se llama en diferentes horarios'] = pendientes

    f['Sin Gestión'] = sinGestion
    

    var t = '<span class="label {CLASE}">{VALOR}</span>';


    return t.replace("{CLASE}", f[hijo]).replace("{VALOR}", this);
}


String.prototype.toEtiquetaPrioridad = function () {
    
    var f = [];
    f[1] = 'badge-success';
    f[2] = 'badge-yelow';
    f[3] = 'badge-warning';
    f[4] = 'badge-danger';
    f[5] = 'badge-purple';
    f[6] = 'badge-neutral';
    
    var d = [];
    d[1] = 'verde';
    d[2] = 'amarillo';
    d[3] = 'naranjo';
    d[4] = 'rojo';
    d[5] = 'morado';
    d[6] = 'neutral';
    
    var t = '<span class="badge {CLASE}">{VALOR}</span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", (this > 5 ? "": this) ); //.replace("{COLOR}",d[this]);
}

String.prototype.toEtiquetaPrioridadScan = function () {
    
    var f = [];
    f[0] = 'badge-neutral';
    f[1] = 'badge-success';
    f[2] = 'badge-yelow';
    f[3] = 'badge-warning';
    f[4] = 'badge-danger';
    f[5] = 'badge-purple';
    f[6] = 'badge-neutral';
    
    var d = [];
    d[0] = 'light';
    d[1] = 'verde';
    d[2] = 'amarillo';
    d[3] = 'naranjo';
    d[4] = 'rojo';
    d[5] = 'morado';
    d[6] = 'neutral';
    
  
        var t = '<span class="badge {CLASE}">{VALOR} <label style="display:none;">{COLOR}</label></span>';

        return t.replace("{CLASE}", f[this]).replace("{VALOR}", (this > 5 ? "": this) ).replace("{COLOR}",d[this]);
    
   
}
String.prototype.toEtiquetaFlagLicencia = function () {

    var f = [];
    f[1] = 'badge-success';
    f[2] = 'badge-yelow';
    f[3] = 'badge-danger';
    f[4] = 'badge-mint';
    f[5] = 'badge-purple';
    f[6] = 'badge-warning';

    var d = [];
    d[1] = 'verde';
    d[2] = 'amarillo';
    d[3] = 'rojo';
    d[4] = 'naranjo'; 
    d[5] = 'morado';
    d[6] = 'neutral';

    var t = '<span class="badge {CLASE}"><label></label><label></label><label style="display:none;">{COLOR}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{COLOR}", d[this]);
}
String.prototype.toEtiquetaFlagLicenciaGrilla = function () {

    var f = [];
    f[1] = 'badge-success';
    f[2] = 'badge-yelow';
    f[3] = 'badge-danger';
    f[4] = 'badge-mint';
    f[5] = 'badge-warning';
    f[6] = 'badge-purple';

    var d = [];
    d[1] = 'verde';
    d[2] = 'amarillo';
    d[3] = 'rojo';
    d[4] = 'naranjo';
    d[5] = 'morado'; 
    d[6] = 'neutral';

    var t = '<span class="badge {CLASE}"><label></label><label></label><label style="display:none;">{COLOR}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{COLOR}", d[this]);
}

String.prototype.toEtiquetaSuperior = function (c) {

    var x = "badge-warning";
    if (typeof c !== "undefined") {
        x = "badge-danger";
    }

    if (this.length > 0) {
        var t = '<span class="badge ' + x + '">{VALOR}</span>';
        return t.replace("{VALOR}", this);
    } else {

        return "";
    }

    
}

String.prototype.toEtiquetaPrioridadNormalizacion = function () {

    var f = [];
    f[1] = 'badge';
    f[2] = 'badge';
    f[3] = 'badge';
    f[4] = 'badge';


    var d = [];
    d[1] = 'verde';
    d[2] = 'amarillo';
    d[3] = 'naranjo';
    d[4] = 'rojo';

    var t = '<span class="badge {CLASE}">{VALOR} <label style="display:none;">{COLOR}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{COLOR}", d[this]);
}


String.prototype.toEtiquetaSeleccion = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-success ion-checkmark-round';

    var d = [];
    d[0]=  'gestionados'
    d[1] = 'contactados';
  
    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}


String.prototype.toEtiquetaAsignados = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-success ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'asignado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}

String.prototype.toEtiquetaGestionados = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'gestionado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}


String.prototype.toEtiquetaContactado = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'contactado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}
String.prototype.toEtiquetaPresentado = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'presentado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}
String.prototype.toEtiquetaAprobado = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'aprobado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}
String.prototype.toEtiquetaCursado = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'cursado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}
String.prototype.toEtiquetaInteresado = function () {

    var f = [];
    f[0] = 'nada'
    f[1] = 'badge-info ion-checkmark-round';

    var d = [];
    d[0] = 'nada'
    d[1] = 'interesado';

    var t = '<span class="badge {CLASE}"><label style="display:none; align-items:center;">{NUMERO}</label></span>';

    return t.replace("{CLASE}", f[this]).replace("{VALOR}", this).replace("{NUMERO}", d[this]);
}

String.prototype.toEtiquetaPloma = function () {


    var n = [];
    n[1] = "uno_";
    n[2] = "dos_";
    n[3] = "tres_";
    n[4] = "cuatro_";

    var t = '<span class="badge badge-gray">{VALOR} <label style="display:none;">{NUMERO}</label></span>';

    return t.replace("{VALOR}", this).replace("{NUMERO}",n[this]);
}

String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
};




Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep) {
    var n = this,
    c = isNaN(decimals) ? 0 : Math.abs(decimals),
    d = decimal_sep || ',', 
    t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep, 
    sign = (n < 0) ? '-' : '',
    i = parseInt(n = Math.abs(n).toFixed(c)) + '',
    j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}


$(function () {



    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
            

            
            if (DEBUG_JS) {
                console.log('event', event)
                console.log('jqxhr', jqxhr)
                console.log('settings', settings)
                console.log('thrownError', thrownError)
            } else {
                const ajx = jqxhr;
                switch(ajx.status) 
                {
                    case 401:
                        location.href = BASE_URL + "/motor/home/Acceso";
                        break;
                    default:
                        console.log('event', event)
                        console.log('jqxhr', jqxhr)
                        console.log('settings', settings)
                        console.log('thrownError', thrownError)
                }
                
            }
        });

   

    var nid = getCookie("Noticia")
    if (nid > 0)
    {

        $.SecGetJSON(BASE_URL + "/motor/api/Config/noticia-inicio", { idNoticia: nid }, function (noticia) {

            var modalOptions = { show: true}

            $("#notini-title").html(noticia.noti_titulo);
            $("#notini-body").html(noticia.noti_cuerpo);
            
            if (noticia.noti_cerrable === 0)
            {
                modalOptions.backdrop = 'static';
                modalOptions.keyboard = false;
                $(".puede-cerrarse").hide();
            }

            $("#notini-modal").modal(modalOptions).on("hidden.bs.modal", function () {
                
                $.SecGetJSON(BASE_URL + "/motor/api/Config/noticia-leida", function () {
                    setCookie("Noticia", "0", 2);

                })

            });
        });
    }

    



    if (sessionStorage.getItem('menu_principal') == null)
    {
        $.SecGetJSON(BASE_URL + "/motor/api/Auth/menu", function (categorias) {

            sessionStorage.setItem('menu_principal', JSON.stringify(categorias));

            $.each(categorias, function (i, categoriaItm) {

                $("#mainnav-menu").append($("<li>").addClass("list-header").text(categoriaItm.Nombre))

                Recxve(categoriaItm.Menus, $("#mainnav-menu"));
            });



            //Otras campañas siempre al final
            $.SecGetJSON(BASE_URL + "/CPEngine/api/camp/lista-camps-ejecutivo", { re: getCookie("Token") }, function (menus) {

                sessionStorage.setItem('menu_campasejec', JSON.stringify(menus));

                var algunaCamp = 0, cUL = $("<ul>");

                $.each(menus, function (i, e) {
                    if (e.Activa) {
                        cUL.append('<li>' +
                                ' <a href="/motor/App/Engine?cc=' + e.CodCamp + '" >' +
                                    '  <span class="menu-title">' +
                                    '      <strong>' + e.IdentidadCamp + '</strong>' +
                                    '  </span>' +
                                '  </a>' +
                            ' </li>');
                        algunaCamp++;
                    }
                });

                if (algunaCamp > 0) {
                    //.addClass("active-link")
                    $("#mainnav-menu").append($("<li>").addClass("list-header").text("Otras Campañas"))
                    $("#mainnav-menu").append($("<li>").append(
                          $("<a>").addClass("otras-campas").attr({ href: "#" }).append(
                              $("<i>").addClass("ion-clipboard")
                          ).append(
                              $("<span>").addClass("menu-title").append($("<strong>").text("Mis Campañas"))
                          )
                      ).append(cUL));
                }



                $.niftyNav('bind')

            });




        });
    }
    else
    {
        var categorias = JSON.parse(sessionStorage.getItem('menu_principal'));
        $.each(categorias, function (i, categoriaItm) {

            $("#mainnav-menu").append($("<li>").addClass("list-header").text(categoriaItm.Nombre))

            Recxve(categoriaItm.Menus, $("#mainnav-menu"));
        });


        var menus = JSON.parse(sessionStorage.getItem('menu_campasejec'));
        var algunaCamp = 0, cUL = $("<ul>");

        $.each(menus, function (i, e) {
            if (e.Activa) {
                cUL.append('<li>' +
                        ' <a href="/motor/App/Engine?cc=' + e.CodCamp + '" >' +
                            '  <span class="menu-title">' +
                            '      <strong>' + e.IdentidadCamp + '</strong>' +
                            '  </span>' +
                        '  </a>' +
                    ' </li>');
                algunaCamp++;
            }
        });

        if (algunaCamp > 0) {
            //.addClass("active-link")
            $("#mainnav-menu").append($("<li>").addClass("list-header").text("Otras Campañas"))
            $("#mainnav-menu").append($("<li>").append(
                  $("<a>").addClass("otras-campas").attr({ href: "#" }).append(
                      $("<i>").addClass("ion-clipboard")
                  ).append(
                      $("<span>").addClass("menu-title").append($("<strong>").text("Mis Campañas"))
                  )
              ).append(cUL));
        }



        $.niftyNav('bind')
    }

   










    function Recxve(arreglo, elmBase) {
        var cLi, cUl, cAnch, cIcon, cText
        $.each(arreglo, function (i, menuItm) {
            cLi = $("<li>")
            cAnch = $("<a>").attr({ href: menuItm.MenuMetaData.Enlace });
            cIcon = $("<i>").addClass(menuItm.MenuMetaData.Icono);
            cText = $("<span>").addClass("menu-title").append($("<strong>").text(menuItm.Nombre));
            cLi.append(cAnch.append(cIcon).append(cText));

            if(menuItm.Hijos.length > 0)
            {
                cUl = $("<ul>");
                Recxve(menuItm.Hijos, cUl);
                cLi.append(cUl)        
            }

            $(elmBase).append(cLi);
        });

        
    }

})