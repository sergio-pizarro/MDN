﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class PensionadosEntity
    {
        public string RUTPEN { get; set; }
        public string NOMBREPEN { get; set; }
        public int FECNAC { get; set; }
        public string CALLE { get; set; }
        public int NUMERO { get; set; }
        public string RESTO_DIRECCION { get; set; }
        public string COMUNA { get; set; }
        public string CIUDAD { get; set; }
        public string REGION { get; set; }
        public string FONOPARTICULAR { get; set; }
        public string FONOCELULAR { get; set; }
        public string EMAIL { get; set; }
        public string PRIORIDAD { get; set; }
        public int PREAPROBADO { get; set; }
        public string CODOFICINA { get; set; }
        public string RUTEJECUTIVO { get; set; }
        public string PERCAMPAÑA { get; set; }
        public int id_Asign { get; set; }
        public int ESTADO_GESTION { get; set; }
        public string NOM_GESTION { get; set; }
    }

    public class EjecutivoPensionadosEntity
    {
        public string Rut { get; set; }
        public string Nombre { get; set; }
        public int Cod_Sucursal { get; set; }
    }


    public class AsigPensionadosEntity
    {
        public string Token { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int id_Asign { get; set; }
    }

    public class BuscaPensionadosEntity
    {
        public string NombrePensionado { get; set; }
        public int FonoParticular { get; set; }
        public int FonoCelular { get; set; }
        public string Direccion { get; set; }
        public int N_direccion { get; set; }
        public string Comuna { get; set; }
        public int id_Asign { get; set; }
        public string Mail { get; set; }
        public string codigo { get; set; }
    }

    public class EstadoGestionPensionadoEntity
    {
        public int eges_id { get; set; }
        public string eges_nombre { get; set; }
        public int ejes_id_padre { get; set; }
        public string ejes_terminal { get; set; }
        public int ejes_tipo_campagna { get; set; }
    }

    public class WebContactoPensionados
    {
        public int con_contacto_uid { get; set; }
        public string con_contacto { get; set; }
        public int con_forma_contacto { get; set; }
        public int con_no_contacto_fono { get; set; }
        public int con_no_contacto_domicilo { get; set; }
        public string con_no_observacion_contacto { get; set; }
        public string con_ejecutivo_rut { get; set; }
        public string con_oficina { get; set; }
        public int estado_gestion { get; set; }
    }

    public class WebGestionPensionados
    {
        public int ges_bcam_uid { get; set; }
        public string ges_estado_gst { get; set; }
        public string ges_sub_estado_gst { get; set; }
        public string ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string ges_ejecutivo_rut { get; set; }
        public string ges_oficina { get; set; }
        public string[] tags_conforme { get; set; }
        public string[] tags_noQuiere { get; set; }

    }

    public class TagGestionPensionados
    {
        public int gesTag_id { get; set; }
        public int gesTag_gestion { get; set; }
    }

    public class GestionPensionados
    {
        public int ges_bcam_uid { get; set; }
        public string ges_estado_gst { get; set; }
        public string ges_sub_estado_gst { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string ges_ejecutivo_rut { get; set; }
        public string ges_oficina { get; set; }
        public int estado_gestion { get; set; }

    }

    //public class WebBasePensionadosContacto
    //{
    //    public WebContactoPensionados contacto { get; set; }
    //    public WebGestionPensionados gestion { get; set; }
    //}

    public class WebHistorialGesPensionados
    {
        public int ges_bcam_uid { get; set; }
        public DateTime ges_fecha_accion { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string estado { get; set; }
        public string subEstado { get; set; }
        public string Ejecutivo { get; set; }
    }


    public class WebUltimaGesPensionados
    {
        public int ges_estado_gst { get; set; }
        public int ges_sub_estado_gst { get; set; }
        public string eges_nombre { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public DateTime ges_fecha_accion { get; set; }
        public int ges_id { get; set; }
        public IEnumerable<TagDto> tags { get; set; }

    }

    public class TagDto
    {
        public int id { get; set; }
        public string nombre { get; set; }

    }

    public class UltimoContactoPensionados
    {
        public string con_contacto { get; set; }
        public int con_forma_contacto { get; set; }
        public int con_no_contacto_fono { get; set; }
        public int con_no_contacto_domicilo { get; set; }
        public string con_no_observacion_contacto { get; set; }
        public string nomContatoSi { get; set; }
        public string nomConFono { get; set; }
        public string nomConDom { get; set; }
    }



    //public class EstadoGestionPensionadoEntity
    //{
    //    public int eges_id { get; set; }
    //    public string eges_nombre { get; set; }
    //    public int ejes_id_padre { get; set; }
    //    public string ejes_terminal { get; set; }
    //    public int ejes_tipo_campagna { get; set; }
    //}



    public class WebPensionadosProspectos
    {
        public string Rut_Pensionado { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Caja_Origen { get; set; }
        public int Renta_Aproximada { get; set; }
        public string Celular { get; set; }
        public string Fono_Fijo { get; set; }
        public string Email { get; set; }
        public string Direccion_Calle { get; set; }
        public int Direccion_Numero { get; set; }
        public string Direccion_Dpto { get; set; }
        public string Comuna { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int Cod_Sucursal { get; set; }

    }

    public class ProspectosPensionados
    {
        public string Rut_Pensionado { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Caja_Origen { get; set; }
        public int Renta_Aproximada { get; set; }
        public string Celular { get; set; }
        public string Fono_Fijo { get; set; }
        public string Email { get; set; }
        public string Direccion_Calle { get; set; }
        public int Direccion_Numero { get; set; }
        public string Direccion_Dpto { get; set; }
        public string Comuna { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int Cod_Sucursal { get; set; }
        public string Nombre_ejecutivo { get; set; }

    }

    public class EstadoNOGestionPensionadoEntity
    {
        public int egesNo_id { get; set; }
        public string egesNo_nombre { get; set; }
        public int ejesNo_id_padre { get; set; }

    }

}
