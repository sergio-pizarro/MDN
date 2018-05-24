using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity.Contactibilidad
{
    public class ContactabilidadEntity
    {
        public int RutAfiliado { get; set; }
        public string RutAfiliadoDv { get; set; }
        public string tipoContacto { get; set; }
        public string ClasificacionContacto { get; set; }
        public string Valor { get; set; }
        public string Origen { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaIntento { get; set; }
        public DateTime FechaContacto { get; set; }
        public DateTime FechaBaja { get; set; }
        public string OrigenBaja { get; set; }
        public string RutEjecutivoGestion { get; set; }
        public int Oficina { get; set; }

        public ContactabilidadEntity()
        {
            RutAfiliado = 0;
            RutAfiliadoDv = string.Empty;
            tipoContacto = string.Empty;
            ClasificacionContacto = string.Empty;
            Valor = string.Empty;
            Origen = string.Empty;
            FechaCreacion = new DateTime(1900, 1, 1);
            FechaIntento = new DateTime(1900, 1, 1);
            FechaContacto = new DateTime(1900, 1, 1);
            FechaBaja = new DateTime(1900, 1, 1);
            OrigenBaja = string.Empty;
            RutEjecutivoGestion = string.Empty;
            Oficina = 0;
        }






    }
}
