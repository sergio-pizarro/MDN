using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Entity.Contracts;
using CRM.Business.Data;
using CRM.ActionFilters;
using CRM.Filters;


namespace CRM.Areas.AppPage.Controllers
{
    [RoutePrefix("api/Afiliados")]
    public class AfiliadosController : ApiController
    {
        // [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-info-afiliado")]
        public Business.Entity.Afiliados.AfiliadosEntity ObtenerInfoAfiliado(int RutAfiliado)
        {
            return AfiliadoDataAccess.ObtenerDatosAfi(RutAfiliado);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-campanias-afiliado")]
        public IEnumerable<Business.Entity.Afiliados.AfiliadoCampanas> ListarCampaniasAfiliado(int RutAfiliado)
        {
            return AfiliadoDataAccess.ListaCampaniasAfi(RutAfiliado);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-alerta-afiliado")]
        public IEnumerable<Business.Entity.Afiliados.AlertasAfiliados> ListarAlertasAfiliado(int RutAfiliado)
        {
            return AfiliadoDataAccess.ListarAlertasAfiliado(RutAfiliado);
        }
        // [AuthorizationRequired]
        [HttpGet]
        [Route("lista-rut-empresa")]
        public IEnumerable<Business.Entity.Afiliados.AfiliadoEmpresaEntity> ListarRutEmpresa(int RutAfiliado)
        {
            return AfiliadoDataAccess.ListaRutEmpresa(RutAfiliado);
        }
        [HttpGet]
        [Route("obtener-info-empresa")]
        public Business.Entity.Afiliados.EmpresaAfiliadoEntity ObtenerInfoEmpresa(int RutEmpresa,int RutAfiliado)
        {
            return AfiliadoDataAccess.ObtenerDatosEmpresa(RutEmpresa,RutAfiliado);
        }
        [HttpGet]
        [Route("obtener-hist-tipo-campana")]
        public IEnumerable<Business.Entity.Afiliados.AfiliadoCampanas> ObtenerHistorialCamapana(int RutAfiliado, int TipoAsignacion)
        {
            return AfiliadoDataAccess.ObtenerHistorialCampana(RutAfiliado, TipoAsignacion);
        }
        [HttpGet]
        [Route("obtener-cumpleanos")]
        public Business.Entity.Afiliados.AfiliadoDatosCumpleanios ObtenerCumpleanos(int RutAfiliado)
        {
            return AfiliadoDataAccess.ObtenerCumpleanos(RutAfiliado);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("guarda-no-molestar")]
        public Business.Entity.Afiliados.NoMolestarAfiliado noMolestar(string RutAfiliado, string motivo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return AfiliadoDataAccess.AfilidoNoMolestar(RutAfiliado, motivo, token);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("guarda-comentario-afiliado")]
        public Business.Entity.Afiliados.ObservacionAfiliado guardaComentario(string RutAfiliado, string Observacion)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return AfiliadoDataAccess.AfiliadoComentario(RutAfiliado, Observacion, token);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("quita-marcaNoMolestar-afiliado")]
        public Business.Entity.Afiliados.NoMolestarAfiliado SacaMarcaNM(string RutAfiliado)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return AfiliadoDataAccess.sacaMarcaNoMolestar(RutAfiliado, token);
        }

        [HttpGet]
        [Route("obtener-proyeccion")]
        public IEnumerable<Business.Entity.Afiliados.AfiliadoProyeccion> ObtenerProyeccion(string RutAfiliado)
        {
            return AfiliadoDataAccess.ObtieneProyeccionAfiliado(RutAfiliado);
        }

        [HttpGet]
        [Route("filtro-proyeccion")]
        public IEnumerable<Business.Entity.Afiliados.AfiliadoProyeccion> FiltroProyeccion(string RutAfiliado, int Estado)
        {
            return AfiliadoDataAccess.FiltroProyeccionAfiliado(RutAfiliado, Estado);
        }
    }
}