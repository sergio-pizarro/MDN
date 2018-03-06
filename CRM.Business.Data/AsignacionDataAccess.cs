using System;
using System.Collections.Generic;
using System.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CDK.Data;
using CDK.Integration;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CRM.Business.Data
{
    /// <summary>
    /// Clase Acceso de Datos AsignacionDataAccess
    /// </summary>
    /// <author>Carlos Pradenas</author>
    /// <created>11-04-2017 17:27:28</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class AsignacionDataAccess
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="Asignacion"/> en la Base de Datos
        /// </summary>
        /// <author>Carlos Pradenas</author>
        /// <created>11-04-2017 17:27:28</created>
        /// <param name="asignacion">Referencia a una clase <see cref="Asignacion"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(AsignacionEntity asignacion)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@id_Asign", asignacion.id_Asign),
                new Parametro("@Periodo", asignacion.Periodo),
                new Parametro("@Afiliado_Rut", asignacion.Afiliado_Rut),
                new Parametro("@Afiliado_Dv", asignacion.Afiliado_Dv),
                new Parametro("@Nombre", asignacion.Nombre),
                new Parametro("@Apellido", asignacion.Apellido),
                new Parametro("@Empresa_Rut", asignacion.Empresa_Rut),
                new Parametro("@Empresa_Dv", asignacion.Empresa_Dv),
                new Parametro("@Empresa", asignacion.Empresa),
                new Parametro("@ClaRiesgoEmpresa", asignacion.ClaRiesgoEmpresa),
                new Parametro("@Holding", asignacion.Holding),
                new Parametro("@Celular", asignacion.Celular),
                new Parametro("@Telefono1", asignacion.Telefono1),
                new Parametro("@Telefono2", asignacion.Telefono2),
                new Parametro("@Email", asignacion.Email),
                new Parametro("@MontoPension", asignacion.MontoPension),
                new Parametro("@MontoRenta", asignacion.MontoRenta),
                new Parametro("@Monto_preaprobado", asignacion.Monto_preaprobado),
                new Parametro("@Antiguedad_en_Meses", asignacion.Antiguedad_en_Meses),
                new Parametro("@LicMedicaVigente", asignacion.LicMedicaVigente),
                new Parametro("@CreditosVigentes", asignacion.CreditosVigentes),
                new Parametro("@CredVig_Meses_Morosos", asignacion.CredVig_Meses_Morosos),
                new Parametro("@CredVig_MontoCuota", asignacion.CredVig_MontoCuota),
                new Parametro("@EsPensionado", asignacion.EsPensionado),
                new Parametro("@EsPrivado", asignacion.EsPrivado),
                new Parametro("@EsPublico", asignacion.EsPublico),
                new Parametro("@Contacto", asignacion.Contacto),
                new Parametro("@Segmento", asignacion.Segmento),
                new Parametro("@FechaNacimiento", asignacion.FechaNacimiento),
                new Parametro("@Edad", asignacion.Edad),
                new Parametro("@PensionadoFFAA", asignacion.PensionadoFFAA),
                new Parametro("@EmpresaEsPensionado", asignacion.EmpresaEsPensionado),
                new Parametro("@EmpresaEsPublico", asignacion.EmpresaEsPublico),
                new Parametro("@EmpresaEsPrivado", asignacion.EmpresaEsPrivado),
                new Parametro("@RiesgoPerfil", asignacion.RiesgoPerfil),
                new Parametro("@RiesgoMaxVecesRenta", asignacion.RiesgoMaxVecesRenta),
                new Parametro("@RiesgoMaxPreAprobado", asignacion.RiesgoMaxPreAprobado),
                new Parametro("@PreAprobadoFinal", asignacion.PreAprobadoFinal),
                new Parametro("@CredVigente", asignacion.CredVigente),
                new Parametro("@Oficina", asignacion.Oficina),
                new Parametro("@Asignado", asignacion.Asignado),
                new Parametro("@Ejec_Asignacion", asignacion.Ejec_Asignacion),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<int>("spMotor_Asignacion_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="Asignacion"/> de la Base de Datos dado un ID de Asignacion
        /// </summary>
        /// <author>Carlos Pradenas</author>
        /// <created>11-04-2017 17:27:28</created>
        /// <param name="id_Asign">ID de Asignacion.</param>
        /// <returns>Referencia a una clase <see cref="Asignacion"/>.</returns>
        public static AsignacionEntity ObtenerPorID(int id_Asign)
        {
            Parametro parametro = new Parametro("@id_Asign", id_Asign);

            return DBHelper.InstanceCRM.ObtenerEntidad("sp_Asignacion_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="Asignacion"/> de la Base de Datos
        /// </summary>
        /// <author>Carlos Pradenas</author>
        /// <created>11-04-2017 17:27:28</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceCRM.ObtenerDataTable("sp_Asignacion_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="Asignacion"/> de la Base de Datos
        /// </summary>
        /// <author>Carlos Pradenas</author>
        /// <created>11-04-2017 17:27:28</created>
        /// <returns>Lista con todas las entidades <see cref="Asignacion"/>.</returns>
        public static List<AsignacionEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("sp_Asignacion_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales

        public static AsignacionEntity ObtenerByAfiRut(int Periodo, string AfiliadoRut)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@AfiliadoRut",AfiliadoRut),
            };

            return DBHelper.InstanceCRM.ObtenerEntidad("spMotor_Asignacion_ObtenerByAfiliado", pram, ConstructorEntidad);
        }


        public static List<AsignacionEntity> ListarByAfiRut(int Periodo, string AfiliadoRut)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@AfiliadoRut",AfiliadoRut),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Asignacion_ObtenerByAfiliado", pram, ConstructorEntidad);
        }


        public static List<AsignacionEntity> ListarByEmpresaRut(int Periodo, string EmpresaRut)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@AfiliadoRut",EmpresaRut),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Asignacion_ObtenerByEmpresa", pram, ConstructorEntidad);
        }



        public static List<AsignacionEntity> ListarByEjecutivo(int Periodo, string TokenEjecutivo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@TokenEjecutivo",TokenEjecutivo),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Asignacion_ListarByEjecutivo", pram, ConstructorEntidad);
        }


        public static List<AsignacionEntity> ListarByOficina(int Periodo, string TokenEjecutivo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo),
                new Parametro("@TokenEjecutivo",TokenEjecutivo),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Asignacion_ListarByOficina", pram, ConstructorEntidad);
        }

        public static List<AsignacionEntity> ListarByPeriodo(int Periodo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Periodo", Periodo)
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Asignacion_ListarByPeriodo", pram, ConstructorEntidad);
        }


        public static int CantidadAsignacionesByRut(string RutEjecutivo, int TipoAsignacion, int CodigoOficina)
        {
            Parametros pram = new Parametros() {
                                new Parametro("@rutEjec", RutEjecutivo),
                                new Parametro("@tipAsig", TipoAsignacion),
                                new Parametro("@CodOffice",CodigoOficina)
            };

            string sql = "";

            if (TipoAsignacion == 1)
            {
                sql = "select count(*) Retorno from dbo.TabMotor_Asignacion where Periodo = (select max(Periodo) from dbo.TabMotor_Asignacion) and Ejec_Asignacion = @rutEjec and TipoAsignacion=@tipAsig and Oficina=@CodOffice and (Celular<>'' Or Telefono1<>'' Or Telefono2<>'') and Cuadrante = 1 ";
            }
            if (TipoAsignacion ==2)
            {
                sql = "select count(*) Retorno from dbo.TabMotor_Asignacion where Periodo = (select max(Periodo) from dbo.TabMotor_Asignacion) and Ejec_Asignacion = @rutEjec and TipoAsignacion=@tipAsig and Oficina=@CodOffice and (Celular<>'' Or Telefono1<>'' Or Telefono2<>'')";
            }
            if (TipoAsignacion==3)
            {
                sql = "select count(*) Retorno from dbo.TabMotor_Asignacion where Periodo = (select max(Periodo) from dbo.TabMotor_Asignacion) and Ejec_Asignacion = @rutEjec and TipoAsignacion=@tipAsig and Oficina=@CodOffice and (Celular<>'' Or Telefono1<>'' Or Telefono2<>'') and Cuadrante = 1 ";
            }

            if (TipoAsignacion == 4)
            {
                sql = "select count(*) Retorno from dbo.TabMotor_Asignacion where Periodo = (select max(Periodo) from dbo.TabMotor_Asignacion) and Ejec_Asignacion = @rutEjec and TipoAsignacion=@tipAsig and Oficina=@CodOffice and (Celular<>'' Or Telefono1<>'' Or Telefono2<>'')";
            }

            return DBHelper.InstanceCRM.ObtenerEscalarFromSql<int>(sql, pram);
        }


        public static int Reasignar(WebReasignacionBase rdata)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@rutOrigen", rdata.ProcesoReasignacion.RutEjecutivoOrigen),
                new Parametro("@rutDestino",rdata.ProcesoReasignacion.RutEjecutivoDestino),
                new Parametro("@tipCmp",rdata.ProcesoReasignacion.TipoCampania),
                new Parametro("@cntRea",rdata.ProcesoReasignacion.CantidadAsignaciones),
                new Parametro("@codOfi",rdata.ProcesoReasignacion.CodOficina),
                new Parametro("@origen_antes",rdata.AuxLog.OrigenAntes),
                new Parametro("@origen_despues",rdata.AuxLog.OrigenDespues),
                new Parametro("@destino_antes",rdata.AuxLog.DestinoAntes),
                new Parametro("@destino_despues",rdata.AuxLog.DestinoDespues),
                new Parametro("@token_Agente",rdata.AuxLog.TokenAgente),

            };

            return DBHelper.InstanceCRM.EjecutarProcedimiento("spMotor_Reasignacion", pram);
        }
        

        public static int AsignarOficina(int AsiCod, int Oficina)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Asignacion", AsiCod),
                new Parametro("@Oficina",Oficina)
            };

            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_AsignarOficina", pram);
        }



        public static List<AsignacionRechazos> obtenerRechazos(int periodo, int empresarut, int afiliadorut)
        {
            Parametros prms = new Parametros
            {
                new Parametro("@Periodo",periodo),
                new Parametro("@EmpresaRut",empresarut),
                new Parametro("@AfiliadoRut",afiliadorut)
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Asignacion_Rechazos_Listar", prms, ConstructorRechazo);
        }

        #endregion

        #region constructor
        private static AsignacionEntity ConstructorEntidad(DataRow row)
        {
            return new AsignacionEntity
            {
                id_Asign = row["id_Asign"] != DBNull.Value ? Convert.ToInt32(row["id_Asign"]) : 0,
                Periodo = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                Afiliado_Rut = row["Afiliado_Rut"] != DBNull.Value ? Convert.ToDecimal(row["Afiliado_Rut"]) : 0,
                Afiliado_Dv = row["Afiliado_Dv"] != DBNull.Value ? row["Afiliado_Dv"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Apellido = row["Apellido"] != DBNull.Value ? row["Apellido"].ToString() : string.Empty,
                Empresa_Rut = row["Empresa_Rut"] != DBNull.Value ? row["Empresa_Rut"].ToString() : string.Empty,
                Empresa_Dv = row["Empresa_Dv"] != DBNull.Value ? row["Empresa_Dv"].ToString() : string.Empty,
                Empresa = row["Empresa"] != DBNull.Value ?  row["Empresa"].ToString() : string.Empty,
                ClaRiesgoEmpresa = row["ClaRiesgoEmpresa"] != DBNull.Value ? row["ClaRiesgoEmpresa"].ToString() : string.Empty,
                Holding = row["Holding"] != DBNull.Value ? row["Holding"].ToString() : string.Empty,
                Celular = row["Celular"] != DBNull.Value ? row["Celular"].ToString() : string.Empty,
                Telefono1 = row["Telefono1"] != DBNull.Value ? row["Telefono1"].ToString() : string.Empty,
                Telefono2 = row["Telefono2"] != DBNull.Value ? row["Telefono2"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                MontoPension = row["MontoPension"] != DBNull.Value ? Convert.ToDecimal(row["MontoPension"]) : 0,
                MontoRenta = row["MontoRenta"] != DBNull.Value ? Convert.ToInt32(row["MontoRenta"]) : 0,
                Monto_preaprobado = row["Monto_preaprobado"] != DBNull.Value ? Convert.ToInt32(row["Monto_preaprobado"]) : 0,
                Antiguedad_en_Meses = row["Antiguedad_en_Meses"] != DBNull.Value ? Convert.ToInt32(row["Antiguedad_en_Meses"]) : 0,
                LicMedicaVigente = row["LicMedicaVigente"] != DBNull.Value ? Convert.ToInt32(row["LicMedicaVigente"]) : 0,
                CreditosVigentes = row["CreditosVigentes"] != DBNull.Value ? Convert.ToInt32(row["CreditosVigentes"]) : 0,
                CredVig_Meses_Morosos = row["CredVig_Meses_Morosos"] != DBNull.Value ? Convert.ToInt32(row["CredVig_Meses_Morosos"]) : 0,
                CredVig_MontoCuota = row["CredVig_MontoCuota"] != DBNull.Value ? Convert.ToInt32(row["CredVig_MontoCuota"]) : 0,
                EsPensionado = row["EsPensionado"] != DBNull.Value ? Convert.ToInt32(row["EsPensionado"]) : 0,
                EsPrivado = row["EsPrivado"] != DBNull.Value ? Convert.ToInt32(row["EsPrivado"]) : 0,
                EsPublico = row["EsPublico"] != DBNull.Value ? Convert.ToInt32(row["EsPublico"]) : 0,
                Contacto = row["Contacto"] != DBNull.Value ? Convert.ToInt32(row["Contacto"]) : 0,
                Segmento = row["Segmento"] != DBNull.Value ? row["Segmento"].ToString() : string.Empty,
                FechaNacimiento = row["FechaNacimiento"] != DBNull.Value ? Convert.ToDateTime(row["FechaNacimiento"]) : new DateTime(1900, 1, 1),
                Edad = row["Edad"] != DBNull.Value ? Convert.ToInt32(row["Edad"]) : 0,
                PensionadoFFAA = row["PensionadoFFAA"] != DBNull.Value ? Convert.ToInt32(row["PensionadoFFAA"]) : 0,
                EmpresaEsPensionado = row["EmpresaEsPensionado"] != DBNull.Value ? Convert.ToInt32(row["EmpresaEsPensionado"]) : 0,
                EmpresaEsPublico = row["EmpresaEsPublico"] != DBNull.Value ? Convert.ToInt32(row["EmpresaEsPublico"]) : 0,
                EmpresaEsPrivado = row["EmpresaEsPrivado"] != DBNull.Value ? Convert.ToInt32(row["EmpresaEsPrivado"]) : 0,
                RiesgoPerfil = row["RiesgoPerfil"] != DBNull.Value ? row["RiesgoPerfil"].ToString() : string.Empty,
                RiesgoMaxVecesRenta = row["RiesgoMaxVecesRenta"] != DBNull.Value ? Convert.ToInt64(row["RiesgoMaxVecesRenta"]) : 0,
                RiesgoMaxPreAprobado = row["RiesgoMaxPreAprobado"] != DBNull.Value ? Convert.ToInt64(row["RiesgoMaxPreAprobado"]) : 0,
                PreAprobadoFinal = row["PreAprobadoFinal"] != DBNull.Value ? Convert.ToInt64(row["PreAprobadoFinal"]) : 0,
                CredVigente = row["CredVigente"] != DBNull.Value ? Convert.ToInt32(row["CredVigente"]) : 0,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                Asignado = row["Asignado"] != DBNull.Value ? Convert.ToInt32(row["Asignado"]) : 0,
                Ejec_Asignacion = row["Ejec_Asignacion"] != DBNull.Value ? row["Ejec_Asignacion"].ToString() : string.Empty,
                TipoAsignacion = row["TipoAsignacion"] != DBNull.Value ? Convert.ToInt32(row["TipoAsignacion"]) : 0,
                Prioridad = row["Prioridad"] != DBNull.Value ? Convert.ToInt32(row["Prioridad"]) : 0,
                TipoCampania = row["TipoCampania"] != DBNull.Value ? row["TipoCampania"].ToString() : string.Empty,
                Cuadrante = row["Cuadrante"] != DBNull.Value ? Convert.ToInt32(row["Cuadrante"]) : 0,
                OfertaTexto = row["OfertaTexto"] != DBNull.Value ? row["OfertaTexto"].ToString() : string.Empty,
                TipoDerivacion = row["TipoDerivacion"] != DBNull.Value ? row["TipoDerivacion"].ToString() : string.Empty,
            };
        }


        private static AsignacionRechazos ConstructorRechazo(DataRow row)
        {
            return new AsignacionRechazos
            {
                Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                AfiliadoRut = row["Afiliado_Rut"] != DBNull.Value ? Convert.ToInt32(row["Afiliado_Rut"]) : 0,
                EmpresaRut = row["Empresa_Rut"] != DBNull.Value ? Convert.ToInt32(row["Empresa_Rut"]) : 0,
                MotivoRechazo = row["MotivoRechazo"] != DBNull.Value ? row["MotivoRechazo"].ToString() : string.Empty
            };
        }


            #endregion
        }
}
