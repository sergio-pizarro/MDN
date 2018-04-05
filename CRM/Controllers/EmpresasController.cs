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
using System.Net.Http.Headers;

namespace CRM.Controllers
{
    //Motor de Empresas
    [RoutePrefix("api/Empresas")]
    public class EmpresasController : ApiController
    {
        #region Fidelizacion

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-fidelizacion")]
        public BootstrapTableResult<FidelizaContainer> ListadoFidelizacion(string sort="Rut", string order="asc", int limit = 30, int offset = 0)
        {
            List<FidelizaContainer> salida = new List<FidelizaContainer>();
            BootstrapTableResult<FidelizaContainer> salida_final = new BootstrapTableResult<FidelizaContainer>();
            FidelizacionDataAccess.ObtenerEntidades().ForEach(fide =>
            {
                FidelizaContainer fc = new FidelizaContainer();
                fc.Fidelizacion = fide;
                fc.Representante = RepresentanteempresaDataAccess.ObtenerPorID(fide.representante_id);
                fc.Empresa = EmpresaDataAccess.ObtenerPorID(fc.Representante.emp_id);
                fc.ResultadoGestion = ResultadogestionDataAccess.ObtenerEntidades().FindAll(d => d.fidelizacion_id == fide.fide_id);
                List<AmbitosContainer> ambits = new List<AmbitosContainer>();
                AmbitosfidelizacionDataAccess.ObtenerEntidades().FindAll(d => d.fidelizacion_id == fc.Fidelizacion.fide_id).ForEach(amf => {
                    AmbitosContainer saf = new AmbitosContainer();
                    saf.AmbitoFidelizacion = amf;
                    saf.AmbitoArea = AmbitosareaDataAccess.ObtenerPorID(amf.ambito_id);
                    saf.Area = AreasDataAccess.ObtenerPorID(saf.AmbitoArea.area_id);
                    ambits.Add(saf);
                });

                salida.Add(fc);
            });

            switch (order)
            {
                case "asc":
                    switch (sort)
                    {
                        case "Empresa.emp_rut":
                            salida = salida.OrderBy(o => o.Empresa.emp_rut).ToList();
                            break;
                        case "Empresa.emp_nombre":
                            salida = salida.OrderBy(o => o.Empresa.emp_nombre).ToList();
                            break;
                        case "Empresa.emp_holding":
                            salida = salida.OrderBy(o => o.Empresa.emp_holding).ToList();
                            break;
                        case "Representante.rep_nombre":
                            salida = salida.OrderBy(o => o.Fidelizacion.fide_estamento).ToList();
                            break;
                        case "Fidelizacion.fide_estamento":
                            salida = salida.OrderBy(o => o.Empresa.emp_nombre).ToList();
                            break;
                        case "Fidelizacion.fide_fecha_calendario":
                            salida = salida.OrderBy(o => o.Fidelizacion.fide_fecha_calendario).ToList();
                            break;
                    }
                    break;
                case "desc":
                    switch (sort)
                    {
                        case "Empresa.emp_rut":
                            salida = salida.OrderByDescending(o => o.Empresa.emp_rut).ToList();
                            break;
                        case "Empresa.emp_nombre":
                            salida = salida.OrderByDescending(o => o.Empresa.emp_nombre).ToList();
                            break;
                        case "Empresa.emp_holding":
                            salida = salida.OrderByDescending(o => o.Empresa.emp_holding).ToList();
                            break;
                        case "Representante.rep_nombre":
                            salida = salida.OrderByDescending(o => o.Fidelizacion.fide_estamento).ToList();
                            break;
                        case "Fidelizacion.fide_estamento":
                            salida = salida.OrderByDescending(o => o.Empresa.emp_nombre).ToList();
                            break;
                        case "Fidelizacion.fide_fecha_calendario":
                            salida = salida.OrderByDescending(o => o.Fidelizacion.fide_fecha_calendario).ToList();
                            break;
                    }
                    break;
            }

            salida_final.total = salida.Count;
            salida_final.rows = salida.Skip(offset).Take(limit).ToList();
            return salida_final;
        }


