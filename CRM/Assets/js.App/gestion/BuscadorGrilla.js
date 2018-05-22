$(function () {


    /*$("#bdy_datos").html("");
    $.getJSON(BASE_URL + "/motor/api/busqueda-dotacion/listar-ejecutivos", function (ejecutivos) {

        

        $.each(ejecutivos, function (i, e) {

            
            $("#bdy_datos")
                .append(
                $("<tr>")
                    .append($("<td>").append('<a href="AccesoAdmin?RE=' + e.Rut+'" class="btn-link" >' + e.Rut + '</a>'))
                    .append($("<td>").html(e.Nombres))
                    .append($("<td>").html(e.IdSucursal))
                    .append($("<td>").html(e.Sucursal))
                    .append($("<td>").html( e.Cargo))
                    
                    
                );
        });

        if (typeof $('#demo-foo-filtering').data('footable') !== "undefined") {
            $('#demo-foo-filtering').data('footable').redraw();
        }


        
    var filtering = $('#demo-foo-filtering');

    filtering.footable({
        "columns": [
                    { "name": "Rut", "title": "Rut", "breakpoints": "xs sm" },
                    { "name": "Nombres", "title": "Nombres" },
                    { "name": "IdSucursal", "title": "Codigo Sucursal" },
                    { "name": "Sucursal", "title": "Nombre Sucursal" },
                    { "name": "Cargo", "title": "Cargo", "breakpoints": "xs sm" }
        ],
        "rows": $.get(BASE_URL + "/motor/api/busqueda-dotacion/listar-ejecutivos")
    }).on('footable_filtering', function (e) {
        
        e.clear = !e.filter;

    });





    // Search input
    $('#demo-foo-search').on('input', function (e) {
        e.preventDefault();
        if ($(this).val().length >= 5 || $(this).val().length == 0) {
            filtering.trigger('footable_filter', { filter: $(this).val() });
        }
    });
        


    });*/



    $("#tabla_dotacion").bootstrapTable({
        url: BASE_URL + "/motor/api/busqueda-dotacion/listar-ejecutivos",
        pagination: true,
        locale: 'es-ES',
        striped: true,
        pageSize: 50,
        pageList: [],
        search: true,
        showColumns: false,
        showRefresh: false,
        sortName: 'IdSucursal',
        columns: [
            {
                field: 'Rut',
                title: 'Rut',
                sortable: true,
                formatter: function (value, row, index) {
                    return '<a href="AccesoAdmin?RE=' + value + '" class="btn-link">' + value + '</a>';
                }
            },
            {
                field: 'Nombres',
                title: 'Nombres',
                sortable: true
            },
            {
                field: 'IdSucursal',
                title: 'Codigo Sucursal',
                sortable: true
            },
            {
                field: 'Sucursal',
                title: 'Nombre Sucursal',
                sortable: true
            },
            {
                field: 'Cargo',
                title: 'Cargo',
                sortable: true
            }
        ]
    });




});