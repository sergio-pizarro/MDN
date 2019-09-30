using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class DocumentosFaltantesLM
    {
        public string FolioLicencia { get; set; }
        public string RutAfiliado { get; set; }
        public long CodigoIngresoLM { get; set; }
        public int CodigoSucursalIngreso { get; set; }
        public string RutEjecutivoIngreso { get; set; }
        public DateTime FechaIngreso { get; set; }
        public bool Liquidacion1 { get; set; }
        public bool Liquidacion2 { get; set; }
        public bool Liquidacion3 { get; set; }
        public bool Liquidacion4 { get; set; }
        public bool Liquidacion5 { get; set; }
        public bool Liquidacion6 { get; set; }
        public bool CertificadoRenta { get; set; }
        public bool Acredita90 { get; set; }
        public bool Acredita180 { get; set; }
        public bool Otros { get; set; }
        public string Comentarios { get; set; }
        public bool FaltaDocumentacion { get; set; }

        public DocumentosFaltantesLM()
        {
            FolioLicencia = string.Empty;
            RutAfiliado = string.Empty;
            CodigoIngresoLM = 0;
            CodigoSucursalIngreso = 0;
            RutEjecutivoIngreso = string.Empty;
            FechaIngreso = new DateTime(1900, 1, 1);
            Liquidacion1 = false;
            Liquidacion2 = false;
            Liquidacion3 = false;
            Liquidacion4 = false;
            Liquidacion5 = false;
            Liquidacion6 = false;
            CertificadoRenta = false;
            Otros = false;
            Comentarios = string.Empty;
            Acredita90 = false;
            Acredita180 = false;
            FaltaDocumentacion = false;
        }

        public DocumentosFaltantesLM(string folioLicencia, string rutAfiliado, long codigoIngresoLM, bool liquidacion1, bool liquidacion2, bool liquidacion3, bool liquidacion4, bool liquidacion5, bool liquidacion6, bool certificadoRenta, bool acredita90, bool acredita180, bool otros, string comentarios, bool faltaDocumentacion)
        {
            FolioLicencia = folioLicencia;
            RutAfiliado = rutAfiliado;
            CodigoIngresoLM = codigoIngresoLM;
            Liquidacion1 = liquidacion1;
            Liquidacion2 = liquidacion2;
            Liquidacion3 = liquidacion3;
            Liquidacion4 = liquidacion4;
            Liquidacion5 = liquidacion5;
            Liquidacion6 = liquidacion6;
            CertificadoRenta = certificadoRenta;
            Acredita90 = acredita90;
            Acredita180 = acredita180;
            Otros = otros;
            Comentarios = comentarios;
            FaltaDocumentacion = faltaDocumentacion;
        }
    }
}
