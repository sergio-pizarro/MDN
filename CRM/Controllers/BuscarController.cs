using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Data;

namespace CRM.Controllers
{
    [RoutePrefix("api/busqueda-dotacion")]
    public class BuscarController : ApiController
    {
        [HttpGet]
        [Route("listar-ejecutivos")]
        public IEnumerable<DotacionEntity> obtenerDotacion()
        {
            DateTime hoy = DateTime.Now;
            int periodo = Convert.ToInt32(hoy.Year.ToString() + hoy.Month.ToString().PadLeft(2,'0'));
            return DotacionDataAccess.ListarEntidades(periodo);
        }

        [HttpGet]
        [Route("listar-ejecutivos-especial")]
        public IEnumerable<DotacionEntity> obtenerDotacionEspecial()
        {
            DateTime hoy = DateTime.Now;
            int periodo = Convert.ToInt32(hoy.Year.ToString() + hoy.Month.ToString().PadLeft(2, '0'));
            return DotacionDataAccess.ListarEntidadesEspecial(periodo);
        }
    }
}
