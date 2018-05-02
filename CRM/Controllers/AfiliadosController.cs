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
    }
}