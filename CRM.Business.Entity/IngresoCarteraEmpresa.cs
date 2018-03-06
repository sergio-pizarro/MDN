using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class IngresoCarteraEmpresa
    {
        public int CodIngresoEmpresa { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public int TipoEjectEmpresa { get; set; }
        public string RutEjecutivo { get; set; }
        public string NombreEjecutivo { get; set; }
        public string PeriodoCarteraEmpresa { get; set; }
        public IngresoCarteraEmpresa()
        {
            CodIngresoEmpresa = 0;
            RutEmpresa = string.Empty;
            NombreEmpresa = string.Empty;
            TipoEjectEmpresa = 0;
            RutEjecutivo = string.Empty;
            NombreEjecutivo = string.Empty;
        }
    }
}
