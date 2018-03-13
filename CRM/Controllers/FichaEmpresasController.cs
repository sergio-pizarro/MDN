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
    
    [RoutePrefix("api/FichaEmpresas")]
    public class FichaEmpresasController : ApiController
    {

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-empresas")]
        public List<EncabezadoEntity> ListarEmpresas()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s=>s.Name == "Oficina").Value );
            return EncabezadoDataAccess.ObtenerEntidades().FindAll(e => e.cod_sucursal == codOficina).Select(d => new EncabezadoEntity { rut_empresa = d.rut_empresa, nombre_empresa = d.nombre_empresa }).Distinct().ToList();
        }

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-fichas")]
        public List<EncabezadoEntity> ListarFichas(string rut)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return EncabezadoDataAccess.ObtenerEntidades().FindAll(e => e.cod_sucursal == codOficina && e.rut_empresa == rut);
        }

        [HttpGet]
        [Route("empresa-ficha-data")]
        public ContenedorData EmpresaData(int id)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);

            EncabezadoEntity ee = EncabezadoDataAccess.ObtenerPorID(id);

            List<DesarrolloEntity> recorrwer = DesarrolloDataAccess.ObtenerEntidades().FindAll(x => x.encabezado_id == ee.enc_id);

            List<ContenedorRespuestas> lasres = new List<ContenedorRespuestas>();

            recorrwer.ForEach(d =>
            {
                ContenedorRespuestas inserta = new ContenedorRespuestas();
                inserta.desarrollo = d;
                inserta.respuesta = RespuestaDataAccess.ObtenerPorID(d.respuesta_id);
                lasres.Add(inserta);
            });

            return new ContenedorData
            {
                encabezado = ee,
                respuestas = lasres,
                director = ContactoDataAccess.ObtenerEntidades().Find(z=>z.encabezado_id == ee.enc_id && z.tipo == "DIRECTOR_EJECUTIVO"),
                personalidad = ContactoDataAccess.ObtenerEntidades().Find(z => z.encabezado_id == ee.enc_id && z.tipo == "PERSONALIDAD_JURIDICA")
            };  
        }




        //[AuthorizationRequired]
        [HttpPost]
        [Route("guardar-formulario")]
        public ResultadoBase GuardarFomulario(webFRM entrada)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();

                EncabezadoEntity enx = EncabezadoDataAccess.ObtenerEntidades().Find(e => e.rut_empresa == entrada.encabezado.rut_empresa && e.cod_sucursal == entrada.sucursal);

                enx.estamento = entrada.encabezado.estamento_empresa;
                enx.cantidad_empleados = Convert.ToInt32(entrada.encabezado.numero_empleados_empresa);
                enx.nombre_funcionario = entrada.encabezado.nombre_funcionario;
                enx.cargo_funcionario = entrada.encabezado.cargo_funcionario;

                EncabezadoDataAccess.Guardar(enx);



                if (entrada.personalidad.nombre_persona_juridica != null)
                {
                    
                    DesarrolloEntity datosperjuridica = DesarrolloDataAccess.ObtenerEntidades().Find(f => f.encabezado_id == enx.enc_id && f.respuesta_id == 20);

                    if (datosperjuridica == null)
                        datosperjuridica = new DesarrolloEntity();

                    datosperjuridica.encabezado_id = enx.enc_id;
                    datosperjuridica.respuesta_id = 20;
                    DesarrolloDataAccess.Guardar(datosperjuridica);

                    ContactoEntity perjur = ContactoDataAccess.ObtenerEntidades().Find(d => d.encabezado_id == enx.enc_id && d.tipo == "PERSONALIDAD_JURIDICA");

                    if(perjur == null)
                        perjur = new ContactoEntity();


                    perjur.encabezado_id = enx.enc_id;
                    perjur.nombre = entrada.personalidad.nombre_persona_juridica;
                    perjur.direccion = entrada.personalidad.direccion_persona_juridica;
                    perjur.email = entrada.personalidad.email_persona_juridica;
                    perjur.telefono = Convert.ToInt32(entrada.personalidad.telefono_persona_juridica);
                    perjur.compromisos = entrada.personalidad.compromisos_persona_juridica;
                    perjur.tipo = "PERSONALIDAD_JURIDICA";
                    
                    ContactoDataAccess.Guardar(perjur);
                }

                if (entrada.director.nombre_director_ejecutivo != null)
                {

                    DesarrolloEntity datosdirector = DesarrolloDataAccess.ObtenerEntidades().Find(f => f.encabezado_id == enx.enc_id && f.respuesta_id == 17);

                    if (datosdirector == null)
                        datosdirector = new DesarrolloEntity();


                    datosdirector.encabezado_id = enx.enc_id;
                    datosdirector.respuesta_id = 17;
                    DesarrolloDataAccess.Guardar(datosdirector);


                    ContactoEntity direc = ContactoDataAccess.ObtenerEntidades().Find(d => d.encabezado_id == enx.enc_id && d.tipo == "DIRECTOR_EJECUTIVO");

                    if(direc == null)
                        direc = new ContactoEntity();


                    direc.encabezado_id = enx.enc_id;
                    direc.nombre = entrada.director.nombre_director_ejecutivo;
                    direc.direccion = entrada.director.direccion_director_ejecutivo;
                    direc.email = entrada.director.email_director_ejecutivo;
                    direc.telefono = Convert.ToInt32(entrada.director.telefono_director_ejecutivo);
                    direc.tipo = "DIRECTOR_EJECUTIVO";
                    
                    ContactoDataAccess.Guardar(direc);
                }

                if(entrada.desvinculacion.cantidad_desvinculacion != null)
                {
                    RespuestaEntity rvl = RespuestaDataAccess.ObtenerEntidades().Find(x => x.pregunta_id == 15 && x.nuberespuesta_id == Convert.ToInt32(entrada.desvinculacion.tipo_conteo_desvinculacion));
                    DesarrolloEntity desarrolloFormulario = DesarrolloDataAccess.ObtenerEntidades().Find(y => y.encabezado_id == enx.enc_id && (y.respuesta_id == 26 || y.respuesta_id == 27));

                    if (desarrolloFormulario == null)
                    {
                        desarrolloFormulario = new DesarrolloEntity();
                    }
                    desarrolloFormulario.encabezado_id = enx.enc_id;
                    desarrolloFormulario.respuesta_id = rvl.resp_id;
                    desarrolloFormulario.texto = entrada.desvinculacion.cantidad_desvinculacion;
                    DesarrolloDataAccess.Guardar(desarrolloFormulario);
                }

                entrada.data.ToList().ForEach(v =>
                {

                    if (v.valor != null)
                    {
                        RespuestaEntity resval = new RespuestaEntity();
                        string texti = "";
                        if (v.tipo == "texto")
                        {
                            resval = RespuestaDataAccess.ObtenerEntidades().Find(x => x.pregunta_id == v.id && x.nuberespuesta_id == 1);
                            texti = v.valor;
                        }
                        else
                        {
                            resval = RespuestaDataAccess.ObtenerEntidades().Find(x => x.pregunta_id == v.id && x.nuberespuesta_id.ToString() == v.valor);
                        }
                        DesarrolloEntity desarrolloFormulario = DesarrolloDataAccess.ObtenerEntidades().Find(y => y.encabezado_id == enx.enc_id && y.respuesta_id == resval.resp_id);

                        if (desarrolloFormulario == null)
                        {
                            desarrolloFormulario = new DesarrolloEntity();
                        }

                        desarrolloFormulario.encabezado_id = enx.enc_id;
                        desarrolloFormulario.respuesta_id = resval.resp_id;
                        desarrolloFormulario.texto = texti;

                        DesarrolloDataAccess.Guardar(desarrolloFormulario);

                    }
                });

                return new ResultadoBase() { Estado = "OK", Mensaje = "OK", Objeto = entrada };

            }catch(Exception ex) {

                return new ResultadoBase() { Estado = "Error", Mensaje = "Error", Objeto = ex };
            }
        }

    }








    //Auxiliares
    public class ContenedorData
    {
        public EncabezadoEntity encabezado { get; set; }
        public List<ContenedorRespuestas> respuestas { get; set; }
        public ContactoEntity personalidad { get; set; }
        public ContactoEntity director { get; set; }
    }

    public class ContenedorRespuestas
    {
        public DesarrolloEntity desarrollo { get; set; }
        public RespuestaEntity respuesta { get; set; }
    }

    public class webFRM
    {
        public int sucursal { get; set; }
        public encabezao encabezado { get; set; }
        public directorEjecutivo director { get; set; }
        public personalidadJuridica personalidad { get; set; }
        public desvinculation desvinculacion { get; set; }
        public vluz[] data { get; set; }
    }

    public class vluz
    {
        public int id { get; set; }
        public string valor { get; set; }
        public string tipo { get; set; }
    }

    public class encabezao
    {
        public string rut_empresa { get; set; }
        public string nombre_empresa { get; set; }
        public string sucursal_empresa { get; set; }
        public string estamento_empresa { get; set; }
        public string nombre_funcionario { get; set; }
        public string cargo_funcionario { get; set; }
        public string numero_empleados_empresa { get; set; }
    }

    public class directorEjecutivo
    {
        public string nombre_director_ejecutivo { get; set; }
        public string telefono_director_ejecutivo { get; set; }
        public string email_director_ejecutivo { get; set; }
        public string direccion_director_ejecutivo { get; set; }
    }

    public class personalidadJuridica
    {
        public string nombre_persona_juridica { get; set; }
        public string telefono_persona_juridica { get; set; }
        public string email_persona_juridica { get; set; }
        public string direccion_persona_juridica { get; set; }
        public string compromisos_persona_juridica { get; set; }
    }

    public class desvinculation
    {
        public string cantidad_desvinculacion { get; set; }
        public string tipo_conteo_desvinculacion { get; set; }
    }
}
