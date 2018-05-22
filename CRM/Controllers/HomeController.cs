using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RestSharp;
using System.Configuration;
using System.ServiceModel;
using System.ServiceModel.Channels;

namespace CRM.Controllers
{
    public class HomeController : Controller
    {
        private string baseUrl = ConfigurationManager.AppSettings["ServidorApi"];
        public ActionResult Index()
        {
            if (Request.Browser.Type.ToUpper().Contains("IE"))
            {
                return View();
            }
            else
            {
                return Redirect("/motor/Home/Acceso");
            }
        }

        public ActionResult Acceso(string RutEjecutivo, string ClaveEjecutivo)
        {
            if (!Request.Browser.Type.ToUpper().Contains("IE"))
            {
                if (RutEjecutivo != null)
                {
                    AutenticarLdapService.AutenticarLdapDelegateClient ServicioAuth = new AutenticarLdapService.AutenticarLdapDelegateClient();
                    ServicioAuth.ClientCredentials.UserName.UserName = "SOAPCES";
                    ServicioAuth.ClientCredentials.UserName.Password = "r{91u5#0T.k2)9Y";

                    AutenticarLdapService.entradaAutenticarLdap usrData = new AutenticarLdapService.entradaAutenticarLdap()
                    {
                        usuario = RutEjecutivo,
                        password = ClaveEjecutivo
                    };
                    AutenticarLdapService.autenticacionLDAP RespuestaAuth;
                    using (new OperationContextScope(ServicioAuth.InnerChannel))
                    {
                        // Add a HTTP Header to an outgoing request
                        string auth = "Basic " + Convert.ToBase64String(System.Text.Encoding.Default.GetBytes(ServicioAuth.ClientCredentials.UserName.UserName + ":" + ServicioAuth.ClientCredentials.UserName.Password));
                        HttpRequestMessageProperty requestMessage = new HttpRequestMessageProperty();
                        requestMessage.Headers["Authorization"] = auth;
                        OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;
                        RespuestaAuth = ServicioAuth.autenticarUsuario(usrData);
                    }

                    if (RespuestaAuth.log.codRespuesta.Equals("3"))
                    {
                        var client = new RestClient(baseUrl + "/motor/api");
                        var request = new RestRequest("Auth/authenticate", Method.GET);
                        request.AddQueryParameter("re", RutEjecutivo);
                        IRestResponse response = client.Execute(request);

                        //Response.Headers.Add("Token", response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString()); 
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            System.Web.HttpCookie myCookie = new System.Web.HttpCookie("Token");
                            myCookie.Value = response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString();
                            myCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(myCookie);


                            System.Web.HttpCookie usuarioCookie = new System.Web.HttpCookie("Usuario");
                            usuarioCookie.Value = response.Headers.Where(x => x.Name == "Uname").FirstOrDefault().Value.ToString();
                            usuarioCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(usuarioCookie);

                            System.Web.HttpCookie cargoCookie = new System.Web.HttpCookie("Cargo");
                            cargoCookie.Value = response.Headers.Where(x => x.Name == "Cargo").FirstOrDefault().Value.ToString();
                            cargoCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(cargoCookie);


                            System.Web.HttpCookie notiniCookie = new System.Web.HttpCookie("Noticia");
                            notiniCookie.Value = response.Headers.Where(x => x.Name == "Noticia").FirstOrDefault().Value.ToString();
                            notiniCookie.Expires = DateTime.Now.AddDays(1);
                            Response.Cookies.Add(notiniCookie);

                            System.Web.HttpCookie ofiCookie = new System.Web.HttpCookie("Oficina");
                            ofiCookie.Value = response.Headers.Where(x => x.Name == "Oficina").FirstOrDefault().Value.ToString();
                            ofiCookie.Expires = DateTime.Now.AddDays(1);
                            Response.Cookies.Add(ofiCookie);



                            int install = Convert.ToInt32(response.Headers.Where(x => x.Name == "Instalar").FirstOrDefault().Value.ToString());
                            int multi = Convert.ToInt32(response.Headers.Where(x => x.Name == "Multi").FirstOrDefault().Value.ToString());

                            if (install > 0)
                            {
                                return Redirect("../Home/Instalador?i=" + install.ToString());
                            }

                            else
                            {

                                if (multi > 1)
                                {
                                    ViewBag.Modo = "MULTISELECT";
                                    ViewBag.Logins = CRM.Business.Data.DotacionDataAccess.MultiLoginByRut(RutEjecutivo);
                                    return View();
                                }
                                else
                                {
                                    return Redirect(response.Headers.Where(x => x.Name == "Location").FirstOrDefault().Value.ToString());
                                }
                            }
                        }
                        else
                        {
                            ViewBag.CodError = "NO_EJEC";
                            return View();
                        }
                    }
                    else
                    {
                        var client = new RestClient(baseUrl + "/motor/api");
                        var request = new RestRequest("Auth/v2/authenticate", Method.POST);
                        request.AddParameter("Cuenta", RutEjecutivo);
                        request.AddParameter("Clave", ClaveEjecutivo);
                        IRestResponse response = client.Execute(request);

                        //Response.Headers.Add("Token", response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString()); 
                        if (response.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            System.Web.HttpCookie myCookie = new System.Web.HttpCookie("Token");
                            myCookie.Value = response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString();
                            myCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(myCookie);


                            System.Web.HttpCookie usuarioCookie = new System.Web.HttpCookie("Usuario");
                            usuarioCookie.Value = response.Headers.Where(x => x.Name == "Uname").FirstOrDefault().Value.ToString();
                            usuarioCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(usuarioCookie);

                            System.Web.HttpCookie cargoCookie = new System.Web.HttpCookie("Cargo");
                            cargoCookie.Value = response.Headers.Where(x => x.Name == "Cargo").FirstOrDefault().Value.ToString();
                            cargoCookie.Expires = DateTime.Now.AddDays(5);
                            Response.Cookies.Add(cargoCookie);


                            System.Web.HttpCookie notiniCookie = new System.Web.HttpCookie("Noticia");
                            notiniCookie.Value = response.Headers.Where(x => x.Name == "Noticia").FirstOrDefault().Value.ToString();
                            notiniCookie.Expires = DateTime.Now.AddDays(1);
                            Response.Cookies.Add(notiniCookie);

                            System.Web.HttpCookie ofiCookie = new System.Web.HttpCookie("Oficina");
                            ofiCookie.Value = response.Headers.Where(x => x.Name == "Oficina").FirstOrDefault().Value.ToString();
                            ofiCookie.Expires = DateTime.Now.AddDays(1);
                            Response.Cookies.Add(ofiCookie);

                            int multi = Convert.ToInt32(response.Headers.Where(x => x.Name == "Multi").FirstOrDefault().Value.ToString());

                            if (multi > 1)
                            {
                                ViewBag.Modo = "MULTISELECT";
                                ViewBag.Logins = CRM.Business.Data.DotacionDataAccess.MultiLoginByRut(RutEjecutivo);
                                return View();
                            }
                            else
                            {
                                return Redirect(response.Headers.Where(x => x.Name == "Location").FirstOrDefault().Value.ToString());
                            }
                        }
                        else
                        {
                            ViewBag.CodError = "NO_EJEC";
                            return View();
                        }
                    }
                }
                else
                {
                    return View();
                }
            }
            else
            {
                return new RedirectResult("/motor/Home/");
            }
        }

