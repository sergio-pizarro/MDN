using System;
using System.Collections.Generic;
using System.Data;
using CRM.Business.Entity;
using CDK.Integration;
using CDK.Data;


namespace CRM.Business.Data.ContactabilidadDataAccess
{
    public class ContactabilidadDataAccess
    {
        public static List<Entity.Contactibilidad.ContactabilidadEntity> ListarContacto (int RutAfiliado)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@RutAfiliado", RutAfiliado)
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("scafi.spMotor_ContactibilidadListarRut", parametros, ConstructorEntidad);
        }
        private static Entity.Contactibilidad.ContactabilidadEntity ConstructorEntidad(DataRow row)
        {
            return new Entity.Contactibilidad.ContactabilidadEntity
            {
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? Convert.ToInt32(row["RutAfiliado"]) : 0,
                RutAfiliadoDv= row["RutAfiliadoDv"] != DBNull.Value ? row["RutAfiliadoDv"].ToString() : string.Empty,
                // Fecha_accion = row["Fecha_accion"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_accion"]) : new DateTime(1900, 1, 1),
                tipoContacto = row["TipoContacto"] != DBNull.Value ? row["TipoContacto"].ToString() : string.Empty,
                ClasificacionContacto = row["ClasificacionContacto"] != DBNull.Value ? row["ClasificacionContacto"].ToString() : string.Empty,
                Valor = row["Valor"] != DBNull.Value ? row["Valor"].ToString() : string.Empty,
                Origen = row["Origen"] != DBNull.Value ? row["Origen"].ToString() : string.Empty,
                FechaCreacion = row["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaCreacion"]) : new DateTime(1900, 1, 1),
                FechaIntento = row["FechaIntento"] != DBNull.Value ? Convert.ToDateTime(row["FechaIntento"]) : new DateTime(1900, 1, 1),
                FechaContacto = row["FechaContacto"] != DBNull.Value ? Convert.ToDateTime(row["FechaContacto"]) : new DateTime(1900, 1, 1),
                FechaBaja = row["FechaBaja"] != DBNull.Value ? Convert.ToDateTime(row["FechaBaja"]) : new DateTime(1900, 1, 1),
                OrigenBaja = row["OrigenBaja"] != DBNull.Value ? row["OrigenBaja"].ToString() : string.Empty,
                RutEjecutivoGestion = row["RutEjecutivoGestion"] != DBNull.Value ? row["RutEjecutivoGestion"].ToString() : string.Empty,
                Oficina =  row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
            };
        }

    }
}
