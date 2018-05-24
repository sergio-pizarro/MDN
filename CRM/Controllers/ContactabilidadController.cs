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
    [RoutePrefix("api/Contactos")]
    public class ContactabilidadController:ApiController
    {
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-contactos-afi")]
        public IEnumerable<Business.Entity.Contactibilidad.ContactabilidadEntity> ListarContactoAfiliado(int RutAfiliado)
        {
            return Business.Data.ContactabilidadDataAccess.ContactabilidadDataAccess.ListarContacto(RutAfiliado);
        }
    } 

}