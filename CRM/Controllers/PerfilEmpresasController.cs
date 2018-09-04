using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;
using CRM.ActionFilters;

namespace CRM.Controllers
{
    [RoutePrefix("api/perfil-empresas")]
    public class PerfilEmpresasController : ApiController
    {
        //[AuthorizationRequired]
        [HttpGet]
        [Route("obtener-cartera-empresa")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraEmpresa()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraEmp(token);
        }

        [HttpGet]
        [Route("obtener-cartera-agente")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraAgente()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraAgen(token);
        }

        [HttpGet]
        [Route("lista-perfil-empresa")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresa(string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmp(RutEmpresa);
        }

        [HttpGet]
        [Route("lista-perfil-empresaAnexo")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresaAnexo(int IdEmpresaA)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmpAnexo(IdEmpresaA);
        }

        [HttpGet]
        [Route("lista-asignados-empresa")]
        public ICollection<AsigandosEjecutivoEmpresaEntity> ObtenerAsignadosEjeEmpresa(string RutEmpresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneAsignacionEjeEmp(token, RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-nuevo-anexo")]
        public int NuevoAnexo(AnexoEmpresaEntity ingreso)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoAnexo(Token, ingreso.RutEmpresa, ingreso.NombreEmpresa, ingreso.Anexo, ingreso.NumTrabajadores, ingreso.IdComuna, ingreso.NombreComuna, ingreso.Direccion);
        }

        [HttpGet]
        [Route("lista-comunas-empresa")]
        public ICollection<ComunasEmpresaEntity> ObtenerComunasEmpresas()
        {
            return PerfilEmpresasDataAccess.ObtieneComunaEmp();
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-asignacion-empresa-anexo")]
        public ResultadoBase GuardarCarteraEmpAnexo(AsignacionAnexoEmpresa asignacionEmpresa)
        {
            try
            {
                PerfilEmpresasDataAccess.GuardarAsignacionEmpAnexo(asignacionEmpresa.Tipo, asignacionEmpresa.EjecAsignado, asignacionEmpresa.id);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [HttpGet]
        [Route("lista-ejecutivo-asignado")]
        public ICollection<EjecutivosAsignadosEntity> ObtenerEjesAsig(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneEjeAsignados(IdEmpresa);
        }




    }

}
