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

    [RoutePrefix("api/CarteraEmpresas")]
    public class CarteraEmpresasController : ApiController
    {
        // GET: CarteraEmpresas
        [AuthorizationRequired] 
        [HttpGet]
        [Route("obtener-nombre")]
        public CarteraEmpresaEntity ObtEmpresaNombres(string RutEmpresa)
        {
            return CarteraEmpresaDataAccess.ObtenerDatoEmpresa(RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ejecutivo-cargo")]
        public List<EjecutivoCarteraEntity> ListarEjecutivoCargo(int CodTipo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListarEjecutivoCargo(token, CodTipo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-empresa-ejecutivo")]
        public IEnumerable<CarteraEmpresaEntity> ListarEmpresaEjecutivo()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListaEmpresaEjecutivo(token);
        }


        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-cartera-empresa")]
        public ResultadoBase GuardarCartera(WebCarteraEmpresa entrada)
        {


            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                IngresoCarteraEmpresa ing = new IngresoCarteraEmpresa();

                ing.CodIngresoEmpresa = entrada.webCodIngreso;
                ing.RutEmpresa = entrada.webRutEmpresa.Replace(".", "");
                ing.NombreEmpresa = entrada.webNombreEmpresa;
                ing.TipoEjectEmpresa = entrada.webTipoEjecutivo;
                ing.RutEjecutivo = entrada.webRutEjecutivo.Replace(".", "");
                ing.NombreEjecutivo = entrada.webNombreEjecutivo;
                

                IngresoCarteraEmpresaDataAccess.Guardar(ing, token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto", Objeto = entrada };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("cartera-data")]
        public IngresoCarteraEmpresa DatoCarteraEmpresa(int codIngreso)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return IngresoCarteraEmpresaDataAccess.ObtenerPorID(codIngreso);
            
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("eliminar-cartera-empresa")]
        public ResultadoBase EliminarCarteraEmpresa(int CodIngreso)
        {
            try
            {
                IngresoCarteraEmpresaDataAccess.Eliminar(CodIngreso);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Registro Eliminado con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar " + ex.Message, Objeto = ex };
            }
        }



    }
}