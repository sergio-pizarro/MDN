﻿using System;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CRM.Business.Entity
{
    /// <summary>
    /// Clase Dominio AmbitosareaEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>02-04-2018 12:57:29</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class AmbitosareaEntity
    {

        /// <summary>
        /// ambito_id
        /// </summary>
        public int ambito_id { get; set; }

        /// <summary>
        /// ambito_nombre
        /// </summary>
        public string ambito_nombre { get; set; }

        /// <summary>
        /// area_id
        /// </summary>
        public int area_id { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="AmbitosareaEntity"/>.
        /// </summary>
        public AmbitosareaEntity()
        {
            ambito_id = 0;
            ambito_nombre = string.Empty;
            area_id = 0;

        }
    }
}
