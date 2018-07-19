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

        public static List<Entity.Contactibilidad.IndiceContactabilidad> ListarIndice()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("scafi.sp_Motor_ListarIndiceContacto", IndContacto);
        }

        private static Entity.Contactibilidad.ContactabilidadEntity ConstructorEntidad(DataRow row)
        {
            return new Entity.Contactibilidad.ContactabilidadEntity
            {
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? Convert.ToInt32(row["RutAfiliado"]) : 0,
                iTipoDato = row["iTipoDato"] != DBNull.Value ? Convert.ToInt32(row["iTipoDato"]) : 0,
                TipoDato = row["TipoDato"] != DBNull.Value ? row["TipoDato"].ToString() : string.Empty,
                iClasifdato = row["iClasifDato"] != DBNull.Value ? Convert.ToInt32(row["iClasifDato"]) : 0,
                ClasifDato = row["ClasifDato"] != DBNull.Value ? row["ClasifDato"].ToString() : string.Empty,
                ValorDato = row["ValorDato"] != DBNull.Value ? row["ValorDato"].ToString() : string.Empty,
                FechaCreacion = row["FechaCreacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaCreacion"]) : new DateTime(1900, 1, 1),
                OrigenCreacion = row["OrigenCreacion"] != DBNull.Value ? row["OrigenCreacion"].ToString() : string.Empty,
                FechaIntento = row["FechaIntento"] != DBNull.Value ? Convert.ToDateTime(row["FechaIntento"]) : new DateTime(1900, 1, 1),
                ResultIntento = row["ResultIntento"] != DBNull.Value ? row["ResultIntento"].ToString() : string.Empty,
                OrigenIntento = row["OrigenIntento"] != DBNull.Value ? row["OrigenIntento"].ToString() : string.Empty,
                FechaContacto = row["FechaContacto"] != DBNull.Value ? Convert.ToDateTime(row["FechaContacto"]) : new DateTime(1900, 1, 1),
                OrigenContacto = row["OrigenContacto"] != DBNull.Value ? row["OrigenContacto"].ToString() : string.Empty,
                FechaBaja = row["FechaBaja"] != DBNull.Value ? Convert.ToDateTime(row["FechaBaja"]) : new DateTime(1900, 1, 1),
                OrigenBaja = row["OrigenBaja"] != DBNull.Value ? row["OrigenBaja"].ToString() : string.Empty,
                MotivoBaja = row["MotivoBaja"] != DBNull.Value ? row["MotivoBaja"].ToString() : string.Empty,
                RutEjecGestion = row["RutEjecGestion"] != DBNull.Value ? row["RutEjecGestion"].ToString() : string.Empty,
                Oficina =  row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                IndiceContactabilidad = row["IndiceContactab"] != DBNull.Value ? Convert.ToInt32(row["IndiceContactab"]) : 0,
                Ocultar = row["Ocultar"] != DBNull.Value ? Convert.ToInt32(row["Ocultar"]) : 0,
            };
        }
        private static Entity.Contactibilidad.IndiceContactabilidad IndContacto(DataRow row)
        {
            return new Entity.Contactibilidad.IndiceContactabilidad
            {
                IdEstado = row["IdEstado"] != DBNull.Value ? Convert.ToInt32(row["IdEstado"]) : 0,
                Descripcion = row["Descripcion"] != DBNull.Value ? row["Descripcion"].ToString() : string.Empty,
            };
        }
    }
}
