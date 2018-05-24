using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;

namespace CRM.Controllers
{
    [RoutePrefix("api/stage/call-center")]
    public class CallCenterController : ApiController
    {
        [HttpGet]
        [Route("afiliado-search/{AfiliadoRut}")]
        public AsignacionCallBase AfiliadoServiceData(string AfiliadoRut)
        {
            int periodo = Convert.ToInt32(DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2,'0'));
            var AsgDataBrut = AsignacionDataAccess.ListarByAfiRut(periodo, AfiliadoRut).Where(asg => asg.TipoAsignacion == 5 || asg.TipoAsignacion == 1).FirstOrDefault();
            List<ContactoafiliadoEntity> telefonos = ContactoafiliadoDataAccess.ObtenerPorRutAfiliadoYTipo(Convert.ToInt32(AsgDataBrut.Afiliado_Rut), "TELEFONO");
            telefonos.AddRange(ContactoafiliadoDataAccess.ObtenerPorRutAfiliadoYTipo(Convert.ToInt32(AsgDataBrut.Afiliado_Rut), "CELULAR"));

            return new AsignacionCallBase
            {
                Asignacion = AsgDataBrut.id_Asign,
                Afiliado = new AfiliadoCallBase
                {
                    Rut = AsgDataBrut.Afiliado_Rut + "-" + AsgDataBrut.Afiliado_Dv,
                    Nombres = AsgDataBrut.Nombre + " " + AsgDataBrut.Apellido,
                    Segmento = AsgDataBrut.Segmento,
                    ClaveRut = AsgDataBrut.Afiliado_Rut.ToString()
                },
                Empresa = new EmpresaCallBase
                {
                    Rut = AsgDataBrut.Empresa_Rut + "-" + AsgDataBrut.Empresa_Dv,
                    RazonSocial = AsgDataBrut.Empresa
                },
                OficinaAsinacion = SucursalDataAccess.ObtenerSucursal(AsgDataBrut.Oficina).Nombre,
                PreAprobado = AsgDataBrut.PreAprobadoFinal,
                Fonos = telefonos
            };
        }

        [HttpGet]
        [Route("estados")]
        public IEnumerable<EstadoCallBase> EstadosServiceData()
        {
            List<EstadoCallBase> retorno = new List<EstadoCallBase>();
            
            List<EstadogestionEntity> dataList = EstadosyTiposDataAccess.ListarEstadosGestion();
            dataList.Where(x => x.ejes_id_padre == 0 && x.ejes_tipo_campagna == 5).ToList().ForEach(eg => {
                EstadoCallBase ecb = new EstadoCallBase
                {
                    EstadoId = eg.eges_id,
                    Nombre = eg.eges_nombre,
                    Hijos = ListarHijos(eg.eges_id)
                };
                retorno.Add(ecb);
            });
            
            return retorno;
        }

        private List<EstadoCallBase> ListarHijos(int idPadre)
        {
            List<EstadoCallBase> retorno = new List<EstadoCallBase>();
            List<EstadogestionEntity> dataList = EstadosyTiposDataAccess.ListarEstadosGestion();

            if (idPadre != 70)
            {
                dataList.Where(x => x.ejes_id_padre == idPadre && x.ejes_tipo_campagna == 5).ToList().ForEach(eg =>
                {
                    EstadoCallBase ecb = new EstadoCallBase
                    {
                        EstadoId = eg.eges_id,
                        Nombre = eg.eges_nombre
                    };
                    retorno.Add(ecb);
                });
            }
            else
            {
                SucursalDataAccess.ListarSucursales().Where(d=>d.Id!=0).ToList().ForEach(s => {
                    EstadoCallBase ecb = new EstadoCallBase
                    {
                        EstadoId = s.Id,
                        Nombre = s.Nombre
                    };
                    retorno.Add(ecb);
                });
            }

            return retorno;
        }

        [HttpGet]
        [Route("oficinas")]
        public IEnumerable<OficinaCallBase> OficinasServiceData()
        {
            List<OficinaCallBase> retorno = new List<OficinaCallBase>();

            SucursalDataAccess.ListarSucursales().Where(d => d.Id != 0).ToList().ForEach(s => {
                OficinaCallBase ecb = new OficinaCallBase
                {
                    Id = s.Id,
                    Nombre = s.Nombre
                };
                retorno.Add(ecb);
            });


            return retorno;
        }

        [HttpOptions, HttpPost]
        [Route("registrar-gestion")]
        public ResultadoBase GuardarGestionService(WebGestionCall entrada)
        {
            string prefijo_numero = "56";
            if (entrada == null)
            {
                return new ResultadoBase
                {
                    Estado = "ESPERA",
                    Mensaje = "RECONOCIENDO SERVER",
                    Objeto = entrada
                };
            }
            else
            {
                GestionEntity oSv = new GestionEntity();
                oSv.IdBaseCampagna = entrada.Asignacion;
                oSv.IdEstado = 701;
                oSv.IdOficina = "555";
                oSv.Descripcion = entrada.Comentarios;
                oSv.FechaAccion = DateTime.Now;
                oSv.FechaCompromete = entrada.FechaProxGestion != null && entrada.FechaProxGestion != "" ? Convert.ToDateTime(entrada.FechaProxGestion) : Convert.ToDateTime("1/1/1753 12:00:00");
                oSv.RutEjecutivo = entrada.RutEjecutivo;
                GestionDataAccess.Guardar(oSv);
                AsignacionDataAccess.AsignarOficina(entrada.Asignacion, entrada.Oficina);


                AsignacionEntity asg = AsignacionDataAccess.ObtenerPorID(entrada.Asignacion);
                PreferenciaAfiliadoEntity pa = new PreferenciaAfiliadoEntity()
                {
                    Afiliado_rut = (int)asg.Afiliado_Rut,
                    Fecha_accion = DateTime.Now,
                    Tipo_preferencia = "HORARIO",
                    Valida = true,
                    Valor_preferencia = entrada.HorarioPreferencia
                };

                PreferenciaAfiliadoDataAccess.Guardar(pa);

                if(entrada.FonoContact != "OTR")
                {
                    var contc = ContactoafiliadoDataAccess.Obtener(Convert.ToInt32(entrada.RutAfiliado), entrada.FonoContact.Replace("+",string.Empty));
                    ContactoafiliadoDataAccess.Guardar(contc);
                }
                else
                {
                    //si no se valida dispara exception
                    int validaFono = Convert.ToInt32(entrada.NuevoFono);

                    ContactoafiliadoEntity cn = new ContactoafiliadoEntity
                    {
                        Afiliado_rut = Convert.ToInt32(entrada.RutAfiliado),
                        Fecha_accion = DateTime.Now,
                        Fecha_contacto = DateTime.Now,
                        Tipo_contacto = "CELULAR",
                        Valido = 1,
                        Valor_contacto = prefijo_numero + entrada.NuevoFono
                    };
                    ContactoafiliadoDataAccess.Guardar(cn);
                }
                    
                return new ResultadoBase
                {
                    Estado = "OK",
                    Mensaje = "Guardado con Exito",
                    Objeto = entrada
                };
                
            }
            
        }

    }
}
