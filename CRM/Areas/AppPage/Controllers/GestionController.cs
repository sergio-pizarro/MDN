using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;


namespace CRM.Areas.AppPage.Controllers
{
    [PermisosAppFilter]
    public class GestionController : Controller
    {
        // GET: AppPage/Negocios
        public ActionResult Index()
        {  
            return View();
        }
        public ActionResult Empresas()
        {
            return View();
        }
        public ActionResult EmpresasAdmin()
        {
            return View();
        }

        public ActionResult EmpresaDetalle(int Id)
        {
            return View();
        }

        
        public ActionResult Licencia()
        {
            return View();
        }
        public ActionResult DetalleGestionEmpresa(int RutEmpresa,string Periodo)
        {
            return View();
        }
        public ActionResult DetalleGestionEmpresasAdmin(int RutEmpresa, string Periodo)
        {
            return View();
        }

        public ActionResult AsignacionEmpresa(int RutEmpresa, string Periodo)
        {
            return View();
        }
    }
}