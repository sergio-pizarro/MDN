using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class UpdateController : Controller
    {
        // GET: AppPage/Update
        public ActionResult ArchivoGP()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload()
        {
            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            if (extension.Equals(".xlsx") || extension.Equals(".xls"))
            {
                if (Request.Files.Count > 0)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        var nombreFinal = "Seguimiento GrandPrix" + extension;
                        var path = Path.Combine(Server.MapPath("~/Assets/data"), nombreFinal);
                        file.SaveAs(path);
                    }
                }
            }
            else
            {
                return Json(new { message = "Archivo no compatible..." });
            }
            return Json(new { message = "OK" });
        }
    }
}