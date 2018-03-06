using System;
using System.Collections.Generic;
using System.Data;
using CRM.Business.Entity;
using CDK.Data;
using CDK.Integration;

namespace CRM.Business.Data
{
    public class EmpresaDataAccess
    {
        public static List<EmpresaEntity> ListarEmpresaGrilla(string TokenEjecutivo, string Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@TokenEjecutivo", TokenEjecutivo),
                new Parametro("@Periodo", Periodo),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_ListaEmpresas", pram, GrillaEmpresa);
        }
        private static EmpresaEntity GrillaEmpresa(DataRow row)
        {
            return new EmpresaEntity
            {

                //Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                Empresa_Clasificacion = row["Empresa_Clasificacion"] != DBNull.Value ? row["Empresa_Clasificacion"].ToString() : string.Empty,
                EjecRut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"]) : 0,
                EjecDV = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                EmpresaSucursal = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                EmpresaHolding = row["Holding"] != DBNull.Value ? row["Holding"].ToString() : string.Empty,
                EmpresaEstadoFicha = row["Estado"] != DBNull.Value ? row["Estado"].ToString() : string.Empty,
                CantidadFichas = row["CantidadFichas"] != DBNull.Value ? Convert.ToInt32(row["CantidadFichas"]) : 0,
                isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
            };
        }
        public static List<EmpresaEntity> ListarEmpresaGrillaTodos(string Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_ListaEmpresas_Periodo", pram, GrillaEmpresaTodos);
        }
        private static EmpresaEntity GrillaEmpresaTodos(DataRow row)
        {
            return new EmpresaEntity
            {

                //Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
            };
        }

