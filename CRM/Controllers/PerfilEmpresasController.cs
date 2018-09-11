using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;
using CRM.ActionFilters;
using System.IO;
using Excel = Microsoft.Office.Interop;
using Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices;
using System.Web;

namespace CRM.Controllers
{
    [RoutePrefix("api/perfil-empresas")]
    public class PerfilEmpresasController : ApiController
    {
        //[AuthorizationRequired]
        [HttpGet]
        [Route("obtener-cartera-empresa")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraEmpresa()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraEmp(token);
        }

        [HttpGet]
        [Route("obtener-cartera-agente")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraAgente()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraAgen(token);
        }

        [HttpGet]
        [Route("lista-perfil-empresa")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresa(string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmp(RutEmpresa);
        }

        [HttpGet]
        [Route("lista-perfil-empresaAnexo")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresaAnexo(int IdEmpresaA)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmpAnexo(IdEmpresaA);
        }

        [HttpGet]
        [Route("lista-asignados-empresa")]
        public ICollection<AsigandosEjecutivoEmpresaEntity> ObtenerAsignadosEjeEmpresa(string RutEmpresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneAsignacionEjeEmp(token, RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-nuevo-anexo")]
        public int NuevoAnexo(AnexoEmpresaEntity ingreso)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoAnexo(Token, ingreso.RutEmpresa, ingreso.NombreEmpresa, ingreso.Anexo, ingreso.NumTrabajadores, ingreso.IdComuna, ingreso.NombreComuna, ingreso.Direccion);
        }

        [HttpGet]
        [Route("lista-comunas-empresa")]
        public ICollection<ComunasEmpresaEntity> ObtenerComunasEmpresas()
        {
            return PerfilEmpresasDataAccess.ObtieneComunaEmp();
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-asignacion-empresa-anexo")]
        public ResultadoBase GuardarCarteraEmpAnexo(AsignacionAnexoEmpresa asignacionEmpresa)
        {
            try
            {
                PerfilEmpresasDataAccess.GuardarAsignacionEmpAnexo(asignacionEmpresa.Tipo, asignacionEmpresa.EjecAsignado, asignacionEmpresa.id);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [HttpGet]
        [Route("lista-ejecutivo-asignado")]
        public ICollection<EjecutivosAsignadosEntity> ObtenerEjesAsig(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneEjeAsignados(IdEmpresa);
        }

        [HttpGet]
        [Route("lista-cartera-anexo")]
        public ICollection<AnexoEmpresaEntity> ObtenerAnexos(string RutEmpresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneAnexoEmp(RutEmpresa, token);
        }

        [HttpGet]
        [Route("lista-datos-anexo")]
        public Business.Entity.AnexoEmpresaEntity ListadatosAnexos(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneDatosAnexo(IdEmpresa);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("actualiza-nuevo-anexo")]
        public int ActualizaAnexoEmp(AnexoEmpresaEntity actualiza)
        {
            return Business.Data.PerfilEmpresasDataAccess.ActualizaAnexo(actualiza.IdEmpresaAnexo, actualiza.Anexo, actualiza.NumTrabajadores, actualiza.IdComuna, actualiza.NombreComuna, actualiza.Direccion);
        }

        [HttpGet]
        [Route("lista-contador-asignado")]
        public Business.Entity.ContadorAsignadosEntity ContadorAsig(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneContadorAsig(IdEmpresa);
        }

        [HttpGet]
        [Route("lista-contador-anexos")]
        public Business.Entity.ContadorAnexoEntity ContadorAnexos(string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneContadorAnexo(RutEmpresa);
        }

        //[HttpPost]
        //public IHttpActionResult CargaAfiliados(HttpPostedFileBase archivoExcel)
        //{
        //    Excel.Excel.Application application = new Excel.Excel.Application();
        //    try
        //    {
        //        if (archivoExcel.ContentLength == 0 || archivoExcel == null)
        //        {
        //            return BadRequest("Por favor seleccione un archivo.<br>");
        //        }
        //        else
        //        {
        //            if (archivoExcel.FileName.EndsWith("xls") || archivoExcel.FileName.EndsWith("xlsx"))
        //            {
        //                string path = System.Web.Hosting.HostingEnvironment.MapPath("../Uploads/");
        //                if (!Directory.Exists(path))
        //                {
        //                    Directory.CreateDirectory(path);
        //                }
        //                String filepath = path + Path.GetFileName(archivoExcel.FileName);
        //                string extension = Path.GetExtension(archivoExcel.FileName);
        //                archivoExcel.SaveAs(filepath);
        //                Excel.Excel.Workbook workbook = application.Workbooks.Open(filepath);
        //                //Excel.Excel.Worksheet worksheet = workbook.ActiveSheet;
        //                Excel.Excel.Worksheet worksheet = ((Excel.Excel.Worksheet)application.ActiveWorkbook.Worksheets[1]);
        //                Excel.Excel.Range range = worksheet.UsedRange;

        //                for (int row = 2; row < range.Rows.Count + 1; row++)
        //                {
        //                    //ArchivoModel a = new ArchivoModel();
        //                    //a.rut = Convert.ToInt32(((Excel.Excel.Range)range.Cells[row, 1]).Text);
        //                    //a.dv = Convert.ToInt32(((Excel.Excel.Range)range.Cells[row, 2]).Text);
        //                    //a.procesaDatos();
        //                }
        //                application.Workbooks.Close();
        //                application.Quit();
        //                return Ok("Index");
        //            }
        //            else
        //            {
        //                return BadRequest("Extensión del archivo es incorrecta");
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        application.Workbooks.Close();
        //        application.Quit();
        //        return Ok("Index");
        //    }
        //}



    }

}
