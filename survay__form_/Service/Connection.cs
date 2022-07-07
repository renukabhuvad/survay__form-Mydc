using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace survay__form_.Service
{
    public class Connection
    {
        public static IDbConnection OpenConnection => GetConnection();
        public static IDbConnection AgentConnection => GetAgentConnection();
        public static IDbConnection GetConnection()
        {
            string txtpath = ConfigurationManager.AppSettings["connectionfile"].ToString();

            string connectString = "";
            try
            {
                if (File.Exists(txtpath))
                {
                    string[] lines = File.ReadAllLines(txtpath);
                    return new NpgsqlConnection(lines[0].Replace("\"", ""));

                }
            }
            catch (Exception ex)
            {
                return new NpgsqlConnection("");
            }
            return new NpgsqlConnection("");
        }
        public static IDbConnection GetAgentConnection(string currentstring = "")
        {
            try
            {
                string txtpath = ConfigurationManager.AppSettings["connectionfile"].ToString();

                string connectString = "";
                if (File.Exists(txtpath))
                {
                    string[] lines = File.ReadAllLines(txtpath);
                    return new NpgsqlConnection(lines[1].Replace("\"", ""));


                }
            }
            catch (Exception ex)
            {
                return new NpgsqlConnection("");
            }
            return new NpgsqlConnection("");
        }
    }
}