        public static int GuardarFichaEmpresa(FichaEmpresaEntity FichaEmpresa, string token)
        {
            Parametros parametros = new Parametros
            {
                 new Parametro("@Empresa_Rut", FichaEmpresa.EmpresaRut),
                 new Parametro("@Empresa_Nombre", FichaEmpresa.EmpresaNombre),
                 new Parametro("@Cod_Sucursal", FichaEmpresa.CodOficina), // token
                 new Parametro("@Estamento", FichaEmpresa.Estamento),
                 new Parametro("@Nombre_Funcionario_Emple", FichaEmpresa.FuncionarioEmple),
                 new Parametro("@Cargo_Funcionario", FichaEmpresa.FuncionarioCargo),
                 new Parametro("@Num_Empleados", FichaEmpresa.NumeroEmpleados),
                 new Parametro("@funcionario_caja", FichaEmpresa.FuncionarioCaja),
                 new Parametro("@pregunta_1", FichaEmpresa.pregunta_1),
                 new Parametro("@pregunta_1_obs", FichaEmpresa.pregunta_obs),
                 new Parametro("@pregunta_2_radio", FichaEmpresa.pregunta2_radio),
                 new Parametro("@pregunta_2_combo", FichaEmpresa.pregunta2_combo),
                 new Parametro("@pregunta_2_obs2", FichaEmpresa.pregunta2_obs2),
                 new Parametro("@pregunta_2_radio_1", FichaEmpresa.pregunta2_radio_1),
                 new Parametro("@pregunta_2_obs3", FichaEmpresa.pregunta2_obs3),
                 new Parametro("@pregunta_2_obs4", FichaEmpresa.pregunta2_obs4),
                 new Parametro("@pregunta_2_obs5", FichaEmpresa.pregunta2_obs5),
                 new Parametro("@pregunta_3_radio", FichaEmpresa.pregunta3_radio),
                 new Parametro("@pregunta_3_obs", FichaEmpresa.pregunta3_obs),
                 new Parametro("@pregunta_4_radio", FichaEmpresa.pregunta4_radio),
                 new Parametro("@pregunta_4_radio_2", FichaEmpresa.pregunta4_radio_2),
                 new Parametro("@pregunta_4_obs_1", FichaEmpresa.pregunta4_obs_1),
                 new Parametro("@pregunta_4_obs_2", FichaEmpresa.pregunta4_obs_2),
                 new Parametro("@pregunta_5_radio", FichaEmpresa.pregunta5_radio),
                 new Parametro("@pregunta_5_obs_1", FichaEmpresa.pregunta5_obs),
                 new Parametro("@pregunta_5_obs_2", FichaEmpresa.pregunta5_obs_1),
                 new Parametro("@pregunta_6_radio", FichaEmpresa.pregunta6_radio),
                 new Parametro("@pregunta_6_obs_1", FichaEmpresa.pregunta6_obs_1),
                 new Parametro("@pregunta_6_obs_2", FichaEmpresa.pregunta6_obs_2),
                 new Parametro("@pregunta_7_radio", FichaEmpresa.pregunta7_radio),
                 new Parametro("@pregunta_7_obs_1", FichaEmpresa.pregunta7_obs_1),
                 new Parametro("@pregunta_8", FichaEmpresa.pregunta8_combo),
                 new Parametro("@pregunta_8_obs_1", FichaEmpresa.pregunta8_obs_1),
                 new Parametro("@pregunta_9_radio", FichaEmpresa.pregunta9_radio),
                 new Parametro("@pregunta_9_radio_2", FichaEmpresa.pregunta9_radio_1),
                 new Parametro("@pregunta_9_obs", FichaEmpresa.pregunta9_obs_1),
                 new Parametro("@pregunta_10_radio", FichaEmpresa.pregunta10_radio),
                 new Parametro("@pregunta_10_radio_2", FichaEmpresa.pregunta10_radio_1),
                 new Parametro("@pregunta_10_obs", FichaEmpresa.pregunta10_obs),
                 new Parametro("@pregunta_11", FichaEmpresa.pregunta11_combo),
                 new Parametro("@pregunta_11_obs", FichaEmpresa.pregunta11_obs_1),
                 new Parametro("@token", token),
                 new Parametro("@Estado", FichaEmpresa.Estado),
                 new Parametro("@id", FichaEmpresa.Id),
                 new Parametro("@nContacto", FichaEmpresa.Num_Contacto),
                 new Parametro("@Email", FichaEmpresa.Email),
                 new Parametro("@NombreSucursal", FichaEmpresa.NombreSucursal),
                 new Parametro("@DireccionSucursal", FichaEmpresa.DireccionSucursal),
                 new Parametro("@Anexo", FichaEmpresa.Anexo),

               };
            return DBHelper.InstanceCRM.ObtenerEscalar<int>("spMotor_FichaEmpresa_Guardar", parametros);
        }
        public static int GuardarAsignacionEmpresaOficina(EmpresaAsignacion AsignacionEmpresa)
        {
            Parametros parametros = new Parametros
            {
                 new Parametro("@RutEmpresa", AsignacionEmpresa.EmpresaRut),
                 new Parametro("@Cod_Sucursal", AsignacionEmpresa.CodOficina),
                 new Parametro("@ReasigObservacion", AsignacionEmpresa.Observacion),
                 new Parametro("@Cod_Sucursal_anterior", AsignacionEmpresa.CodOficinaAnterior),
               };
            return DBHelper.InstanceCRM.ObtenerEscalar<int>("spMotor_AsignacionEmpresa_Guardar", parametros);
        }
        public static EmpresaEntity ObtenerFichaEmpresa(string Periodo, int RutEmpresa)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@RutEmpresa", RutEmpresa)
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("spMotor_ObtenerListaEmpresas", pram, ConsEmpresa);
        }
        private static EmpresaEntity ConsEmpresa(DataRow row)
        {
            try
            {
                return new EmpresaEntity
                {
                    //Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                    PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                    EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                    EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                    EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                    EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                    Empresa_Clasificacion = row["Empresa_Clasificacion"] != DBNull.Value ? row["Empresa_Clasificacion"].ToString() : string.Empty,
                    EjecRut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"]) : 0,
                    EjecDV = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                    codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    EmpresaSucursal = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                    CodOficina = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    Estamento = row["Estamento"] != DBNull.Value ? row["Estamento"].ToString() : string.Empty,
                    FuncionarioEmple = row["Nombre_Funcionario_Emple"] != DBNull.Value ? row["Nombre_Funcionario_Emple"].ToString() : string.Empty,
                    FuncionarioCargo = row["Cargo_Funcionario"] != DBNull.Value ? row["Cargo_Funcionario"].ToString() : string.Empty,
                    NumeroEmpleados = row["Num_Empleados"] != DBNull.Value ? Convert.ToInt32(row["Num_Empleados"]) : 0,
                    FuncionarioCaja = row["funcionario_caja"] != DBNull.Value ? row["funcionario_caja"].ToString() : string.Empty,
                    pregunta_1 = row["pregunta_1"] != DBNull.Value ? row["pregunta_1"].ToString() : string.Empty,
                    pregunta_obs = row["pregunta_1_obs"] != DBNull.Value ? row["pregunta_1_obs"].ToString() : string.Empty,
                    pregunta2_radio = row["pregunta_2_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_2_radio"]) : 0,
                    pregunta2_combo = row["pregunta_2_combo"] != DBNull.Value ? row["pregunta_2_combo"].ToString() : string.Empty,
                    pregunta2_obs2 = row["pregunta_2_obs2"] != DBNull.Value ? row["pregunta_2_obs2"].ToString() : string.Empty,
                    pregunta2_radio_1 = row["pregunta_2_radio_1"] != DBNull.Value ? Convert.ToInt32(row["pregunta_2_radio_1"]) : 0,
                    pregunta2_obs3 = row["pregunta_2_obs3"] != DBNull.Value ? row["pregunta_2_obs3"].ToString() : string.Empty,
                    pregunta2_obs4 = row["pregunta_2_obs4"] != DBNull.Value ? row["pregunta_2_obs4"].ToString() : string.Empty,
                    pregunta2_obs5 = row["pregunta_2_obs5"] != DBNull.Value ? row["pregunta_2_obs5"].ToString() : string.Empty,
                    pregunta3_radio = row["pregunta_3_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_3_radio"]) : 0,
                    pregunta3_obs = row["pregunta_3_obs"] != DBNull.Value ? row["pregunta_3_obs"].ToString() : string.Empty,
                    pregunta4_radio = row["pregunta_4_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_4_radio"]) : 0,
                    pregunta4_radio_2 = row["pregunta_4_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_4_radio_2"]) : 0,
                    pregunta4_obs_1 = row["pregunta_4_obs_1"] != DBNull.Value ? row["pregunta_4_obs_1"].ToString() : string.Empty,
                    pregunta4_obs_2 = row["pregunta_4_obs_2"] != DBNull.Value ? row["pregunta_4_obs_2"].ToString() : string.Empty,
                    pregunta5_radio = row["pregunta_5_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_5_radio"]) : 0,
                    pregunta5_obs = row["pregunta_5_obs_1"] != DBNull.Value ? row["pregunta_5_obs_1"].ToString() : string.Empty,
                    pregunta5_obs_1 = row["pregunta_5_obs_2"] != DBNull.Value ? row["pregunta_5_obs_2"].ToString() : string.Empty,
                    pregunta6_radio = row["pregunta_6_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_6_radio"]) : 0,
                    pregunta6_obs_1 = row["pregunta_6_obs_1"] != DBNull.Value ? row["pregunta_6_obs_1"].ToString() : string.Empty,
                    pregunta6_obs_2 = row["pregunta_6_obs_2"] != DBNull.Value ? row["pregunta_6_obs_2"].ToString() : string.Empty,
                    pregunta7_radio = row["pregunta_7_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_7_radio"]) : 0,
                    pregunta7_obs_1 = row["pregunta_7_obs_1"] != DBNull.Value ? row["pregunta_7_obs_1"].ToString() : string.Empty,
                    pregunta8_combo = row["pregunta_8"] != DBNull.Value ? row["pregunta_8"].ToString() : string.Empty,
                    pregunta8_obs_1 = row["pregunta_8_obs_1"] != DBNull.Value ? row["pregunta_8_obs_1"].ToString() : string.Empty,
                    pregunta9_radio = row["pregunta_9_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_9_radio"]) : 0,
                    pregunta9_radio_1 = row["pregunta_9_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_9_radio_2"]) : 0,
                    pregunta9_obs_1 = row["pregunta_9_obs"] != DBNull.Value ? row["pregunta_9_obs"].ToString() : string.Empty,
                    pregunta10_radio = row["pregunta_10_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_10_radio"]) : 0,
                    pregunta10_radio_1 = row["pregunta_10_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_10_radio_2"]) : 0,
                    pregunta10_obs = row["pregunta_10_obs"] != DBNull.Value ? row["pregunta_10_obs"].ToString() : string.Empty,
                    pregunta11_combo = row["pregunta_11"] != DBNull.Value ? row["pregunta_11"].ToString() : string.Empty,
                    pregunta11_obs_1 = row["pregunta_11_obs"] != DBNull.Value ? row["pregunta_11_obs"].ToString() : string.Empty,
                    //FechaReunionVisita
                    EstamentoVisita = row["estamento_2"] != DBNull.Value ? row["estamento_2"].ToString() : string.Empty,
                    Funcionario_EmpleadoVisita = row["nombre_funcionario_emp_2"] != DBNull.Value ? row["nombre_funcionario_emp_2"].ToString() : string.Empty,
                    CargoFuncionarioVisita = row["cargo_funcionario_2"] != DBNull.Value ? row["cargo_funcionario_2"].ToString() : string.Empty,
                    Num_Contacto = row["Fono"] != DBNull.Value ? row["Fono"].ToString() : string.Empty,
                    Email = row["Mail"] != DBNull.Value ? row["Mail"].ToString() : string.Empty,
                    NombreSucursal = row["NombreSucursal"] != DBNull.Value ? row["NombreSucursal"].ToString() : string.Empty,
                    DireccionSucursal = row["Direccion"] != DBNull.Value ? row["Direccion"].ToString() : string.Empty,
                    Holding = row["Holding"] != DBNull.Value ? row["Holding"].ToString() : string.Empty,
                    isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
                };
            }
            catch (Exception ex)
            {
                return new EmpresaEntity
                {
                    //Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                    PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                    EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                    EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                    EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                    EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                    Empresa_Clasificacion = row["Empresa_Clasificacion"] != DBNull.Value ? row["Empresa_Clasificacion"].ToString() : string.Empty,
                    EjecRut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"]) : 0,
                    EjecDV = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                    codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    EmpresaSucursal = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                    CodOficina = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
                };
            }
        }

        public static List<DetalleEmpresaEntity> ObtenerDetalleGestionEmpresa(int RutEmpresa, string Periodo, string token)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@EmpresaRut", RutEmpresa),
                new Parametro("@Trimestre", Periodo),
                new Parametro("@TokenEjecutivo", token),


            };
            return DBHelper.InstanceCRM.ObtenerColeccion("SpMotor_ObtenerDetalleGestionEmpresa", pram, DetalleGestion);
        }
        public static List<DetalleEmpresaEntity> ObtenerDetalleGestionEmpresaAdmin(int RutEmpresa, string Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@EmpresaRut", RutEmpresa),
                new Parametro("@Trimestre", Periodo),


            };
            return DBHelper.InstanceCRM.ObtenerColeccion("SpMotor_ObtenerDetalleGestionEmpresaAdmin", pram, DetalleGestionAdmin);
        }

        private static DetalleEmpresaEntity DetalleGestion(DataRow row)
        {

            return new DetalleEmpresaEntity
            {
                idEmpresaDetalle = row["Id_Ficha"] != DBNull.Value ? Convert.ToInt32(row["Id_Ficha"]) : 0,
                RutEmpDetalle = row["Empresa_Rut"] != DBNull.Value ? row["Empresa_Rut"].ToString() : string.Empty,//row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                NombreEmpDetalle = row["Nombre_Funcionario_Emple"] != DBNull.Value ? row["Nombre_Funcionario_Emple"].ToString() : string.Empty,
                OficinaEmpDetalle = row["OFICINA"] != DBNull.Value ? row["OFICINA"].ToString() : string.Empty,
                EstamentoEmpDetalle = row["estamento"] != DBNull.Value ? row["estamento"].ToString() : string.Empty,
                EstadoEmpDetalle = row["EstadoGuardar"] != DBNull.Value ? row["EstadoGuardar"].ToString() : string.Empty,
                NombreEjecEmpDetalle = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                RutEjecEmpDetalle = row["RutEjec"] != DBNull.Value ? row["RutEjec"].ToString() : string.Empty,
                TrimentreEmpDetalle = row["Trimestre"] != DBNull.Value ? row["Trimestre"].ToString() : string.Empty,
                //Cantidad = row["Cantidad"] != DBNull.Value ? Convert.ToInt32(row["Cantidad"]) : 0,
                isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
                CargoEjecEmpresa = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
                FechaIngreso = row["Fecha_Ingreso"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Ingreso"]).ToString("dd/MM/yyyy hh:mm:ss") : string.Empty,
                FechaModificacion = row["fecha_reunion"] != DBNull.Value ? Convert.ToDateTime(row["fecha_reunion"]).ToString("dd/MM/yyyy hh:mm:ss") : string.Empty,
                NombreSucursal = row["NombreSucursal"] != DBNull.Value ? row["NombreSucursal"].ToString() : string.Empty,
                DireccionSucursal = row["Direccion"] != DBNull.Value ? row["Direccion"].ToString() : string.Empty,
                //codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
            };

        }
        private static DetalleEmpresaEntity DetalleGestionAdmin(DataRow row)
        {

            return new DetalleEmpresaEntity
            {
                idEmpresaDetalle = row["Id_Ficha"] != DBNull.Value ? Convert.ToInt32(row["Id_Ficha"]) : 0,
                RutEmpDetalle = row["Empresa_Rut"] != DBNull.Value ? row["Empresa_Rut"].ToString() : string.Empty,//row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                NombreEmpDetalle = row["Nombre_Funcionario_Emple"] != DBNull.Value ? row["Nombre_Funcionario_Emple"].ToString() : string.Empty,
                OficinaEmpDetalle = row["OFICINA"] != DBNull.Value ? row["OFICINA"].ToString() : string.Empty,
                EstamentoEmpDetalle = row["estamento"] != DBNull.Value ? row["estamento"].ToString() : string.Empty,
                EstadoEmpDetalle = row["EstadoGuardar"] != DBNull.Value ? row["EstadoGuardar"].ToString() : string.Empty,
                NombreEjecEmpDetalle = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                RutEjecEmpDetalle = row["RutEjec"] != DBNull.Value ? row["RutEjec"].ToString() : string.Empty,
                TrimentreEmpDetalle = row["Trimestre"] != DBNull.Value ? row["Trimestre"].ToString() : string.Empty,
                //Cantidad = row["Cantidad"] != DBNull.Value ? Convert.ToInt32(row["Cantidad"]) : 0,
                isHolding = row["isHolding"] != DBNull.Value ? Convert.ToInt32(row["isHolding"]) : 0,
                CargoEjecEmpresa = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
                FechaIngreso = row["Fecha_Ingreso"] != DBNull.Value ? Convert.ToDateTime(row["Fecha_Ingreso"]).ToString("dd/MM/yyyy hh:mm:ss") : string.Empty,
                FechaModificacion = row["fecha_reunion"] != DBNull.Value ? Convert.ToDateTime(row["fecha_reunion"]).ToString("dd/MM/yyyy hh:mm:ss") : string.Empty,
                NombreSucursal = row["NombreSucursal"] != DBNull.Value ? row["NombreSucursal"].ToString() : string.Empty,
                DireccionSucursal = row["Direccion"] != DBNull.Value ? row["Direccion"].ToString() : string.Empty,
               // codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
            };

        }


        public static EmpresaEntity ObtenerFichaIDEmpresa(int IdFicha, int RutEmpresa, string Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@IdFicha", IdFicha),
                new Parametro("@RutEmpresa", RutEmpresa),
                new Parametro("@Periodo", Periodo)
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("spMotor_ObtenerListaEmpresas", pram, EmpresaConsID);
        }
        private static EmpresaEntity EmpresaConsID(DataRow row)
        {
            try
            {
                return new EmpresaEntity
                {
                    idFicha = row["id_ficha"] != DBNull.Value ? Convert.ToInt32(row["id_ficha"]) : 0,
                    PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                    EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                    EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                    EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                    EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                    Empresa_Clasificacion = row["Empresa_Clasificacion"] != DBNull.Value ? row["Empresa_Clasificacion"].ToString() : string.Empty,
                    EjecRut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"]) : 0,
                    EjecDV = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                    codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    EmpresaSucursal = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                    CodOficina = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    Estamento = row["Estamento"] != DBNull.Value ? row["Estamento"].ToString() : string.Empty,
                    FuncionarioEmple = row["Nombre_Funcionario_Emple"] != DBNull.Value ? row["Nombre_Funcionario_Emple"].ToString() : string.Empty,
                    FuncionarioCargo = row["Cargo_Funcionario"] != DBNull.Value ? row["Cargo_Funcionario"].ToString() : string.Empty,
                    NumeroEmpleados = row["Num_Empleados"] != DBNull.Value ? Convert.ToInt32(row["Num_Empleados"]) : 0,
                    FuncionarioCaja = row["funcionario_caja"] != DBNull.Value ? row["funcionario_caja"].ToString() : string.Empty,
                    pregunta_1 = row["pregunta_1"] != DBNull.Value ? row["pregunta_1"].ToString() : string.Empty,
                    pregunta_obs = row["pregunta_1_obs"] != DBNull.Value ? row["pregunta_1_obs"].ToString() : string.Empty,
                    pregunta2_radio = row["pregunta_2_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_2_radio"]) : 0,
                    pregunta2_combo = row["pregunta_2_combo"] != DBNull.Value ? row["pregunta_2_combo"].ToString() : string.Empty,
                    pregunta2_obs2 = row["pregunta_2_obs2"] != DBNull.Value ? row["pregunta_2_obs2"].ToString() : string.Empty,
                    pregunta2_radio_1 = row["pregunta_2_radio_1"] != DBNull.Value ? Convert.ToInt32(row["pregunta_2_radio_1"]) : 0,
                    pregunta2_obs3 = row["pregunta_2_obs3"] != DBNull.Value ? row["pregunta_2_obs3"].ToString() : string.Empty,
                    pregunta2_obs4 = row["pregunta_2_obs4"] != DBNull.Value ? row["pregunta_2_obs4"].ToString() : string.Empty,
                    pregunta2_obs5 = row["pregunta_2_obs5"] != DBNull.Value ? row["pregunta_2_obs5"].ToString() : string.Empty,
                    pregunta3_radio = row["pregunta_3_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_3_radio"]) : 0,
                    pregunta3_obs = row["pregunta_3_obs"] != DBNull.Value ? row["pregunta_3_obs"].ToString() : string.Empty,
                    pregunta4_radio = row["pregunta_4_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_4_radio"]) : 0,
                    pregunta4_radio_2 = row["pregunta_4_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_4_radio_2"]) : 0,
                    pregunta4_obs_1 = row["pregunta_4_obs_1"] != DBNull.Value ? row["pregunta_4_obs_1"].ToString() : string.Empty,
                    pregunta4_obs_2 = row["pregunta_4_obs_2"] != DBNull.Value ? row["pregunta_4_obs_2"].ToString() : string.Empty,
                    pregunta5_radio = row["pregunta_5_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_5_radio"]) : 0,
                    pregunta5_obs = row["pregunta_5_obs_1"] != DBNull.Value ? row["pregunta_5_obs_1"].ToString() : string.Empty,
                    pregunta5_obs_1 = row["pregunta_5_obs_2"] != DBNull.Value ? row["pregunta_5_obs_2"].ToString() : string.Empty,
                    pregunta6_radio = row["pregunta_6_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_6_radio"]) : 0,
                    pregunta6_obs_1 = row["pregunta_6_obs_1"] != DBNull.Value ? row["pregunta_6_obs_1"].ToString() : string.Empty,
                    pregunta6_obs_2 = row["pregunta_6_obs_2"] != DBNull.Value ? row["pregunta_6_obs_2"].ToString() : string.Empty,
                    pregunta7_radio = row["pregunta_7_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_7_radio"]) : 0,
                    pregunta7_obs_1 = row["pregunta_7_obs_1"] != DBNull.Value ? row["pregunta_7_obs_1"].ToString() : string.Empty,
                    pregunta8_combo = row["pregunta_8"] != DBNull.Value ? row["pregunta_8"].ToString() : string.Empty,
                    pregunta8_obs_1 = row["pregunta_8_obs_1"] != DBNull.Value ? row["pregunta_8_obs_1"].ToString() : string.Empty,
                    pregunta9_radio = row["pregunta_9_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_9_radio"]) : 0,
                    pregunta9_radio_1 = row["pregunta_9_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_9_radio_2"]) : 0,
                    pregunta9_obs_1 = row["pregunta_9_obs"] != DBNull.Value ? row["pregunta_9_obs"].ToString() : string.Empty,
                    pregunta10_radio = row["pregunta_10_radio"] != DBNull.Value ? Convert.ToInt32(row["pregunta_10_radio"]) : 0,
                    pregunta10_radio_1 = row["pregunta_10_radio_2"] != DBNull.Value ? Convert.ToInt32(row["pregunta_10_radio_2"]) : 0,
                    pregunta10_obs = row["pregunta_10_obs"] != DBNull.Value ? row["pregunta_10_obs"].ToString() : string.Empty,
                    pregunta11_combo = row["pregunta_11"] != DBNull.Value ? row["pregunta_11"].ToString() : string.Empty,
                    pregunta11_obs_1 = row["pregunta_11_obs"] != DBNull.Value ? row["pregunta_11_obs"].ToString() : string.Empty,
                    EstamentoVisita = row["estamento_2"] != DBNull.Value ? row["estamento_2"].ToString() : string.Empty,
                    Funcionario_EmpleadoVisita = row["nombre_funcionario_emp_2"] != DBNull.Value ? row["nombre_funcionario_emp_2"].ToString() : string.Empty,
                    CargoFuncionarioVisita = row["cargo_funcionario_2"] != DBNull.Value ? row["cargo_funcionario_2"].ToString() : string.Empty,
                    Estado = row["EstadoGuardar"] != DBNull.Value ? row["EstadoGuardar"].ToString() : string.Empty,
                    Anexo = row["anexo"] != DBNull.Value ? row["anexo"].ToString() : string.Empty,
                    Num_Contacto= row["Fono"] != DBNull.Value ? row["Fono"].ToString() : string.Empty,
                    Email = row["Mail"] != DBNull.Value ? row["Mail"].ToString() : string.Empty,
                    NombreSucursal = row["NombreSucursal"] != DBNull.Value ? row["NombreSucursal"].ToString() : string.Empty,
                    DireccionSucursal = row["Direccion"] != DBNull.Value ? row["Direccion"].ToString() : string.Empty,
                };
            }
            catch (Exception ex)
            {
                return new EmpresaEntity
                {
                    //Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                    PeriodoTri = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                    EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                    EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                    EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
                    EmpresaTipo = row["Empresa_Tipo"] != DBNull.Value ? row["Empresa_Tipo"].ToString() : string.Empty,
                    Empresa_Clasificacion = row["Empresa_Clasificacion"] != DBNull.Value ? row["Empresa_Clasificacion"].ToString() : string.Empty,
                    EjecRut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"]) : 0,
                    EjecDV = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                    codSucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                    EmpresaSucursal = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                    CodOficina = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                };
            }
        }


        public static EmpresaEntity ObtenerNombreEmpresa(int RutEmpresa,string Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@RutEmpresa",RutEmpresa),
                new Parametro("@Periodo",Periodo)
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("spMotor_ObtenerEmpresa", pram, EmpresaConsRut);
        }
        private static EmpresaEntity EmpresaConsRut(DataRow row)
        {

            return new EmpresaEntity
            {
                EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                EmpresaDV = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                EmpresaNombre = row["Empresa_Nombre"] != DBNull.Value ? row["Empresa_Nombre"].ToString() : string.Empty,
            };
        }
    }
}