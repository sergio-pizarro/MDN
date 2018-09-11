using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class GestionEmpresasEntity
    {

        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string Segmento { get; set; }
        public int IdSucursalEmpresa { get; set; }
        public string SucursalEmpresa { get; set; }
        public int CodOficina { get; set; }
        public int NTrabajador { get; set; }
        public int Holding { get; set; }
        public string Comentarios { get; set; }
        public DateTime FechaIngreso { get; set; }
        public string EjecutivoIngreso { get; set; }
        public string NombreHolding { get; set; }
        public string FechaAntiguedad { get; set; }
        public string Anexo { get; set; }
        public int NumTrabajadores { get; set; }

    }
    public class CarteraEmpresasEntity
    {
        public int Id { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string Segmento { get; set; }
        public int IdSucursalEmpresa { get; set; }
        public string SucursalEmpresa { get; set; }
        public int CodOficina { get; set; }
        public int NTrabajador { get; set; }
        public int Holding { get; set; }
        public string Comentarios { get; set; }
        public DateTime FechaIngreso { get; set; }
        public string EjecutivoIngreso { get; set; }
        public string NombreHolding { get; set; }
        public string Tipo { get; set; }
        public int IdEmpresa { get; set; }
    }

    public class AsigandosEjecutivoEmpresaEntity
    {
        public int Id_Asign { get; set; }
        public int Afiliado_Rut { get; set; }
        public string Afiliado_Dv { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public int Monto_preaprobado { get; set; }
        public int Contacto { get; set; }
        public int PreAprobadoFinal { get; set; }
        public int CredVigente { get; set; }
        public int TipoAsignacion { get; set; }
        public string TipoCampania { get; set; }
        public int Prioridad { get; set; }
    }

    public class ComunasEmpresaEntity
    {
        public string NombreComuna { get; set; }
        public int IdComuna { get; set; }
    }

    public class EjecutivosAsignadosEntity
    {
        public string RutEjecutivoAsignado { get; set; }
    }

    public class ContadorAsignadosEntity
    {
        public int TotalAsignados { get; set; }
    }
    public class ContadorAnexoEntity
    {
        public int TotalAnexos { get; set; }
    }

    public class AnexoEmpresaEntity
    {
        public int IdEmpresaAnexo { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string Anexo { get; set; }
        public int NumTrabajadores { get; set; }
        public int IdComuna { get; set; }
        public string NombreComuna { get; set; }
        public string Direccion { get; set; }
    }

    public class AsignacionAnexoEmpresa
    {
        //public IEnumerable<string> Tipo { get; set; }
        //public IEnumerable<int> id { get; set; }
        //public IEnumerable<string>  EjecAsignado { get; set; }

        public string Tipo { get; set; }
        public int id { get; set; }
        public string EjecAsignado { get; set; }

        //public AsignacionAnexoEmpresa()
        //{
        //    Tipo = new List<string>();
        //   // id = new List<int>();
        //    EjecAsignado = new List<string>();

        //}
    }


}
