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
    
    [RoutePrefix("api/FichaEmpresas")]
    public class FichaEmpresasController : ApiController
    {


        //[AuthorizationRequired]
        [HttpPost]
        [Route("guardar-formulario")]
        public ResultadoBase GuardarFomulario(webFRM entrada)
        {
            
            
            if(entrada.personalidad.nombre_persona_juridica != null)
            {
                DesarrolloEntity datosperjuridica = new DesarrolloEntity();
                datosperjuridica.encabezado_id = 1;
                datosperjuridica.respuesta_id = 20;
                DesarrolloDataAccess.Guardar(datosperjuridica);

                ContactoEntity perjur = new ContactoEntity()
                {
                    pregunta_id = 11,
                    nombre = entrada.personalidad.nombre_persona_juridica,
                    direccion = entrada.personalidad.direccion_persona_juridica,
                    email = entrada.personalidad.email_persona_juridica,
                    telefono = Convert.ToInt32(entrada.personalidad.telefono_persona_juridica),
                    compromisos = entrada.personalidad.compromisos_persona_juridica
                };
                ContactoDataAccess.Guardar(perjur);
            }

            if(entrada.director.nombre_director_ejecutivo != null)
            {
                DesarrolloEntity datosdirector = new DesarrolloEntity();
                datosdirector.encabezado_id = 1;
                datosdirector.respuesta_id = 17;
                DesarrolloDataAccess.Guardar(datosdirector);

                ContactoEntity direc = new ContactoEntity()
                {
                    pregunta_id = 9,
                    nombre = entrada.director.nombre_director_ejecutivo,
                    direccion = entrada.director.direccion_director_ejecutivo,
                    email = entrada.director.email_director_ejecutivo,
                    telefono = Convert.ToInt32(entrada.director.telefono_director_ejecutivo),
                };
                ContactoDataAccess.Guardar(direc);
            }
             
            entrada.data.ToList().ForEach(v => {

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
                    DesarrolloEntity desarrolloFormulario = DesarrolloDataAccess.ObtenerEntidades().Find(y => y.encabezado_id == 1 && y.respuesta_id == resval.resp_id);
                    
                    if (desarrolloFormulario == null)
                    {
                        desarrolloFormulario = new DesarrolloEntity();
                    }
                    
                    desarrolloFormulario.encabezado_id = 1;
                    desarrolloFormulario.respuesta_id = resval.resp_id;
                    desarrolloFormulario.texto = texti;

                    DesarrolloDataAccess.Guardar(desarrolloFormulario);

                }
            });

            return new ResultadoBase() { Estado = "OK", Mensaje = "OK", Objeto= entrada };
        }

    }


    //Auxiliares
    public class webFRM
    {
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
