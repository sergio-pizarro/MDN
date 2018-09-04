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
    public static class PerfilEmpresasDataAccess
    {
        public static List<CarteraEmpresasEntity> ObtieneCarteraEmp(string token)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Token", token),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_ListaCarteraEjecutivo", pram, ListaCarteraEmpresa);
        }


        public static List<CarteraEmpresasEntity> ObtieneCarteraAgen(string token)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Token", token),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_ListaCarteraAgente", pram, ListaCarteraEmpresa);
        }

        public static Entity.GestionEmpresasEntity ObtienePerfilEmp(string RutEmpresa)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@RUT_EMPRESA", RutEmpresa),
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("carteras.spMotorCartera_ListaPerfilEjecutivo", pram, ObDatosEmpresa);
        }


        public static Entity.GestionEmpresasEntity ObtienePerfilEmpAnexo(int IdEmpresaA)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ID_EMPRESA", IdEmpresaA),
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("carteras.spMotorCartera_ListaPerfilEjecutivoAnexo", pram, ObDatosEmpresa);
        }


        public static List<AsigandosEjecutivoEmpresaEntity> ObtieneAsignacionEjeEmp(string token, string rutEmpresa)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Token", token),
                new Parametro("@RUT_EMPRESA", rutEmpresa),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_ListaPreAprobadoEmpresa", pram, AsigEjeEmpresa);
        }


        public static long GuardaGestion(int CodIngreso, string Token)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@Token", Token),
                new Parametro("@CodIngreso", CodIngreso)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Eliminar", parametros);
        }

        public static List<ComunasEmpresaEntity> ObtieneComunaEmp()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_ListaComunas", ListaComunaEmpresa);
        }

        public static List<EjecutivosAsignadosEntity> ObtieneEjeAsignados(int IdEmpresa)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@ID_EMPRESA", IdEmpresa),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("carteras.spMotorCartera_Lista_EjecutivoAsigEmpresa", parametros, ListaEjecutivosAsigEmp);
        }


        public static int InsertaNuevoAnexo(string Token, string RutEmpresa, string NombreEmpresa, string Anexo, int NumTrabajadores, int IdComuna, string NombreComuna, string Direccion)
        {
            Parametros parametros = new Parametros
            {
                 new Parametro("@Token", Token),
                 new Parametro("@RutEmpresa", RutEmpresa),
                 new Parametro("@NombreEmpresa", NombreEmpresa),
                 new Parametro("@Anexo", Anexo),
                 new Parametro("@NumTrabajadores", NumTrabajadores),
                 new Parametro("@IdComuna", IdComuna),
                 new Parametro("@NombreComuna", NombreComuna),
                 new Parametro("@Direccion", Direccion),
            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("carteras.sp_MotorCartera_GuardaAnexo", parametros);
        }
        public static long GuardarAsignacionEmpAnexo(string tipo, string rut, long id)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@Tipo", tipo ),
                new Parametro("@id", id ),
                new Parametro("@RutEjecutivo", rut),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("carteras.spMotorCartera_IngresoAsignacionEmpAnexo", parametros);
        }

        private static CarteraEmpresasEntity ListaCarteraEmpresa(DataRow row)
        {
            return new CarteraEmpresasEntity
            {
                Id = row["ID"] != DBNull.Value ? Convert.ToInt32(row["ID"]) : 0,
                RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                Segmento = row["TipoEmpresa"] != DBNull.Value ? row["TipoEmpresa"].ToString() : string.Empty,
                IdSucursalEmpresa = row["IdSucursalEmpresa"] != DBNull.Value ? Convert.ToInt32(row["IdSucursalEmpresa"]) : 0,
                // SucursalEmpresa = row["SucursalEmpresa"] != DBNull.Value ? row["SucursalEmpresa"].ToString() : string.Empty,
                CodOficina = row["CodOficina"] != DBNull.Value ? Convert.ToInt32(row["CodOficina"]) : 0,
                NTrabajador = row["NTrabajador"] != DBNull.Value ? Convert.ToInt32(row["NTrabajador"]) : 0,
                Holding = row["Holding"] != DBNull.Value ? Convert.ToInt32(row["Holding"]) : 0,
                //Comentarios = row["Comentarios"] != DBNull.Value ? row["Comentarios"].ToString() : string.Empty,
                //FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : DateTime.MinValue,
                NombreHolding = row["NombreHolding"] != DBNull.Value ? row["NombreHolding"].ToString() : string.Empty,
                Tipo = row["Tipo"] != DBNull.Value ? row["Tipo"].ToString() : string.Empty,
                IdEmpresa = row["IdEmpresa"] != DBNull.Value ? Convert.ToInt32(row["IdEmpresa"]) : 0,
            };
        }


        private static GestionEmpresasEntity ObDatosEmpresa(DataRow row)
        {
            return new GestionEmpresasEntity
            {
                RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                Segmento = row["TipoEmpresa"] != DBNull.Value ? row["TipoEmpresa"].ToString() : string.Empty,
                IdSucursalEmpresa = row["IdSucursalEmpresa"] != DBNull.Value ? Convert.ToInt32(row["IdSucursalEmpresa"]) : 0,
                SucursalEmpresa = row["SucursalEmpresa"] != DBNull.Value ? row["SucursalEmpresa"].ToString() : string.Empty,
                CodOficina = row["CodOficina"] != DBNull.Value ? Convert.ToInt32(row["CodOficina"]) : 0,
                NTrabajador = row["NTrabajador"] != DBNull.Value ? Convert.ToInt32(row["NTrabajador"]) : 0,
                Holding = row["Holding"] != DBNull.Value ? Convert.ToInt32(row["Holding"]) : 0,
                Comentarios = row["Comentarios"] != DBNull.Value ? row["Comentarios"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : DateTime.MinValue,
                NombreHolding = row["NombreHolding"] != DBNull.Value ? row["NombreHolding"].ToString() : string.Empty,
                FechaAntiguedad = row["FechaAntiguedad"] != DBNull.Value ? row["FechaAntiguedad"].ToString() : string.Empty,
                Anexo = row["Anexo"] != DBNull.Value ? row["Anexo"].ToString() : string.Empty,
                NumTrabajadores = row["NumTrabajadores"] != DBNull.Value ? Convert.ToInt32(row["NumTrabajadores"]) : 0,
            };
        }

        private static AsigandosEjecutivoEmpresaEntity AsigEjeEmpresa(DataRow row)
        {
            return new AsigandosEjecutivoEmpresaEntity
            {
                Id_Asign = row["id_Asign"] != DBNull.Value ? Convert.ToInt32(row["id_Asign"]) : 0,
                Afiliado_Rut = row["Afiliado_Rut"] != DBNull.Value ? Convert.ToInt32(row["Afiliado_Rut"]) : 0,
                Afiliado_Dv = row["Afiliado_Dv"] != DBNull.Value ? row["Afiliado_Dv"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Apellido = row["Apellido"] != DBNull.Value ? row["Apellido"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                Monto_preaprobado = row["Monto_preaprobado"] != DBNull.Value ? Convert.ToInt32(row["Monto_preaprobado"]) : 0,
                Contacto = row["Contacto"] != DBNull.Value ? Convert.ToInt32(row["Contacto"]) : 0,
                PreAprobadoFinal = row["PreAprobadoFinal"] != DBNull.Value ? Convert.ToInt32(row["PreAprobadoFinal"]) : 0,
                CredVigente = row["CredVigente"] != DBNull.Value ? Convert.ToInt32(row["CredVigente"]) : 0,
                TipoAsignacion = row["TipoAsignacion"] != DBNull.Value ? Convert.ToInt32(row["TipoAsignacion"]) : 0,
                TipoCampania = row["TipoCampania"] != DBNull.Value ? row["TipoCampania"].ToString() : string.Empty,
                Prioridad = row["Prioridad"] != DBNull.Value ? Convert.ToInt32(row["Prioridad"]) : 0,
            };
        }

        private static ComunasEmpresaEntity ListaComunaEmpresa(DataRow row)
        {
            return new ComunasEmpresaEntity
            {
                IdComuna = row["COMUNA_CODIGO"] != DBNull.Value ? Convert.ToInt32(row["COMUNA_CODIGO"]) : 0,
                NombreComuna = row["COMUNA_NOMBRESIAGF"] != DBNull.Value ? row["COMUNA_NOMBRESIAGF"].ToString() : string.Empty,
            };
        }

        private static EjecutivosAsignadosEntity ListaEjecutivosAsigEmp(DataRow row)
        {
            return new EjecutivosAsignadosEntity
            {
                RutEjecutivoAsignado = row["RutEjectAsignado"] != DBNull.Value ? row["RutEjectAsignado"].ToString() : string.Empty,
            };
        }

    }
}
