using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity.Afiliados
{
    public class AfiliadosEntity
    {
        public int Periodo { get; set; }
        public string RutAfiliado { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Nacionalidad { get; set; }
        public string Sexo { get; set; }
        public string FechaNacimiento { get; set; }
        public int Edad { get; set; }
        public string EstadoCivil { get; set; }
        public string RolSegmentoAfiliado { get; set; }
        public string InicioValidezRol { get; set; }
        public string FinValidezRol { get; set; }
        public string RegimenPrevisional { get; set; }
        public string RegimenSalud { get; set; }
        public string CargoAfiliado { get; set; }
        public string TipoContrato { get; set; }
        public int PeriodoUltimaRenta { get; set; }
        public int RentaUltimaInformada { get; set; }
        public string RegionAfiliado { get; set; }
        public string ComunaAfiliado { get; set; }
        public string Cel { get; set; }
        public string Fono { get; set; }
        public string Mail { get; set; }

    }
    public class AfiliadoEmpresaEntity
    {
        public int RutEmpresa { get; set; }
        public string RutEmpresaDv { get; set; }
        public string NombreEmpresa { get; set; }

    }

    public class EmpresaAfiliadoEntity
    {
        public int RutEmpresa { get; set; }
        public string RutEmpresaDv { get; set; }
        public string NombreEmpresa { get; set; }
        public string PeriodoUltimaRenta { get; set; }
        public int RentaUltimaInformada { get; set; }
        public string RolSegmentoAfiliado { get; set; }

    }
    public class AfiliadoCampanas
    {
        public string Periodo { get; set; }
        public int RutAfiliado { get; set; }
        public string RutDvAfiliado { get; set; }
        public string Campania { get; set; }
        public int Oferta { get; set; }
        public string Prioridad { get; set; }
        public int id_Asginacion { get; set; }
        public string Tipo { get; set; }
        public int TipoAsignacion { get; set; }
        public string Estado { get; set; }
        public string SubEstado { get; set; }
        public DateTime FechaCompromete { get; set; } 
        public DateTime FechaAccion { get; set; }
        public string Nombres { get; set; }
        public string Descripcion { get; set; }
        public string EsTerminal { get; set; }
        
    }



}
