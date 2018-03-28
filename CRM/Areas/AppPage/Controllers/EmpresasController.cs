using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class EmpresasController : Controller
    {
        // GET: AppPage/Empresas
        public ActionResult Index()
        {
            return View();
        }

        // GET: AppPage/Empresas/Nuevo
        public ActionResult Nuevo(string t)
        {
            switch(t)
            {
                case "F":
                    return View("Nuevo/Fidelizacion");
                    
                case "R":
                    return View("Nuevo/Retencion");
                    
                case "P":
                    return View("Nuevo/Prospeccion");
                    
                default:
                    return View();
            }


            
        }
    }
}