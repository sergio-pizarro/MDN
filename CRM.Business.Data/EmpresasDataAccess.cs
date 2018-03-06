using System;
using System.Collections.Generic;
using System.Data;
using CRM.Business.Entity;
using CDK.Data;
using CDK.Integration;

namespace CRM.Business.Data
{
    public class EmpresasDataAccess
    {
        
        

        private static EmpresaEntity ContructorEntidad(DataRow row)
        {
            return new EmpresaEntity
            {
                EmpresaRut = row["RutEmpresa"] != DBNull.Value ? Convert.ToInt32(row["RutEmpresa"]) : 0,
                EmpresaDV = row["DvEmpresa"] != DBNull.Value ? row["DvEmpresa"].ToString() : string.Empty,
                EmpresaNombre = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                Holding = row["NombreHolding"] != DBNull.Value ? row["NombreHolding"].ToString() : string.Empty,
            };
        }
    }
}
