using CDK.Data;
using CDK.Integration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Business.Entity;
using System.Data;

namespace CRM.Business.Data
{
    public static class DocumentosFaltantesLMDataAccess
    {
        public static void GuardarEntrada(DocumentosFaltantesLM documentosFaltantesLM, string token)
        {
            Parametros prm = new Parametros()
            {
                new Parametro("@FolioLicencia",documentosFaltantesLM.FolioLicencia),
                new Parametro("@RutAfiliado",documentosFaltantesLM.RutAfiliado),
                new Parametro("@CodigoIngresoLM",documentosFaltantesLM.CodigoIngresoLM),
                new Parametro("@Liquidacion1",documentosFaltantesLM.Liquidacion1),
                new Parametro("@Liquidacion2",documentosFaltantesLM.Liquidacion2),
                new Parametro("@Liquidacion3",documentosFaltantesLM.Liquidacion3),
                new Parametro("@Liquidacion4",documentosFaltantesLM.Liquidacion4),
                new Parametro("@Liquidacion5",documentosFaltantesLM.Liquidacion5),
                new Parametro("@Liquidacion6",documentosFaltantesLM.Liquidacion6),
                new Parametro("@CertificadoRenta",documentosFaltantesLM.CertificadoRenta),
                new Parametro("@Otros",documentosFaltantesLM.Otros),
                new Parametro("@Comentarios",documentosFaltantesLM.Comentarios),
                new Parametro("@Acredita90",documentosFaltantesLM.Acredita90),
                new Parametro("@Acredita180",documentosFaltantesLM.Acredita180),
                new Parametro("@Token", token),
                new Parametro("@FaltaDocumentacion", documentosFaltantesLM.FaltaDocumentacion)
            };

            DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_DocumentosFaltantes_Guardar", prm);
        }

        public static DocumentosFaltantesLM ObtenerByCodIngresoLM(long codIngreso)
        {
            var param = new Parametro("@CodIngreso", codIngreso);
            return DBHelper.InstanceCRM.ObtenerEntidad("licencias.sp_Lic_DocumentosFaltantes_Obtener", param, ConstructorEntidad);
        }

        private static DocumentosFaltantesLM ConstructorEntidad(DataRow row)
        {
            return new DocumentosFaltantesLM
            {
                Acredita180 = row["Acredita180"] != DBNull.Value ? Convert.ToBoolean(row["Acredita180"]) : false,
                Acredita90 = row["Acredita90"] != DBNull.Value ? Convert.ToBoolean(row["Acredita90"]) : false,
                CertificadoRenta = row["CertificadoRenta"] != DBNull.Value ? Convert.ToBoolean(row["CertificadoRenta"]) : false,
                CodigoIngresoLM = row["CodigoIngresoLM"] != DBNull.Value ? Convert.ToInt64(row["CodigoIngresoLM"]) : 0,
                CodigoSucursalIngreso = row["CodigoSucursalIngreso"] != DBNull.Value ? Convert.ToInt32(row["CodigoSucursalIngreso"]) : 0,
                Comentarios = row["Comentarios"] != DBNull.Value ? Convert.ToString(row["Comentarios"]) : string.Empty,
                FaltaDocumentacion = row["Acredita90"] != DBNull.Value ? Convert.ToBoolean(row["Acredita90"]) : false,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900,1,1),
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? Convert.ToString(row["FolioLicencia"]) : string.Empty,
                Liquidacion1 = row["Liquidacion1"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion1"]) : false,
                Liquidacion2 = row["Liquidacion2"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion2"]) : false,
                Liquidacion3 = row["Liquidacion3"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion3"]) : false,
                Liquidacion4 = row["Liquidacion4"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion4"]) : false,
                Liquidacion5 = row["Liquidacion5"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion5"]) : false,
                Liquidacion6 = row["Liquidacion6"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion6"]) : false,
                Otros = row["Otros"] != DBNull.Value ? Convert.ToBoolean(row["Otros"]) : false,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? Convert.ToString(row["RutAfiliado"]) : string.Empty,
                RutEjecutivoIngreso = row["RutEjecutivoIngreso"] != DBNull.Value ? Convert.ToString(row["RutEjecutivoIngreso"]) : string.Empty,
            };
        }
    }
}