        //[AuthorizationRequired]
        [HttpGet]
        [Route("data-fidelizacion")]
        public FidelizaContainer DataFidelizacion(int id)
        {
            FidelizaContainer salida = new FidelizaContainer();
            salida.Fidelizacion = FidelizacionDataAccess.ObtenerPorID(id);
            salida.Representante = RepresentanteempresaDataAccess.ObtenerPorID(salida.Fidelizacion.representante_id);
            salida.Empresa = EmpresaDataAccess.ObtenerPorID(salida.Representante.emp_id);
            salida.ResultadoGestion = ResultadogestionDataAccess.ObtenerEntidades().FindAll(d=>d.fidelizacion_id == salida.Fidelizacion.fide_id);

            List<AmbitosContainer> ambits = new List<AmbitosContainer>();
            AmbitosfidelizacionDataAccess.ObtenerEntidades().FindAll(d => d.fidelizacion_id == salida.Fidelizacion.fide_id).ForEach(amf => {
                AmbitosContainer saf = new AmbitosContainer();
                saf.AmbitoFidelizacion = amf;
                saf.AmbitoArea = AmbitosareaDataAccess.ObtenerPorID(amf.ambito_id);
                saf.Area = AreasDataAccess.ObtenerPorID(saf.AmbitoArea.area_id);
                ambits.Add(saf);
            });

            salida.Ambitos = ambits;

            return salida;
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-fidelizacion")]
        public ResultadoBase GuardarFidelizacion(Fideliza entrada)
        {
            try
            {   
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                int _uid = Security.Data.TokenDataAccess.Obtener(token).FirstOrDefault().UserId;
                string _rut = Security.Data.UsuarioDataAccess.UsuarioData(_uid).RutUsuario;
                CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
                int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);



                EmpresaEntity em = EmpresaDataAccess.ObtenerEntidades().Find(emp => emp.emp_rut == entrada.Rut.Replace(".", ""));
                if(em == null)
                {
                    em = new EmpresaEntity();
                    em.emp_rut = entrada.Rut.Replace(".", "");
                    em.emp_nombre = entrada.Nombre;
                    em.emp_holding = entrada.Holding;
                    em.emp_id = EmpresaDataAccess.Guardar(em);
                }

                

                RepresentanteempresaEntity rep = RepresentanteempresaDataAccess.ObtenerPorID(entrada.IdRepresentante);
                if (rep == null)
                {
                    rep = new RepresentanteempresaEntity();
                }

                rep.emp_id = em.emp_id;
                rep.rep_nombre = entrada.NombreRepresentante;
                rep.rep_cargo = entrada.CargoRepresentante;
                rep.rep_id = RepresentanteempresaDataAccess.Guardar(rep);

                FidelizacionEntity fd = FidelizacionDataAccess.ObtenerPorID(entrada.IdFidelizacion);
                if(fd == null)
                {
                    fd = new FidelizacionEntity();
                }

                fd.fide_actividad = entrada.Actividad;
                fd.fide_cobertura = entrada.Cobertura;
                fd.fide_estamento = entrada.Estamento;
                fd.fide_fecha_calendario = Convert.ToDateTime(entrada.FechaFidelizacion);
                fd.fide_fecha_accion = DateTime.Now;
                fd.representante_id = rep.rep_id;
                fd.cod_oficina = codOficina;
                fd.rut_ejecutivo = _rut;
                fd.fide_id = FidelizacionDataAccess.Guardar(fd);

                if(entrada.Ambitos.Count > 0)
                {
                    AmbitosfidelizacionDataAccess.EliminarByFidelizacion(fd.fide_id);
                    entrada.Ambitos.ForEach(amb =>
                    {
                        AmbitosfidelizacionEntity _amb = new AmbitosfidelizacionEntity();
                        _amb.ambito_id = Convert.ToInt32(amb.valor);
                        _amb.fidelizacion_id = fd.fide_id;
                        AmbitosfidelizacionDataAccess.Guardar(_amb);
                    });
                }
                
                if(entrada.ResultadosGestion.Count > 0)
                {
                    ResultadogestionDataAccess.EliminarByFidelizacion(fd.fide_id);
                    entrada.ResultadosGestion.ForEach(rges => {
                        ResultadogestionEntity _resg = new ResultadogestionEntity();
                        _resg.fidelizacion_id = fd.fide_id;
                        _resg.resg_comentarios = rges.contenido;
                        _resg.resg_fecha = Convert.ToDateTime(rges.fecha + " 00:00:00");
                        _resg.resg_tipo = rges.tipo;
                        ResultadogestionDataAccess.Guardar(_resg);
                    });
                }
                

                return new ResultadoBase() { Estado="OK", Mensaje="Fidelización Almacenada con Éxito", Objeto = entrada };
            }
            catch (Exception ex)
            {
                throw new Exception("Error al Guardar Fidelización", ex);
            }
        }

        #endregion

    }

    public class BootstrapTableResult<T>
    {
        public int total { get; set; }
        public IEnumerable<T> rows { get; set; }
    }

    public class FidelizaContainer
    {
        public FidelizacionEntity Fidelizacion { get; set; }
        public RepresentanteempresaEntity Representante { get; set; }
        public EmpresaEntity Empresa { get; set; }
        public IEnumerable<AmbitosContainer> Ambitos { get; set; }
        public IEnumerable<ResultadogestionEntity> ResultadoGestion { get; set; } 
    }

    public class AmbitosContainer
    {
        public AmbitosfidelizacionEntity AmbitoFidelizacion { get; set; }
        public AmbitosareaEntity AmbitoArea { get; set; }
        public AreasEntity Area { get; set; }
    }

    public class Fideliza
    {
        public int IdFidelizacion { get; set; }
        public string Rut { get; set; }
        public string Nombre { get; set; }
        public string Holding { get; set; }
        public string Estamento { get; set; }
        public string Actividad { get; set; }
        public string Cobertura { get; set; }
        public int IdRepresentante { get; set; }
        public string NombreRepresentante { get; set; }
        public string CargoRepresentante { get; set; }
        public string FechaFidelizacion { get; set; }
        public List<ResultadoGestion> ResultadosGestion { get; set; }
        public List<Ambito> Ambitos { get; set; }

    }

    public class ResultadoGestion
    {
        public int id { get; set; }
        public string tipo { get; set; }
        public string fecha { get; set; }
        public string contenido { get; set; }
    }

    public class Ambito
    {
        public int id { get; set; }
        public string valor { get; set; }
    }
}
