var clipboard = new Clipboard("#btn_copiar", {
    container: document.getElementById('demo-lg-modal'),
    text: function () {
        return $("#afi_correos").find(':selected').html();
    }
});
var clipboard = new Clipboard("#btn_copiarTMC", {
    container: document.getElementById('demo-lg-modal-tmc'),
    text: function () {
        return $("#afi_correosTMC").find(':selected').html();
    }
});

clipboard.on("success", function (e) {
    alert("Correo Copiado!!!!");
});

$(function () {

    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }

    var Variables = {
        Afiliado_Current: null
    }

    var render = {
        PreaProbadosTableBody: (data, elm) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();

                //data-target="#mdl_data" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '"
                ///motor/App/Gestion/Oferta/' + e.Seguimiento.Periodo + '/' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '/' + e.Seguimiento.TipoAsignacion + '
                elm.append(
                    $("<tr>")
                        .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                        .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                        .append($("<td>").append(e.Seguimiento.Empresa))
                        .append($("<td>").append(e.Seguimiento.Segmento))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                        .append($("<td>").append('$' + e.Seguimiento.PreAprobadoFinal.toMoney(0)))
                        .append($("<td>").append(e.Seguimiento.Prioridad.toString().toEtiquetaPrioridad() + (e.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')))
                        .append($("<td>").append(e.Seguimiento.TipoCampania))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.SubEstadoGestion.eges_nombre : 'Sin Gestión'))
                );
            });
        },
        RecuperacionesTableBody: (data) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();

                $("#bdy_datos_recu")
                            .append(
                                $("<tr>")
                                    .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                                    .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                                    .append($("<td>").append(e.Seguimiento.Empresa))
                                    .append($("<td>").append(e.Seguimiento.Segmento))
                                    .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                                    .append($("<td>").append('$' + e.Seguimiento.PreAprobadoFinal.toMoney(0)))
                                    .append($("<td>").append(e.Seguimiento.Prioridad.toString().toEtiquetaPloma() + (e.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')))
                                    .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.CausaBasalGestion.eges_nombre : 'Sin Causa'))
                                    .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.ConsecuenciaGestion.eges_nombre : 'Sin Consecuencia'))
                                    .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                            );

            });
        },
        SegCesantiaTableBody: (data, elm) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();


                elm.append(
                    $("<tr>")
                        .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                        .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                        .append($("<td>").append(e.Seguimiento.PensionadoFFAA))
                        .append($("<td>").append(e.Seguimiento.Prioridad))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.SubEstadoGestion.eges_nombre : 'Sin Gestión'))
                );
            });
        },
        HistorialGestion: function (gesList) {
            //Gestiones Realizadas
        $("#gestiones_realizadas").html("");
        $.each(gesList, function (i, e) {
            $("#gestiones_realizadas").append($("<a>").attr("href", '#')
                 .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Gestor.EjecutivoData.Nombres))
                 .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.GestionBase.FechaAccion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.GestionBase.FechaCompromete.toFecha()))
                 .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.EstadoGestion.eges_nombre + ",  <strong>Sub Estado:</strong> " + e.SubEstadoGestion.eges_nombre))
                 .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.GestionBase.Descripcion))
             );
        });
          
        if (gesList.length > 0 && gesList[0].EstadoGestion.ejes_terminal === "CERRADOS") {
            $(".esconder").hide();
        } else {
            $(".esconder").show();
        }

        $("#morfeable_monto").text("Monto Pre Aprobado");

    },
        HistorialGestionRecuperaciones: function (gesList) {
            $("#gestiones_realizadas").html("");
            $.each(gesList, function (i, e) {
                var consecuencia = (e.ConsecuenciaGestion !== null) ? ", <strong>Consecuencia:</strong> " + e.ConsecuenciaGestion.eges_nombre : "";
                var estatus = (e.EstadoGestion !== null) ? ", <strong>Estado:</strong> " + e.EstadoGestion.eges_nombre : "";
                $("#gestiones_realizadas").append($("<a>").attr("href", '#')
                     .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Gestor.EjecutivoData.Nombres))
                     .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.GestionBase.FechaAccion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.GestionBase.FechaCompromete.toFecha()))
                     .append($("<p>").addClass("list-group-item-text").html("<strong>Causa basal:</strong> " + e.CausaBasalGestion.eges_nombre + consecuencia + estatus))
                     .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.GestionBase.Descripcion))
                 );
            });

            if (gesList.length > 0 && gesList[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                $(".esconder").hide();
            } else {
                $(".esconder").show();
            }
        }
    }

    var Cargador = {
        CargaPreAprobados: function (p_periodo) {


            //Carga de selects Filtros de Pre Aprobados
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: 0 }, function (datos) {

                $("#demo-foo-filter-status").html("");
                $("#demo-foo-filter-status").append($("<option>").attr("value", "").html("Seleccione"));
                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-status").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });

            $("#bdy_datos").html("");
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v2/lista-seguimientos", { tipoCampagna: 1, periodo: p_periodo }, function (menus) {
                //sessionStorage.setItem('lista_seguimientos_preaprobados', JSON.stringify({ periodo: p_periodo, data: menus }));
                render.PreaProbadosTableBody(menus, $('#bdy_datos'));
                if (typeof $('#demo-foo-filtering').data('footable') !== "undefined") {
                    $('#demo-foo-filtering').data('footable').redraw();
                }
            });



            //sessionStorage.setItem('lista_seguimientos_preaprobados', null);
            //Pre Aprobados
            /*var segimientos = JSON.parse(sessionStorage.getItem('lista_seguimientos_preaprobados'));
            if (segimientos === null || (segimientos !== null && segimientos.periodo !== p_periodo.toString()))
            {
                
            }
            else
            {
                $("#bdy_datos").html("");
                render.PreaProbadosTableBody(segimientos.data, $('#bdy_datos'));
                if (typeof $('#demo-foo-filtering').data('footable') !== "undefined") {
                    var ft = $('#demo-foo-filtering').data("footable");
                    ft.redraw();
                    //console.log(localStorage.getItem('footable-page-comercial') != null ? localStorage.getItem('footable-page-comercial') : 0)
                    //$(ft.table).data('currentPage', localStorage.getItem('footable-page-comercial') != null ? localStorage.getItem('footable-page-comercial') : 0);
                    //ft.raise('footable_page_filled');
                    //ft.pageInfo.currentPage = localStorage.getItem('footable-page-comercial') != null ? localStorage.getItem('footable-page-comercial') : 0;
                    //ft.raise('footable_paging', { page: parseInt(localStorage.getItem('footable-page-comercial') != null ? localStorage.getItem('footable-page-comercial') : 0), size: ft.pageInfo.pageSize });
                }
                

            }*/



        },
        CargaRecuperaciones: function (p_periodo) {

            //Carga de selects Filtros de Normalizaciones
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 2, padre: 0 }, function (datos) {

                $("#flt_causa_normalizacion").html("");
                $("#flt_causa_normalizacion").append($("<option>").attr("value", "").html("Todos"));

                $.each(datos, function (i, e) {
                    $("#flt_causa_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });
            //Carga de selects Filtros de Normalizaciones
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 2, padre: 10 }, function (datos) {

                $("#flt_consecuencia_normalizacion").html("");
                $("#flt_consecuencia_normalizacion").append($("<option>").attr("value", "").html("Todos"));

                $.each(datos, function (i, e) {
                    $("#flt_consecuencia_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });
            //Carga de selects Filtros de Normalizaciones
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 2, padre: 20 }, function (datos) {

                $("#flt_estado_normalizacion").html("");
                $("#flt_estado_normalizacion").append($("<option>").attr("value", "").html("Todos"));

                $.each(datos, function (i, e) {
                    $("#flt_estado_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });


            $("#bdy_datos_recu").html("");
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v2/lista-seguimientos", { tipoCampagna: 2, periodo: p_periodo }, function (menus) {

                //sessionStorage.setItem('lista_seguimientos_recuperaciones', JSON.stringify({ periodo: p_periodo, data: menus }));
                render.RecuperacionesTableBody(menus, $("#bdy_datos_recu"))

                if (typeof $('#demo-foo-filtering-recu').data('footable') !== "undefined") {
                    $('#demo-foo-filtering-recu').data('footable').redraw();
                }
            });



            //Recuperaciones
            //sessionStorage.clear();
            //sessionStorage.setItem('lista_seguimientos_recuperaciones', null);
            /*var segimientos = JSON.parse(sessionStorage.getItem('lista_seguimientos_recuperaciones'));
            if (segimientos === null || (segimientos !== null && segimientos.periodo !== p_periodo.toString()))
            {
                
            } else {
                render.RecuperacionesTableBody(segimientos.data, $("#bdy_datos_recu"))
                if (typeof $('#demo-foo-filtering-recu').data('footable') !== "undefined") {
                    $('#demo-foo-filtering-recu').data('footable').redraw();
                }
            }*/


        },
        CargaNormalizacionTMC: function (p_periodo) {
            ////////////////////////////////////////////////////////////////////
            /////DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED/////////
            /////DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED/////////
            /////DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED/////////
            /////DEPRECATED DEPRECATED DEPRECATED DEPRECATED DEPRECATED/////////
            ////////////////////////////////////////////////////////////////////

            //Pre Aprobados
            $("#bdy_datos_TMC").html("");
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-seguimientos", { tipoCampagna: 3, periodo: p_periodo }, function (menus) {


                /*if (menus.length == 0 && getCookie("Cargo") !== "Agente") {
                    $("#tab_preaprobados").hide();
                    $('#tab_recuperaciones').tab('show')
                    return false;
                }*/

                $.each(menus, function (i, e) {

                    e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                    e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                    e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                    e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();

                    $("#bdy_datos_TMC")
                        .append(
                            $("<tr>")
                                .append($("<td>").append('<a href="#" class="btn-link" data-target="#demo-lg-modal" data-toggle="modal" data-afiliado=\'' + JSON.stringify(e) + '\'>' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                                .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                               // .append($("<td>").append(e.Seguimiento.Segmento))
                                .append($("<td>").append((e.HistorialGestion.length > 0 && e.HistorialGestion[0].GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.HistorialGestion[0].GestionBase.FechaCompromete.toFecha() : 'N/A'))
                                .append($("<td>").append('$' + e.Seguimiento.PreAprobadoFinal.toMoney(0)))
                               // .append($("<td>").append(e.Seguimiento.Prioridad.toString().toEtiquetaPrioridad() + (e.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')))
                               // .append($("<td>").append(e.Seguimiento.TipoCampania))
                                .append($("<td>").append((e.HistorialGestion.length > 0) ? e.HistorialGestion[0].EstadoGestion.eges_nombre : 'Sin Gestión'))
                                .append($("<td>").append((e.HistorialGestion.length > 0) ? e.HistorialGestion[0].SubEstadoGestion.eges_nombre : 'Sin Gestión'))
                        );
                });

                if (typeof $('#demo-foo-filtering-TMC').data('footable') !== "undefined") {
                    $('#demo-foo-filtering-TMC').data('footable').redraw();
                }




            });
        },
        CargaNormalizacionSC: function (p_periodo) {
            //Pre Aprobados
            $("#bdy_datos_SC").html("");
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v2/lista-seguimientos", { tipoCampagna: 4, periodo: p_periodo }, function (menus) {

                render.SegCesantiaTableBody(menus, $("#bdy_datos_SC"));

                if (typeof $('#demo-foo-filtering-SC').data('footable') !== "undefined") {
                    $('#demo-foo-filtering-SC').data('footable').redraw();
                }


            });
        },
        CargaPreAprobadosDR: function (p_periodo) {


            //Carga de selects Filtros de Pre Aprobados
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: 0 }, function (datos) {

                $("#demo-foo-filter-statusDR").html("");
                $("#demo-foo-filter-statusDR").append($("<option>").attr("value", "").html("Seleccione"));
                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });

            });


            //Pre Aprobados
            $("#bdy_datosDR").html("");
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v2/lista-seguimientos", { tipoCampagna: 5, periodo: p_periodo }, function (menus) {

                render.PreaProbadosTableBody(menus, $("#bdy_datosDR"));

                if (typeof $('#demo-foo-filteringDR').data('footable') !== "undefined") {
                    $('#demo-foo-filteringDR').data('footable').redraw();
                }

            });
        }
    }



    // Filtering
    var filtering_recup = $('#demo-foo-filtering-recu');

    filtering_recup.footable().on('footable_filtering', function (e) {

        var selected1 = $('#flt_causa_normalizacion').find(':selected').html();
        if (selected1 != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected1 : selected1;
        }

        var selected2 = $('#flt_consecuencia_normalizacion').find(':selected').html();
        if (selected2 != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected2 : selected2;
        }

        var selected3 = $('#flt_estado_normalizacion').find(':selected').html();
        if (selected3 != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected3 : selected3;
        }

        var selectedX = $('#slPrioridad_normalizacion').find(':selected').html();
        if (selectedX != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedX : selectedX;
        }

        e.clear = !e.filter;
    });

    // Filter status
    $('#flt_causa_normalizacion').change(function (e) {
        e.preventDefault();
        filtering_recup.trigger('footable_filter', { filter: '' });
    });

    $('#flt_consecuencia_normalizacion').change(function (e) {
        e.preventDefault();
        filtering_recup.trigger('footable_filter', { filter: '' });
    });


    $('#flt_estado_normalizacion').change(function (e) {
        e.preventDefault();
        filtering_recup.trigger('footable_filter', { filter: '' });
    });

    $('#slPrioridad_normalizacion').change(function (e) {
        e.preventDefault();
        filtering_recup.trigger('footable_filter', { filter: '' });
    });

    // Search input
    $('#demo-foo-search_normalizacion').on('input', function (e) {
        e.preventDefault();
        if ($(this).val().length >= 5 || $(this).val().length == 0) {
            filtering_recup.trigger('footable_filter', { filter: $(this).val() });
        }
    });



    



    // Filter status
    $('#demo-foo-filter-status').change(function (e) {
        e.preventDefault();

        if ($(this).val() != '') {
            $("#demo-foo-filter-statusSub").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: $(this).val() }, function (datos) {
                $("#demo-foo-filter-statusSub").html("");
                $("#demo-foo-filter-statusSub").append($("<option>").attr("value", "").html("Seleccione"));
                $("#demo-foo-filter-statusSub").append($("<option>").attr("value", "-1").html("Sin Gestión"));
                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusSub").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#demo-foo-filter-statusSub").html("");
            $("#demo-foo-filter-statusSub").attr("disabled", true);
        }
    });

    /*$('#demo-foo-filter-statusSub').change(function (e) {
        e.preventDefault();
        filtering.trigger('footable_filter', { filter: '' });
    });*/










    //////////////////////////////////////////////////////////////////////////////////
    // Filtros

    var filteringDR = $('#demo-foo-filteringDR');

    filteringDR.footable
        ({
            paging: {
                current: !!window.localStorage ? localStorage.getItem('footable-page-dr') : 1
            }
        }).on('after.ft.paging', function (e, ftbl, pager) {
            if (!!window.localStorage) {
                localStorage.setItem('footable-page-dr', pager.page);
            }
        }).on('footable_filtering', function (e) {


            var selected = $('#demo-foo-filter-statusDR').find(':selected').html();

            if (selected !== "Seleccione") {
                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;


                var selected2 = $('#demo-foo-filter-statusSubDR').find(':selected').html();

                if (selected2 !== "Todos" && selected2 !== "Seleccione" && selected2 !== "undefined") {

                    e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected2 : selected2;
                }
            }

            var selectedX = $('#slPrioridadDR').find(':selected').html();
            if (selectedX != "Todos") {
                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedX : selectedX;
            }

            var selectedT = $('#slTipoDR').find(':selected').val();
            if (selectedT != "Todos") {
                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedT : selectedT;
            }


            var selectedSeg = $('#slSegmentoDR').find(':selected').val();
            if (selectedSeg != "Todos") {
                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedSeg : selectedSeg;
            }

            //console.log(e.filter)


            e.clear = !e.filter;

        });

    // Filter status
    $('#demo-foo-filter-statusDR').change(function (e) {
        e.preventDefault();
        filteringDR.trigger('footable_filter', { filter: '' });

        if ($(this).val() != '') {
            $("#demo-foo-filter-statusSubDR").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: $(this).val() }, function (datos) {
                $("#demo-foo-filter-statusSubDR").html("");
                $("#demo-foo-filter-statusSubDR").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusSubDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#demo-foo-filter-statusSubDR").html("");
            $("#demo-foo-filter-statusSubDR").attr("disabled", true);
        }
    });

    $('#demo-foo-filter-statusSubDR').change(function (e) {
        e.preventDefault();
        filteringDR.trigger('footable_filter', { filter: '' });
    });

    $('#slPrioridadDR').change(function (e) {
        e.preventDefault();
        filteringDR.trigger('footable_filter', { filter: '' });
    });


    $('#slTipoDR').change(function (e) {
        e.preventDefault();
        filteringDR.trigger('footable_filter', { filter: '' });
    });

    $('#slSegmentoDR').change(function (e) {
        e.preventDefault();
        filteringDR.trigger('footable_filter', {
            filter: ''
        });
    });


    // Search input
    $('#demo-foo-searchDR').on('input', function (e) {
        e.preventDefault();
        if ($(this).val().length >= 5 || $(this).val().length == 0) {
            filteringDR.trigger('footable_filter', { filter: $(this).val() });
        }
    });





    //add filtros Seg Cesantía

    //////////////////////////////////////////////////////////////////////////////////
    // Filtros

    var filteringSC = $('#demo-foo-filtering-SC');

    filteringSC.footable({
        paging: {
            current: !!window.localStorage ? localStorage.getItem('footable-page-sc') : 1
        }
    }).on('after.ft.paging', function (e, ftbl, pager) {
        if (!!window.localStorage) {
            localStorage.setItem('footable-page-sc', pager.page);
        }
    }).on('footable_filtering', function (e) {


        var selected = $('#demo-foo-filter-status-SC').find(':selected').html();

        if (selected !== "Seleccione") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;


            var selected2 = $('#emo-foo-filter-statusSub-SC').find(':selected').html();

            if (selected2 !== "Todos" && selected2 !== "Seleccione" && selected2 !== "undefined") {

                e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected2 : selected2;
            }
        }

        var selectedX = $('#slPrioridadSC').find(':selected').html();
        if (selectedX != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedX : selectedX;
        }

        var selectedT = $('#slTipoSC').find(':selected').val();
        if (selectedT != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedT : selectedT;
        }


        var selectedSeg = $('#slSegmentoSC').find(':selected').val();
        if (selectedSeg != "Todos") {
            e.filter += (e.filter && e.filter.length > 0) ? ' ' + selectedSeg : selectedSeg;
        }

        //console.log(e.filter)


        e.clear = !e.filter;

    });

    // Filter status
    $('#demo-foo-filter-status-SC').change(function (e) {
        e.preventDefault();
        filteringSC.trigger('footable_filter', { filter: '' });

        if ($(this).val() != '') {
            $("#demo-foo-filter-statusSub-SC").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 3, padre: $(this).val() }, function (datos) {
                $("#demo-foo-filter-statusSub-SC").html("");
                $("#demo-foo-filter-statusSub-SC").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusSub-SC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#demo-foo-filter-statusSub-SC").html("");
            $("#demo-foo-filter-statusSub-SC").attr("disabled", true);
        }
    });

    $('#demo-foo-filter-statusSub-SC').change(function (e) {
        e.preventDefault();
        filteringTMC.trigger('footable_filter', { filter: '' });
    });

    $('#slPrioridadSC').change(function (e) {
        e.preventDefault();
        filteringTMC.trigger('footable_filter', { filter: '' });
    });

    $('#slTipoSC').change(function (e) {
        e.preventDefault();
        filteringTMC.trigger('footable_filter', { filter: '' });
    });

    $('#slSegmentoSC').change(function (e) {
        e.preventDefault();
        filteringTMC.trigger('footable_filter', {
            filter: ''
        });
    });


    // Search input
    $('#demo-foo-search-SC').on('input', function (e) {
        e.preventDefault();
        if ($(this).val().length >= 5 || $(this).val().length == 0) {
            filteringTMC.trigger('footable_filter', { filter: $(this).val() });
        }
    });



    //end filtros Seg Cesantía




    //Evento de busqueda de cualquier gestión    
    $("#btn_buscar_otr").on("click", function () {

        var rutAfilado = $("#afi_rut_busc").val().replace(".", "").replace(".", "");
        var tpcmp = $("#PrincipalTabActivo").val();
        if (tpcmp == '2') {
            
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento-rec", { periodo: $("#slPeriodo_normalizacion").val(), afiRut: rutAfilado.trim(), tipoCampagna: tpcmp }, function (datos) {

                if (datos.Estado === "OK") {
                   
                    location.href = BASE_URL + '/motor/App/Gestion/Oferta/' + $("#slPeriodo_normalizacion").val() + '/' + rutAfilado + '/' + tpcmp

                }
                else {
                    $.niftyNoty({
                        type: 'primary',
                        container: '#bdy_busqueda',
                        html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                        focus: false,
                        timer: 3000
                    });
                }
            });


        } else {
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento", { periodo: $("#slPeriodo").val(), afiRut: rutAfilado.trim(), tipoCampagna: tpcmp }, function (datos) {

                if (datos.Estado === "OK") {
                    /*$("#afi_rut_busc").data("afiliado", datos.Objeto);
                    $('#demo-lg-modal').modal('toggle', $("#afi_rut_busc"));
                    $('#demo-lg-modal-search').modal('toggle');
                    $("#afi_rut_busc").val("");*/


                    location.href = BASE_URL + '/motor/App/Gestion/Oferta/' + $("#slPeriodo").val() + '/' + rutAfilado + '/' + tpcmp

                }
                else {
                    $.niftyNoty({
                        type: 'primary',
                        container: '#bdy_busqueda',
                        html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                        focus: false,
                        timer: 3000
                    });
                }
            });
        }

       
    });


    //Evento de Estado maestro Pre Aprobados
    $("#ges_estado").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestado").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestado").html("");
                $("#ges_subestado").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-gestion').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                $.each(datos, function (i, e) {
                    $("#ges_subestado").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });


            if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                $("#fpg").hide();
            }
            else {
                $("#fpg").show();
            }

        }
        else {
            $("#ges_subestado").html("");
            $("#ges_subestado").attr("disabled", true);
        }
    });


    //Evento de Estado maestro Pre Aprobados Derivados
    $("#ges_estadoDR").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestadoDR").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestadoDR").html("");
                $("#ges_subestadoDR").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-gestionDR').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                $.each(datos, function (i, e) {
                    $("#ges_subestadoDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });


            if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                $("#fpg").hide();
            }
            else {
                $("#fpg").show();
            }

        }
        else {
            $("#ges_subestadoDR").html("");
            $("#ges_subestadoDR").attr("disabled", true);
        }
    });

    //Evento de estado maestro tmc
    $("#ges_estadoSC").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestadoSC").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestadoSC").html("");
                $("#ges_subestadoSC").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-ges_subestadoSC').bootstrapValidator('updateStatus', 'ges_subestadoSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestadoSC');
                $.each(datos, function (i, e) {
                    if (e.ejes_terminal != "SISTEMA") {
                        $("#ges_subestadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                    }

                });
            });


            if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                $("#fpgSC").hide();
            }
            else {
                $("#fpgSC").show();
            }

        }
        else {
            $("#ges_subestadoTMC").html("");
            $("#ges_subestadoTMC").attr("disabled", true);
        }
    });

    //end tmc

    //Recarga de periodo de Normalizaciones
    $("#slPeriodo_normalizacion").on("change", function () {
        Cargador.CargaRecuperaciones($(this).val());
    });

    //Recarga de periodo de preaprobados
    //$("#slPeriodo").on("change", function () {
    //    Cargador.CargaPreAprobados($(this).val());
    //});

    //Recarga de periodo de preaprobados derivaciones
    $("#slPeriodoDR").on("change", function () {
        Cargador.CargaPreAprobadosDR($(this).val());
    });


    //Recarga de periodo de preaprobados
    $("#slPeriodoSC").on("change", function () {
        Cargador.CargaNormalizacionSC($(this).val());
    });

    $("#tab_recuperaciones").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '2');
        $("#PrincipalTabActivo").val("2")

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-periodos", { tipoAsignacion: 2 }, function (datos) {

            $("#slPeriodo_normalizacion").html("");
            $.each(datos, function (i, periodo) {
                $("#slPeriodo_normalizacion").append($("<option>").val(periodo.Periodo).html(periodo.PeriodoText));
            });


            //Trigger para primera carga de Recuperaciones
            $("#slPeriodo_normalizacion").trigger("change");
        });
    })

    $("#tab_preaprobados").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '1');
        $("#PrincipalTabActivo").val("1")

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-periodos", { tipoAsignacion: 1 }, function (datos) {

            $("#slPeriodo").html("");
            $.each(datos, function (i, periodo) {
                $("#slPeriodo").append($("<option>").val(periodo.Periodo).html(periodo.PeriodoText));
            });



            //Trigger para primera carga de preaprobaDOs
            //$("#slPeriodo").trigger("change");
        });
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: 0 }, function (datos) {

            $("#demo-foo-filter-status").html("");
            $("#demo-foo-filter-status").append($("<option>").attr("value", "").html("Seleccione"));
            $("#demo-foo-filter-status").append($("<option>").attr("value", "-1").html("Sin Gestion"));
            $.each(datos, function (i, e) {
                $("#demo-foo-filter-status").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });


            $("#demo-foo-filter-statusDR").html("");
            $("#demo-foo-filter-statusDR").append($("<option>").attr("value", "").html("Seleccione"));
            $.each(datos, function (i, e) {
                $("#demo-foo-filter-statusDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });

        });

    })

    $("#tab_segcesantia").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '4');
        $("#PrincipalTabActivo").val("4")

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-periodos", { tipoAsignacion: 4 }, function (datos) {


            $("#slPeriodoSC").html("");
            $.each(datos, function (i, periodo) {
                $("#slPeriodoSC").append($("<option>").val(periodo.Periodo).html(periodo.PeriodoText));
            });

            //Trigger para primera carga de preaprobaDOs
            $("#slPeriodoSC").trigger("change");
        });
    })

    $("#tab_derivaciones").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '5');
        $("#PrincipalTabActivo").val("5");

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-periodos", { tipoAsignacion: 5 }, function (datos) {

            $("#slPeriodoDR").html("");
            $.each(datos, function (i, periodo) {
                $("#slPeriodoDR").append($("<option>").val(periodo.Periodo).html(periodo.PeriodoText));
            });

            //Trigger para primera carga de preaprobaDOs
            $("#slPeriodoDR").trigger("change");
        });

    })



    
    //NUEVA GRILLA

    $('#button').click(function () {
        $("#tabla_comercial").bootstrapTable('refresh', {
            url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
            query: {
                tipoCampagna: 1,
                periodo: $('#slPeriodo').val(),
                estado: $('#demo-foo-filter-status').val(),
                subestado: $('#demo-foo-filter-statusSub').val(),
                prioridad: $('#slPrioridad').val(),
                segmento: $('#slSegmento').val(),
                tipo: $('#slTipo').val(),
                rut: $('#demo-foo-search').val()
            }
        });

    });

    $("#tabla_comercial").bootstrapTable({
        //url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
        pagination: true,
        sidePagination: 'server',
        ajaxOptions: {
            headers: {
                "Token": getCookie("Token"),
                "TokenExpiry": "900",
                "Access-Control-Expose-Headers": "Token,TokenExpiry"
            }
        },
        queryParams: function (params) {

            params.periodo = $('#slPeriodo').val();
            params.tipoCampagna = 1;
            params.estado = $('#demo-foo-filter-status').val();
            params.subestado = $('#demo-foo-filter-statusSub').val();
            params.prioridad = $('#slPrioridad').val();
            params.segmento = $('#slSegmento').val();
            params.tipo = $('#slTipo').val();
            return params;
        },
        locale: 'es-ES',
        striped: true,
        pagination: true,
        pageSize: 30,
        pageList: [],
        search: false,
        showColumns: false,
        showRefresh: false,
        sortName: 'Seguimiento.Afiliado_Rut',
        columns: [
            {
                field: 'Seguimiento.Afiliado_Rut',
                title: 'Rut',
                sortable: true,
                formatter: function (value, row, index) {
                    return '<a href="#" class="btn-link" data-target="#mdl_data" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                }
            },
            {
                field: 'Seguimiento.Nombre',
                title: 'Nombre',
                sortable: false,
                formatter: function (value, row, index) {
                    return value + ' ' + row.Seguimiento.Apellido
                }
            },
            {
                field: 'Seguimiento.Empresa',
                title: 'Empresa',
                sortable: false
            },
            {
                field: 'Seguimiento.Segmento',
                title: 'Segmento',
                sortable: false
            },
            {
                field: 'UltimaGestion.GestionBase.IdBaseCampagna',
                title: 'Prox. Gestión',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.GestionBase.FechaCompromete.toFecha() === '01-01-1753' ? '-' : row.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A';
                }
            },
            {
                field: 'Seguimiento.PreAprobadoFinal',
                title: 'Pre Aprobado',
                sortable: false,
                align: 'right',
                formatter: function (value, row, index) {
                    return value.toMoney(0);
                }
            },
            {
                field: 'Seguimiento.Prioridad',
                title: 'Prioridad',
                sortable: false,
                formatter: function (value, row, index) {
                    return value.toString().toEtiquetaPrioridad() + (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')
                }
            },

            {
                field: 'Seguimiento.TipoCampania',
                title: 'Tipo',
                sortable: false
            },

            {
                field: 'UltimaGestion.EstadoGestion.eges_id',
                title: 'Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión';
                }
            },

            {
                field: 'UltimaGestion.SubEstadoGestion.eges_id',
                title: 'Sub Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    var mostrar = ''
                    switch(row.UltimaGestion.SubEstadoGestion.eges_id)
                    {
                        case 202:
                            mostrar = '<div class="label label-table label-success">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        case 201:
                        case 203:
                        case 204:
                        case 205:
                        case 206:
                            mostrar = '<div class="label label-table label-danger">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        default:
                            mostrar = '<div class="label label-table label-warning">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';

                    }

                    return value > 0 ? mostrar : '<div class="label label-table label-default">Sin Gestión</div>';
                }
            },


        ]
    })

    //Carga de selects Filtros de Pre Aprobados
    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-oficinas", function (datos) {

        $("#afi_oficina_preferencia").html("");
        $("#afi_oficina_preferencia").append($("<option>").attr("value", "").html("Seleccione"));
        $.each(datos, function (i, e) {
            $("#afi_oficina_preferencia").append($("<option>").attr("value", e.Id).html(e.Nombre))
        });
    });
    

    // END NUEVA GRILLA
    $('#mdl_data').on('show.bs.modal', function (e) {

        
        var trutAfiliado = $(e.relatedTarget).data("rut")
        var tperiodo = $(e.relatedTarget).data("periodo")
        var tipoCamp = $(e.relatedTarget).data("tipo")

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento", { periodo: tperiodo, afiRut: trutAfiliado, tipoCampagna: tipoCamp }, function (datos) {

            if (datos.Estado === "OK") {
                const Asignacion = datos.Objeto;
                const afiData = Asignacion.Seguimiento;
                const gesList = Asignacion.HistorialGestion;

                //DATOS AFILIADO
                $('#afi_rut').val(afiData.Afiliado_Rut.toMoney(0) + '-' + afiData.Afiliado_Dv);
                $('#afi_nombres').val(afiData.Nombre + ' ' + afiData.Apellido);
                $('#afi_segmento').val(afiData.Segmento);
                $('#afi_empresa_nombre').val(afiData.Empresa);
                $('#afi_empresa_rut').val(parseInt(afiData.Empresa_Rut).toMoney(0) + '-' + afiData.Empresa_Dv);
                $('#afi_preaprobado').val(afiData.OfertaTexto.length === 0 ? '$' + afiData.PreAprobadoFinal.toMoney(0) : afiData.OfertaTexto);
                $('#ges_id_asignacion').val(afiData.id_Asign);
                $('#ges_id_asignacion_normalizacion').val(afiData.id_Asign);
                $('#ges_id_asignacionTMC').val(afiData.id_Asign);
                $('#ges_id_asignacionSC').val(afiData.id_Asign);
                $('#afi_oficina_preferencia').val(Asignacion.OficinaPreferencia.Valor_preferencia);
                $('#afi_horario_preferencia').val(Asignacion.HorarioPreferencia.Valor_preferencia);
                $("#OficinaAsig").val(Asignacion.NombreOficina)


                //CONTACTO
                ///////////////////////////////////////////////////////
                $("#afi_telefonos").html("");
                $.each(Asignacion.Telefonos, function (i, telefono) {

                    var n = '+' + telefono.Valor_contacto + ((telefono.Valido === 0) ? ' (malo)' : '');
                    var c = (telefono.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_telefonos").append(c)

                });

                if (Asignacion.Telefonos.length == 0) {
                    $(".desaparecible, .forma-uno").hide();
                }

                ///////////////////////////////////////////////////////
                $("#afi_celulares").html("");
                $.each(Asignacion.Celulares, function (i, celular) {

                    var n = '+' + celular.Valor_contacto + ((celular.Valido === 0) ? ' (malo)' : '');
                    var c = (celular.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_celulares").append(c)

                });

                if (Asignacion.Celulares.length == 0) {
                    $(".desaparecible-cel, .forma-uno-cel").hide();
                }

                ///////////////////////////////////////////////////////
                $("#afi_correos").html("");
                $.each(Asignacion.Correos, function (i, correo) {

                    var n = correo.Valor_contacto + ((correo.Valido === 0) ? ' (malo)' : '');
                    var c = (correo.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_correos").append(c)

                });

                if (Asignacion.Correos.length == 0) {
                    $(".desaparecible-mail, .forma-uno-mail").hide();
                }

                //NOTIFICACIONES
                var sx = false;
                if (typeof Asignacion.Notificaciones != "undefined" && Asignacion.Notificaciones != null && Asignacion.Notificaciones.length > 0) {
                    var text = "";
                    $(".charlyNTFContainer").html("");
                    $.each(Asignacion.Notificaciones, function (i, e) {

                        if (e.Tipo == "LICENCIA") {
                            text += "<strong>Licencias: </strong> Tiene " + e.Cantidad + " <strong>Licencia(s)</strong> pendiente(s) de pago por $" + Number(e.Valor).toMoney()
                        }

                        if (e.Tipo == "PAGEXCESO") {
                            text += "<strong>PEX: </strong> Tiene " + e.Cantidad + " <strong>Pagos en Exceso</strong> pendiente(s) de pago por $" + Number(e.Valor).toMoney()
                        }

                        if (e.Tipo == "SEGCESAN") {
                            text += "<strong>Seguros: </strong> Afiliado cuenta con <strong>Seguro de Cesantía</strong>"
                        }

                        if (e.Tipo == "ACUERPAG") {
                            sx = true;
                        }
                        else {
                            $.niftyNoty({
                                type: 'success',
                                container: '.charlyNTFContainer',
                                html: text,
                                focus: false,
                                closeBtn: false
                            });
                        }
                    });


                    /*TO DO: Revisar la logica*/
                    if (!sx) {
                        $(".charlyNTF").show();
                    }
                }
                else {
                    $(".charlyNTF").hide();
                }

                var info_xxx = "";

                if (Asignacion.FiltrosRSG.length > 0) {
                    info_xxx = ("Filtros Riesgo " + Asignacion.FiltrosRSG).toEtiquetaSuperior('x');
                }


                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-rechazos-rsg", { Periodo: tperiodo, RutEmpresa: afiData.Empresa_Rut, RutAfiliado: afiData.Afiliado_Rut }, function (datos) {
                    $("#letable").html("");
                    $.each(datos, function (i, e) {
                        $("#letable").append($("<tr>").append("<td>").html(e.MotivoRechazo))
                    });
                });


                if (tipoCamp === 1 || tipoCamp === 5) {
                    render.HistorialGestion(gesList);
                    $("#myLargeModalLabel").html("Gestión Comercial " + afiData.Prioridad.toString().toEtiquetaPrioridad() + " " + info_xxx);
                }

                if (tipoCamp === 2) {
                    render.HistorialGestionRecuperaciones(gesList);
                    $("#morfeable_monto").text("Monto Adeudado");
                    $("#myLargeModalLabel").text("Gestión de Normalización, Folio Crédito: " + afiData.RiesgoPerfil);
                }

                if (tipoCamp === 4) {
                    render.HistorialGestion(gesList);
                    $("#myLargeModalLabel").html('Gestión Seg Cesantía ' + afiData.Prioridad.toString().toEtiquetaPrioridad() + " Folios:" + afiData.RiesgoPerfil);// + afiData.Prioridad.toString().toEtiquetaPrioridad() + " " + info_xxx);
                    $("#morfeable_monto").text("Monto Adeudado");
                    $("#afi_preaprobado").val('$' + afiData.PreAprobadoFinal.toMoney(0))
                    $("#morf_cnvs").removeClass("col-sm-6").addClass("col-sm-3")

                    $(".segmento_texto").text("Fecha Colocación");
                    $("#afi_segmento").val(afiData.TipoCampania);

                    $("#labelempresa").text("N° Cuotas morosas");
                    $("#afi_empresa_nombre").val(afiData.EmpresaEsPensionado)

                    $("#labelrutempresa").text("Monto Cuota");
                    $("#afi_empresa_rut").val(afiData.Cuadrante.toMoney(0))

                    $(".charlyNTF").show();
                    $.niftyNoty({
                        type: 'warning',
                        container: '.charlyNTFContainer',
                        html: "<strong>Nota: </strong> Ver detalle de los creditos en sistema</strong>",
                        focus: false,
                        closeBtn: false
                    });

                }
            }
            else {
                $.niftyNoty({
                    type: 'primary',
                    container: '#bdy_busqueda',
                    html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                    focus: false,
                    timer: 3000
                });
            }
        });
        

        //Evento de Estado maestro Pre Aprobados
        $("#ges_estado").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestado").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: $(this).val() }, function (datos) {
                    $("#ges_subestado").html("");
                    $("#ges_subestado").append($("<option>").attr("value", "").html("Seleccione"));
                    $('#datos-gestion').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                    $.each(datos, function (i, e) {
                        $("#ges_subestado").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                    });
                });


                if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                    $("#fpg").hide();
                }
                else {
                    $("#fpg").show();
                }

            }
            else {
                $("#ges_subestado").html("");
                $("#ges_subestado").attr("disabled", true);
            }
        });

        //Evento de Estado maestro Pre Aprobados Derivados
        $("#ges_estadoDR").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestadoDR").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                    $("#ges_subestadoDR").html("");
                    $("#ges_subestadoDR").append($("<option>").attr("value", "").html("Seleccione"));
                    $('#datos-gestionDR').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                    $.each(datos, function (i, e) {
                        $("#ges_subestadoDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                    });
                });


                if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                    $("#fpg").hide();
                }
                else {
                    $("#fpg").show();
                }

            }
            else {
                $("#ges_subestadoDR").html("");
                $("#ges_subestadoDR").attr("disabled", true);
            }
        });

        //Evento de estado maestro tmc
        $("#ges_estadoSC").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestadoSC").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: $(this).val() }, function (datos) {
                    $("#ges_subestadoSC").html("");
                    $("#ges_subestadoSC").append($("<option>").attr("value", "").html("Seleccione"));
                    $('#datos-ges_subestadoSC').bootstrapValidator('updateStatus', 'ges_subestadoSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestadoSC');
                    $.each(datos, function (i, e) {
                        if (e.ejes_terminal != "SISTEMA") {
                            $("#ges_subestadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                        }

                    });
                });


                if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                    $("#fpgSC").hide();
                }
                else {
                    $("#fpgSC").show();
                }

            }
            else {
                $("#ges_subestadoTMC").html("");
                $("#ges_subestadoTMC").attr("disabled", true);
            }
        });

        //COMERCIAL
        if (tipoCamp === 1 || tipoCamp === 5) {
            $('#datos-gestion').show();

            //Datepicker de Pre Aprobados
            $('#demo-dp-component .input-group.date').datepicker(
                { autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
            ).on('changeDate', function (e) {
                e.stopPropagation();
                $('#datos-gestion').bootstrapValidator('updateStatus', 'ges_prox_gestion', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_prox_gestion');
            }).on('show.bs.modal hide.bs.modal', function (event) {
                // prevent datepicker from firing bootstrap modal "show.bs.modal"
                event.stopPropagation();
            });


            //Carga de selects
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 0 }, function (datos) {
                $("#ges_estado").data("TipoAsignacion", tipoCamp);
                $("#ges_estado").html("");
                $("#ges_estado").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_estado").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });


            // Validacion de formulario de Pre Aprobados
            // =================================================================
            $('#datos-gestion').bootstrapValidator({
                excluded: [':disabled', ':not(:visible)'],
                feedbackIcons: faIcon,
                fields: {
                    ges_estado: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un estado'
                            }
                        }
                    },
                    ges_subestado: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un sub estado'
                            }
                        }
                    },
                    ges_prox_gestion: {
                        validators: {
                            notEmpty: {
                                message: 'La fecha de próxima gestión no puede ser vacía'
                            },
                            date: {
                                format: 'DD-MM-YYYY',
                                message: 'Formato de fecha incorrecto'
                            }
                        }
                    },
                    ges_comentarios: {
                        validators: {
                            notEmpty: {
                                message: 'Debe agregar algún comentario'
                            },
                            stringLength: {
                                message: 'No pueden ser mas de 150 caracteres',
                                max: function (value, validator, $field) {
                                    return 150 - (value.match(/\r/g) || []).length;
                                }
                            }
                        }
                    },



                }
            }).on('success.form.bv', function (e) {
                // Prevén que se mande el formulario
                e.preventDefault();
                var $form = $(e.target);
                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion", $form.serialize(), function (respuesta) {

                    if (respuesta.Estado === 'OK') {

                        $.niftyNoty({
                            type: 'success',
                            container: '#mensahes-must',
                            html: '<strong>OK</strong> Gestion guardada exitosamente.',
                            focus: false,
                            timer: 3000
                        });


                        render.HistorialGestion(respuesta.Objeto);

                        if (respuesta.Objeto != null && respuesta.Objeto.length > 0 && respuesta.Objeto[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                            $(".esconder").hide();
                        }

                        $("#datos-gestion").bootstrapValidator('resetForm', true);


                    } else {
                        $.niftyNoty({
                            type: 'danger',
                            container: '#mensahes-must',
                            html: '<strong>Error</strong> ' + respuesta.Mensaje,
                            focus: false,
                            timer: 3000
                        });
                    }

                });
            });

        }

        //RECUPERACIONES
        if (tipoCamp === 2) {
            
            $('#datos-gestion_normalizacion').show();

            $('#demo-dp-component_normalizacion .input-group.date').datepicker({ autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }).on('show.bs.modal hide.bs.modal', function (event) {
                // prevent datepicker from firing bootstrap modal "show.bs.modal"
                event.stopPropagation();
            });

            //Carga de selects
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 0 }, function (datos) {
                $("#ges_causa_basal_normalizacion").data("TipoAsignacion", tipoCamp);
                $("#ges_causa_basal_normalizacion").html("");
                $("#ges_causa_basal_normalizacion").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_causa_basal_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });

            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 10 }, function (datos) {
                $("#ges_consecuencia_normalizacion").data("TipoAsignacion", tipoCamp);
                $("#ges_consecuencia_normalizacion").html("");
                $("#ges_consecuencia_normalizacion").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_consecuencia_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });

            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 20 }, function (datos) {
                $("#ges_estado_normalizacion").data("TipoAsignacion", tipoCamp);
                $("#ges_estado_normalizacion").html("");
                $("#ges_estado_normalizacion").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_estado_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });

            $('#datos-gestion_normalizacion').bootstrapValidator({
                excluded: [':disabled', ':not(:visible)'],
                feedbackIcons: faIcon,
                fields: {
                    ges_causa_basal_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar una causa'
                            }
                        }
                    },
                    ges_consecuencia_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar una consecuencia'
                            }
                        }
                    },
                    ges_estado_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un estado'
                            }
                        }
                    },
                    /*ges_prox_gestion_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'La fecha de próxima gestión no puede ser vacía'
                            },
                            date: {
                                format: 'DD-MM-YYYY',
                                message: 'Formato de fecha incorrecto'
                            }
                        }
                    },*/
                    ges_comentarios_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe agregar algún comentario'
                            },
                            stringLength: {
                                message: 'No pueden ser mas de 150 caracteres',
                                max: function (value, validator, $field) {
                                    return 150 - (value.match(/\r/g) || []).length;
                                }
                            }
                        }
                    },



                }
            }).on('success.form.bv', function (e) {
                // Prevén que se mande el formulario
                e.preventDefault();
                var $form = $(e.target);

                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion-normalizacion", $form.serialize(), function (respuesta) {

                    if (respuesta.Estado === 'OK') {
                        render.HistorialGestionRecuperaciones(respuesta.Objeto);

                        if (respuesta.Objeto.length > 0 && respuesta.Objeto[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                            $(".esconder").hide();
                        }

                        $("#datos-gestion_normalizacion").bootstrapValidator('resetForm', true);


                        $.niftyNoty({
                            type: 'success',
                            container: 'floating',
                            html: '<strong>OK</strong> Gestion guardada exitosamente.',
                            focus: false,
                            timer: 3000
                        });
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            container: 'floating',
                            html: '<strong>Error</strong> ' + respuesta.Mensaje,
                            focus: false,
                            timer: 3000
                        });
                    }
                });
            });


        }

        //SEGURO CESANTIA
        if (tipoCamp === 4) {
            $('#datos-gestion-sc').show();


            $('#demo-dp-componentSC .input-group.date').datepicker({
                autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true
            }).on('changeDate', function (e) {
                $('#datos-gestion-sc').bootstrapValidator('updateStatus', 'ges_prox_gestionSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_prox_gestionSC');
            }).on('show.bs.modal hide.bs.modal', function (event) {
                // prevent datepicker from firing bootstrap modal "show.bs.modal"
                event.stopPropagation();
            });

            //Carga de selects
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 0 }, function (datos) {
                $("#ges_estadoSC").data("TipoAsignacion", tipoCamp);
                $("#ges_estadoSC").html("");
                $("#ges_estadoSC").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_estadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });


            $('#datos-gestion-sc').bootstrapValidator({
                excluded: [':disabled', ':not(:visible)'],
                feedbackIcons: faIcon,
                fields: {
                    ges_estadoSC: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un estado'
                            }
                        }
                    },
                    ges_subestadoSC: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un sub estado'
                            }
                        }
                    },
                    ges_prox_gestionSC: {
                        validators: {
                            notEmpty: {
                                message: 'La fecha de próxima gestión no puede ser vacía'
                            },
                            date: {
                                format: 'DD-MM-YYYY',
                                message: 'Formato de fecha incorrecto'
                            }
                        }
                    },
                    ges_comentariosSC: {
                        validators: {
                            notEmpty: {
                                message: 'Debe agregar algún comentario'
                            },
                            stringLength: {
                                message: 'No pueden ser mas de 150 caracteres',
                                max: function (value, validator, $field) {
                                    return 150 - (value.match(/\r/g) || []).length;
                                }
                            }
                        }
                    },



                }
            }).on('success.form.bv', function (e) {
                // Prevén que se mande el formulario
                e.preventDefault();
                var $form = $(e.target);
                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion-normalizacionSC", $form.serialize(), function (respuesta) {

                    if (respuesta.Estado === 'OK') {
                        render.HistorialGestion(respuesta.Objeto);

                        $("#datos-gestion-sc").bootstrapValidator('resetForm', true);
                        //$("#mensaje_guardar").fadeIn();

                        $.niftyNoty({
                            type: 'success',
                            container: 'floating',
                            html: '<strong>OK</strong> Gestion guardada exitosamente.',
                            focus: false,
                            timer: 3000
                        });
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            container: 'floating',
                            html: '<strong>Error</strong> ' + respuesta.Mensaje,
                            focus: false,
                            timer: 3000
                        });
                    }

                });
            });

        }


    });


    $('#mdl_data').on('hide.bs.modal', function (e) {

        $('#tab_contacti').tab('show');
        const pestana = sessionStorage.getItem('GST_PESTANA_ACTIVA');
        switch (pestana) {
            case '1':
                $("#datos-gestion").bootstrapValidator('resetForm', true);
                $('#datos-gestion').hide();
                break;
            case '2':
                $("#datos-gestion_normalizacion").bootstrapValidator('resetForm', true);
                $('#datos-gestion_normalizacion').hide();
                break;
            case '4':
                $("#datos-gestion-sc").bootstrapValidator('resetForm', true);
                $('#datos-gestion-sc').hide();
                break;
            case '5':
                $("#datos-gestion").bootstrapValidator('resetForm', true);
                $('#datos-gestion').hide();
                break;
        }
    });


    $("#afi_oficina_preferencia").on("change", function () {

        if ($(this).val() != "") {
            var WebPreferencia = {
                afiliado_Rut: $("#afi_rut").val().replace(/\./g, ''),
                tipo_preferencia: "OFICINA",
                valor_preferencia: $(this).val(),
                valido: true
            }
            WebPreferencia.afiliado_Rut = WebPreferencia.afiliado_Rut.substring(0, WebPreferencia.afiliado_Rut.length - 2);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-preferencia-afiliado", WebPreferencia, function (respuesta) {
                if (respuesta.Estado === "OK") {
                    //Variables.Afiliado_Current.data("afiliado").OficinaPreferencia = respuesta.Objeto;
                    //console.log(Variables.Afiliado_Current.data("afiliado"))
                }
            });
        }
    });
    $("#afi_horario_preferencia").on("change", function () {

        if ($(this).val() != "") {

            var WebPreferencia = {
                afiliado_Rut: $("#afi_rut").val().replace(/\./g, ''),
                tipo_preferencia: "HORARIO",
                valor_preferencia: $(this).val(),
                valido: true
            }

            WebPreferencia.afiliado_Rut = WebPreferencia.afiliado_Rut.substring(0, WebPreferencia.afiliado_Rut.length - 2);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-preferencia-afiliado", WebPreferencia, function (respuesta) {
                if (respuesta.Estado === "OK") {
                   ///Variables.Afiliado_Current.data("afiliado").HorarioPreferencia = respuesta.Objeto;
                   ///console.log(Variables.Afiliado_Current.data("afiliado"))
                }
            });
        }


    });

    const pestana = sessionStorage.getItem('GST_PESTANA_ACTIVA');
    if (pestana != null) {
        switch (pestana) {
            case '1':
                $('#tab_preaprobados').tab('show');
                $("#tab_preaprobados").trigger("shown.bs.tab");
                break;
            case '2':
                $('#tab_recuperaciones').tab('show');
                //$("#tab_recuperaciones").trigger("shown.bs.tab");
                break;
            case '3':
                $('#tab_normalizacionTMC').tab('show');
                //$("#tab_normalizacionTMC").trigger("shown.bs.tab");
                break;
            case '4':
                $('#tab_segcesantia').tab('show');
                //$("#tab_segcesantia").trigger("shown.bs.tab");
                break;
            case '5':
                $('#tab_derivaciones').tab('show');
                //$("#tab_derivaciones").trigger("shown.bs.tab");
                break;
        }
    } else {
        $("#tab_preaprobados").trigger("shown.bs.tab");
    }




});