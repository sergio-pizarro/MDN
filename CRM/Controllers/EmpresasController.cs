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

namespace CRM.Controllers
{
    [RoutePrefix("api/Empresas")]
    public class EmpresasController : ApiController
    {
        [HttpGet]
        [Route("lista-empresas")]
        public void ListarEmpresas()
        {

        }

    }
}
