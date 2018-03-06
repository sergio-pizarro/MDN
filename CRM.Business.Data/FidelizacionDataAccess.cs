using System;
using System.Collections.Generic;
using System.Data;
using CRM.Business.Entity;
using CDK.Data;
using CDK.Integration;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CRM.Business.Data
{
    /// <summary>
    /// Clase Acceso de Datos FidelizacionDataAccess
    /// </summary>
    /// <author>@Charly</author>
    /// <created>04-01-2018 15:39:10</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class FidelizacionDataAccess
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="Fidelizacion"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>04-01-2018 15:39:10</created>
        /// <param name="fidelizacion">Referencia a una clase <see cref="Fidelizacion"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static long Guardar(Fidelizacion fidelizacion)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodFide", fidelizacion.CodFide),
                new Parametro("@RutEmpresa", fidelizacion.RutEmpresa),
                new Parametro("@NombreEmpresa", fidelizacion.NombreEmpresa),
                new Parametro("@HoldingEmpresa", fidelizacion.HoldingEmpresa),
                new Parametro("@Area", fidelizacion.Area),
                new Parametro("@AmbitoAccion", fidelizacion.AmbitoAccion),
                new Parametro("@Estamento", fidelizacion.Estamento),
                new Parametro("@Actividad", fidelizacion.Actividad),
                new Parametro("@Cobertura", fidelizacion.Cobertura),
                new Parametro("@NombreRepresentanteEmpresa", fidelizacion.NombreRepresentanteEmpresa),
                new Parametro("@Cargo", fidelizacion.Cargo),
                new Parametro("@FechaIngreso", fidelizacion.FechaIngreso),
                new Parametro("@FechaCreacion", fidelizacion.FechaCreacion),
                new Parametro("@RutEjecutivo", fidelizacion.RutEjecutivo),
                new Parametro("@Oficina", fidelizacion.Oficina),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("sp_Fidelizacion_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="Fidelizacion"/> de la Base de Datos dado un ID de Fidelizacion
        /// </summary>
        /// <author>@Charly</author>
        /// <created>04-01-2018 15:39:10</created>
        /// <param name="CodFide">ID de Fidelizacion.</param>
        /// <returns>Referencia a una clase <see cref="Fidelizacion"/>.</returns>
        public static Fidelizacion ObtenerPorID(long CodFide)
        {
            Parametro parametro = new Parametro("@CodFide", CodFide);

            return DBHelper.InstanceCRM.ObtenerEntidad("sp_Fidelizacion_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="Fidelizacion"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>04-01-2018 15:39:10</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceCRM.ObtenerDataTable("sp_Fidelizacion_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="Fidelizacion"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>04-01-2018 15:39:10</created>
        /// <returns>Lista con todas las entidades <see cref="Fidelizacion"/>.</returns>
        public static List<Fidelizacion> ObtenerEntidades()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("sp_Fidelizacion_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static Fidelizacion ConstructorEntidad(DataRow row)
        {
            return new Fidelizacion
            {
                CodFide = row["CodFide"] != DBNull.Value ? Convert.ToInt64(row["CodFide"]) : 0,
                RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                HoldingEmpresa = row["HoldingEmpresa"] != DBNull.Value ? row["HoldingEmpresa"].ToString() : string.Empty,
                Area = row["Area"] != DBNull.Value ? row["Area"].ToString() : string.Empty,
                AmbitoAccion = row["AmbitoAccion"] != DBNull.Value ? row["AmbitoAccion"].ToString() : string.Empty,
                Estamento = row["Estamento"] != DBNull.Value ? row["Estamento"].ToString() : string.Empty,
                Actividad = row["Actividad"] != DBNull.Value ? row["Actividad"].ToString() : string.Empty,
                Cobertura = row["Cobertura"] != DBNull.Value ? row["Cobertura"].ToString() : string.Empty,
                NombreRepresentanteEmpresa = row["NombreRepresentanteEmpresa"] != DBNull.Value ? row["NombreRepresentanteEmpresa"].ToString() : string.Empty,
                Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FechaCreacion = row["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaCreacion"]) : new DateTime(1900, 1, 1),
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,

            };
        }
        #endregion
    }
}
