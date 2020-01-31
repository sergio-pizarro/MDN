using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.AppPage.Controllers
{
    //[PermisosAppFilter]
    public class LicenciasController : Controller
    {
        // GET: AppPage/Licencias
        public ActionResult Index()
        {
            return View();
        }

        // GET: AppPage/Licencias/Ingreso
        public ActionResult Ingreso()
        {
            return View();
        }

        public ActionResult PagosDisponibles()
        {
            return View();
        }
    }
}