using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class HerramientasGestionController : Controller
    {
        // GET: AppPage/HerramientasGestion
        public ActionResult Index()
        {
            return View();
        }


        // GET: AppPage/HerramientasGestion/CalculadoraCredito
        public ActionResult CalculadoraCredito()
        {
            return View();
        }

    }
}