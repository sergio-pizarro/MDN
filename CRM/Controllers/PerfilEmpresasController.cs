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
using Interop = Microsoft.Office.Interop;
using Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices;
using System.Web;
using System.Threading.Tasks;

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

        [HttpPost]
        [Route("carga-afiliados-dropzone/{anexo}")]
        public async Task<IHttpActionResult> SaveUploadedFile([FromUri] string anexo = "")
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                var lista = new List<string>();
                string imprimir = "";
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                var baseUploadPath = @"C:\uploads\excel\";
                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            var nombreFinal = "R" + anexo + DateTime.Now.ToString("yyyyMMddHHmmssFFF") + ".csv";
                            var filePath = Path.Combine(baseUploadPath, nombreFinal);
                            var buffer = await file.ReadAsByteArrayAsync();
                            File.WriteAllBytes(filePath, buffer);

                            using (var files = new StreamReader(filePath))
                            {
                                string line; int i = 0;
                                while ((line = files.ReadLine()) != null)
                                {
                                    if (i > 0)
                                    {
                                        string rut = line.Split(';')[0];
                                        string dv = line.Split(';')[1];
                                        string final = rut + "-" + dv;
                                        imprimir = imprimir + "ANEXO[" + anexo + "] RUT[" + final + "]";

                                        PerfilEmpresasDataAccess.InsertaAfiliadoAnexo(Convert.ToInt32(anexo), final);
                                        //return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto" };
                                    }
                                    i++;
                                }
                            }
                            File.Delete(filePath);
                        }
                        else
                        {
                            return BadRequest("El archivo debe ser csv " + imprimir);
                        }
                    }
                }

                return Ok("Datos procesados " + imprimir);
            }
            catch (Exception ex)
            {
                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);
            }
        }

        [HttpGet]
        [Route("lista-preaprobado-anexo")]
        public ICollection<AsigandosEjecutivoEmpresaEntity> ObtenerPreAprobadosAnexo(int idAnexo, string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtienePreAprobasoAnex(idAnexo, RutEmpresa);
        }
    }

}
