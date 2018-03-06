using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Business.Entity;
using System.Data;
using CDK.Data;
using CDK.Integration;

namespace CRM.Business.Data
{
    public class CarteraEmpresaDataAccess
    {
        public static CarteraEmpresaEntity ObtenerDatoEmpresa(string RutEmpresa)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Rut", RutEmpresa)
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("carteras.spMotorCartera_ListaEmpresaRut", pram, ConsCarteraEmpresa);
        }

        public static List<EjecutivoCarteraEntity> ListarEjecutivoCargo(string TokenEjecutivo, int CodTipo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@TokenEjecutivo", TokenEjecutivo),
                new Parametro("@CodTipo",CodTipo)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.sp_MotorCartera_ListaEjecutivoCargo", pram,ConstEjecutivoCargo);
        }

        public static List<CarteraEmpresaEntity> ListaEmpresaEjecutivo(string TokenEjecutivo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@TokenEjecutivo", TokenEjecutivo)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_ListaEmpresaEjecutivo", pram,ConsEmpresaEjecutivo);
        }


        #region  Constructores

        private static CarteraEmpresaEntity ConsCarteraEmpresa(DataRow row)
        {

            return new CarteraEmpresaEntity
            {
                RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                NombreEmpresa= row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty
            };
        }

        private static EjecutivoCarteraEntity ConstEjecutivoCargo(DataRow row)
        {
            return new EjecutivoCarteraEntity
            {
                EjecutivoRut =row["Rut"] != DBNull.Value ? row["Rut"].ToString() : string.Empty,
                EjecutivoNombre= row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                EjecutivoCargo = row["Nombre_TipoCargo"] != DBNull.Value ? row["Nombre_TipoCargo"].ToString() : string.Empty,
                EjecutivoSucursal = row["Sucursal"] != DBNull.Value ? row["Sucursal"].ToString():string.Empty

            };
        }
        private static CarteraEmpresaEntity ConsEmpresaEjecutivo(DataRow row)
        {
            return new CarteraEmpresaEntity
            {
                IdEmpresaIngreso = row["IdEmpresaIngreso"] != DBNull.Value ? Convert.ToInt32(row["IdEmpresaIngreso"]) : 0,
                RutEmpresa = row["EmpresaRut"] != DBNull.Value ? row["EmpresaRut"].ToString() : string.Empty,
                NombreEmpresa = row["EmpresaNombre"] != DBNull.Value ? row["EmpresaNombre"].ToString() : string.Empty,
                TipoEjectEmpresa=row["EmpresaTipoEjecutivo"] != DBNull.Value ? row["EmpresaTipoEjecutivo"].ToString() : string.Empty,
                RutEjecutivo = row["EmpresaRutEjecutivo"] != DBNull.Value ? row["EmpresaRutEjecutivo"].ToString() : string.Empty,
                NombreEjecutivo = row["EmpresaNombreEjecutivo"] != DBNull.Value ? row["EmpresaNombreEjecutivo"].ToString() : string.Empty,

            };
        }
        #endregion

    }
}
