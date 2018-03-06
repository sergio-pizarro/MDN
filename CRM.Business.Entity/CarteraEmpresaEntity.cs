using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class CarteraEmpresaEntity
    {
        public int IdEmpresaIngreso { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string TipoEjectEmpresa { get; set; }
        public string RutEjecutivo { get; set; }
        public string NombreEjecutivo { get; set; }
        public int codSucursal { get; set; }

     
    }
    public class EjecutivoCarteraEntity
    {
        public string EjecutivoRut { get; set; }
        public string EjecutivoNombre { get; set; }
        public string EjecutivoCargo { get; set; }
        public string EjecutivoSucursal { get; set; }
    }
    public class CarteraEmpresaNombreEntity
    {
        public int RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }

    }


}