        public ActionResult AccesoAdmin(string RE)
        {
            if (RE != null)
            {
                var client = new RestClient(baseUrl + "/motor/api");
                var request = new RestRequest("Auth/authenticate", Method.GET);
                request.AddQueryParameter("re", RE);
                IRestResponse response = client.Execute(request);

                //Response.Headers.Add("Token", response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString()); 
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    System.Web.HttpCookie myCookie = new System.Web.HttpCookie("Token");
                    myCookie.Value = response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString();
                    myCookie.Expires = DateTime.Now.AddDays(5);
                    Response.Cookies.Add(myCookie);


                    System.Web.HttpCookie usuarioCookie = new System.Web.HttpCookie("Usuario");
                    usuarioCookie.Value = response.Headers.Where(x => x.Name == "Uname").FirstOrDefault().Value.ToString();
                    usuarioCookie.Expires = DateTime.Now.AddDays(5);
                    Response.Cookies.Add(usuarioCookie);

                    System.Web.HttpCookie cargoCookie = new System.Web.HttpCookie("Cargo");
                    cargoCookie.Value = response.Headers.Where(x => x.Name == "Cargo").FirstOrDefault().Value.ToString();
                    cargoCookie.Expires = DateTime.Now.AddDays(5);
                    Response.Cookies.Add(cargoCookie);

                    System.Web.HttpCookie notiniCookie = new System.Web.HttpCookie("Noticia");
                    notiniCookie.Value = response.Headers.Where(x => x.Name == "Noticia").FirstOrDefault().Value.ToString();
                    notiniCookie.Expires = DateTime.Now.AddDays(1);
                    Response.Cookies.Add(notiniCookie);


                    System.Web.HttpCookie ofiCookie = new System.Web.HttpCookie("Oficina");
                    ofiCookie.Value = response.Headers.Where(x => x.Name == "Oficina").FirstOrDefault().Value.ToString();
                    ofiCookie.Expires = DateTime.Now.AddDays(1);
                    Response.Cookies.Add(ofiCookie);

                    int install = Convert.ToInt32(response.Headers.Where(x => x.Name == "Instalar").FirstOrDefault().Value.ToString());
                    int multi = Convert.ToInt32(response.Headers.Where(x => x.Name == "Multi").FirstOrDefault().Value.ToString());

                    if (install > 0)
                    {
                        return Redirect("../Home/Instalador?i=" + install.ToString());
                    }

                    else
                    {
                        if (multi > 1)
                        {
                            ViewBag.Modo = "MULTISELECT";
                            ViewBag.Logins = CRM.Business.Data.DotacionDataAccess.MultiLoginByRut(RE);
                            return View("Acceso");
                        }
                        else
                        {
                            return Redirect(response.Headers.Where(x => x.Name == "Location").FirstOrDefault().Value.ToString());
                        }
                    }
                }

                return Redirect("/motor/home/Acceso");
            }
            else
            {
                return View();
            }
        }

        public RedirectResult AccesoAdminInforme(string RE)
        {
            var client = new RestClient(baseUrl + "/motor/api");
            var request = new RestRequest("Auth/authenticate", Method.GET);
            request.AddQueryParameter("re", RE);
            IRestResponse response = client.Execute(request);

            //Response.Headers.Add("Token", response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString()); 
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                System.Web.HttpCookie myCookie = new System.Web.HttpCookie("Token");
                myCookie.Value = response.Headers.Where(x => x.Name == "Token").FirstOrDefault().Value.ToString();
                myCookie.Expires = DateTime.Now.AddDays(5);
                Response.Cookies.Add(myCookie);


                System.Web.HttpCookie usuarioCookie = new System.Web.HttpCookie("Usuario");
                usuarioCookie.Value = response.Headers.Where(x => x.Name == "Uname").FirstOrDefault().Value.ToString();
                usuarioCookie.Expires = DateTime.Now.AddDays(5);
                Response.Cookies.Add(usuarioCookie);


                System.Web.HttpCookie cargoCookie = new System.Web.HttpCookie("Cargo");
                cargoCookie.Value = response.Headers.Where(x => x.Name == "Cargo").FirstOrDefault().Value.ToString();
                cargoCookie.Expires = DateTime.Now.AddDays(5);
                Response.Cookies.Add(cargoCookie);


                System.Web.HttpCookie notiniCookie = new System.Web.HttpCookie("Noticia");
                notiniCookie.Value = response.Headers.Where(x => x.Name == "Noticia").FirstOrDefault().Value.ToString();
                notiniCookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(notiniCookie);


                System.Web.HttpCookie ofiCookie = new System.Web.HttpCookie("Oficina");
                ofiCookie.Value = response.Headers.Where(x => x.Name == "Oficina").FirstOrDefault().Value.ToString();
                ofiCookie.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Add(ofiCookie);

                return Redirect(baseUrl + "/motor/App/Informes");
            }

            return Redirect("/motor/home/Acceso");
        }

        public ActionResult Instalador()
        {
            return View();
        }
    }
}
