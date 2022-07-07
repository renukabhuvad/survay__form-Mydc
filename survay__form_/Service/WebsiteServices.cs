using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using survay__form_.Service;
using survay__form_.Models;
using System.Threading.Tasks;
using Npgsql;
using System.Data;
using System.Configuration;
using System.Net.Mail;
using System.Text;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Text.RegularExpressions;
using System.IO;
using survay__form_.Models;
using System.Net;

namespace survay__form_.Service
{
    public class WebsiteServices
    {
        public static string Superadmin = "";
        public static string AgentPanel = "";

        //string DefaultConnection = GetConnectionstring();

        NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        NpgsqlConnection agcon = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);

        private static string GetConnectionstring()
        {

            string txtpath = ConfigurationManager.AppSettings["connectionfile"].ToString();

            string connectString = "";
            try
            {
                if (File.Exists(txtpath))
                {
                    string[] lines = File.ReadAllLines(txtpath);

                    Superadmin = lines[0].Replace("\"", "");
                    AgentPanel = lines[1].Replace("\"", "");
                }
            }
            catch (Exception ex)
            { }

            return connectString;
        }

        //NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);



        //public DataTable Getslider()
        //{
        //    NpgsqlCommand cmd = new NpgsqlCommand("SELECT mapid, slider, customerid, createdon, isself, imagepath FROM public.slidermapping where customerid=2021", agcon);
        //    DataTable dt= new DataTable();
        //    NpgsqlDataAdapter da =new NpgsqlDataAdapter(cmd);
        //    da.Fill(dt);
        //        return dt;
        //}

        public List<Slider> Getslider()
        {
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            var sliderlist = new List<Slider>();
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT mapid, slider, customerid, createdon, isself, imagepath FROM public.slidermapping where customerid=2021 order by mapid desc", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            cmd.CommandTimeout = 18000;
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    sliderlist.Add(new Slider()
                    {
                        imagepath = dt.Rows[i]["imagepath"].ToString(),
                        slider = Convert.ToInt32(dt.Rows[i]["slider"].ToString())
                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return sliderlist;
        }
        public about aboutus()
        {
            about model = new about();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT aboutusid, data, customerid FROM public.aboutus where customerid=2021;", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                model.data = dt.Rows[0]["data"].ToString();
                string result = RemoveAllHTMLTags(model.data).Trim();

                model.subdata = result;
            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return model;
        }
        private static Regex oClearHtmlScript = new Regex(@"<(.|\n)*?>", RegexOptions.Compiled);
        public static string RemoveAllHTMLTags(string sHtml)
        {
            if (string.IsNullOrEmpty(sHtml))
                return string.Empty;

            return oClearHtmlScript.Replace(sHtml, string.Empty);
        }

        public List<Testimonial> Gettestimonial()
        {
            var testimonialList = new List<Testimonial>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT testimonialid, name, imageurl, testimonialdes, customerid, isdelete FROM public.testimonial where customerid=2021 order by testimonialid desc", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    testimonialList.Add(new Testimonial()
                    {
                        imageurl = dt.Rows[i]["imageurl"].ToString(),
                        testimonialdes = dt.Rows[i]["testimonialdes"].ToString(),
                        name = dt.Rows[i]["name"].ToString()
                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return testimonialList;
        }
        public List<Gallery> Getgallery()
        {
            var gallery = new List<Gallery>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT galleryid, imagedesc,imageurl, customerid, imagename FROM public.gallery where customerid=2021 order by galleryid desc limit 4 ", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    gallery.Add(new Gallery()
                    {
                        imageurl = dt.Rows[i]["imageurl"].ToString(),
                        imagedesc = dt.Rows[i]["imagedesc"].ToString()

                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return gallery;
        }

        public List<Gallery> Getallgallery()
        {
            var gallery = new List<Gallery>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT galleryid, imagedesc,imageurl, customerid, imagename FROM public.gallery where customerid=2021 order by galleryid desc", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    gallery.Add(new Gallery()
                    {
                        imageurl = dt.Rows[i]["imageurl"].ToString(),
                        imagedesc = dt.Rows[i]["imagedesc"].ToString()

                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return gallery;
        }

        public List<video> Getvideo()
        {
            var gallery = new List<video>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT customerid, videoid, createdon,(select title from video where videoid=videomapping.videoid) as title,(select videolink from video where videoid=videomapping.videoid) as videolink FROM public.videomapping where customerid=2021 order by videoid desc", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    char[] delimiters = new char[] { '=' };
                    string[] parts = dt.Rows[i]["videolink"].ToString().Split(delimiters,
                                     StringSplitOptions.RemoveEmptyEntries);
                    gallery.Add(new video()
                    {
                        title = dt.Rows[i]["title"].ToString(),
                        videolink = dt.Rows[i]["videolink"].ToString(),
                        linkid = parts[1].ToString()
                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return gallery;
        }

        public List<video> Getallvideo()
        {
            var gallery = new List<video>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT  * from video where  customerid=2021 order by videoid desc", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    char[] delimiters = new char[] { '=' };
                    string[] parts = dt.Rows[i]["videolink"].ToString().Split(delimiters,
                                     StringSplitOptions.RemoveEmptyEntries);
                    gallery.Add(new video()
                    {
                        title = dt.Rows[i]["title"].ToString(),
                        videolink = dt.Rows[i]["videolink"].ToString(),
                        linkid = parts[1].ToString()
                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return gallery;
        }
        public List<News> Getnews()
        {
            var gallery = new List<News>();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from industrynews order by industrynewsid desc limit 10", con);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {

                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {

                    gallery.Add(new News()
                    {
                        industrynewsid = Convert.ToInt32(dt.Rows[i]["industrynewsid"].ToString()),
                        title = dt.Rows[i]["title"].ToString()

                    });

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return gallery;
        }

        public string contact(contact model, string subject)
        {
            try
            {
                if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
                NpgsqlCommand cmd = new NpgsqlCommand("insert into feedback (name,mobileno, emailid, message, customerid, datatype) values ('" + model.name + "','" + model.phone + "','" + model.email + "','" + model.msg + "',"+HttpContext.Current.Session["customerid"].ToString()+",'Feddback')", agcon);
                cmd.ExecuteNonQuery();

                if (con.State == ConnectionState.Closed) { con.Open(); }
                cmd = new NpgsqlCommand("select firbasetoken from devise_info where product_code=102 and cust_id=" + HttpContext.Current.Session["customerid"].ToString() + "", con);
                NpgsqlDataReader rd = cmd.ExecuteReader();
                string fctoken = "";
                if (rd.Read() == true)
                {
                    fctoken = rd["firbasetoken"].ToString();
                }
                rd.Close();
                if (agcon.State == ConnectionState.Open) { agcon.Close(); }
                string body = "<html><body><h2>New Enquiry From User.....</h2><br/><span>Name: " + model.name + "</span><br/><span>Mobile No: " + model.phone + "</span><br/><span>Email Id: " + model.email + "</span><br/><span>Message: " + model.msg + "</span></body></html>";
                SendMail(body, subject, HttpContext.Current.Session["emailid"].ToString(),model.email,model.name);

                if (fctoken != "")
                {
                    Firebase_PushNotification(fctoken, "102", subject, "" + model.name + " Used Retirement Calculator Please check your email For Detailed Information. <br/><br/> Happy Selling !!!", "", "", "", "");
                }

                if (agcon.State == ConnectionState.Open) { agcon.Close(); }
                return ("Success");
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public void Firebase_PushNotification(string Token, string productid, string Title, string Message, string urllink, string action, string hyperlink, string imageurl)
        {

            string FireBaseToken =Token;

            string applicationID;
            string senderId;

            if (productid == "102")
            {
                applicationID = "AAAAymVmQQY:APA91bF30EA_RYD_TM2m6xiXoJgrp27WJCQ0GM5vxW4F89cnQPcSDD4Jh5YuL9oX6r4fgJnN8yQnk4QYW4KGtZw4BNK6ye5KA6aXY8vTwpPI-d4Qao3fMO1NQ8OOcVJKLAyoovkUvJWP";
                senderId = "869284593926";

                //return 'BimaGyan Marketing App New'
            }

            else if (productid == "105")
            {
                applicationID = "AAAAt1jhJOg:APA91bGUedizDlGdGw7FFLja5ooirQ2kYWJLT88N8AUALjZSXBPGDyoD-iGB0eRpd4JbOZMDYVmnAtG8aW0uIvPn2C2kecLbu0eJnoVoeCKp26FwvTQkcMysbKBNAhdvxVQlgJyCwz0W";
                senderId = "787470165224";

                //return 'My Policy'
            }

            else if (productid == "121")
            {
                applicationID = "";
                senderId = "";

                //return 'My Life Advisor'
            }

            else if (productid == "999")
            {
                applicationID = "AAAAtCALJVY:APA91bHL4cTzZmFh9XOPh0vU1H-TK9wGufRxpB4sT9XmbP0lO1JIGZTcUshf50YorLu1B7Xd_bUMeO7nxYFpkjfPQFsVszt4rKMe7xspNNC8kEbDF9xt3Y_B4VP-Bo4fViQUHBxm19gb";
                senderId = "773631714646";

                //return 'ZaidiAdmin'
            }

            else if (productid == "998")
            {
                applicationID = "";
                senderId = "";

                //return 'My Advisor'
            }

            else if (productid == "997")
            {
                applicationID = "";
                senderId = "";

                //return 'My Web'
            }

            else if (productid == "123")
            {
                applicationID = "AAAAaj5GC7Q:APA91bFDTdOtfpGtrySG0pwfnwZDVCNMLdO1hnVZrv0C63IAypnCH7YOW5bfUIrxIYv3BHbUw3nLw8nP9f_B1UKPfHH2ieGWG1IlnFuETYmfD_MpHyvdt7YxAfKppV7kHWU1vl053fdW";
                senderId = "456311311284";

                //return 'My Training App'
            }

            else if (productid == "124")
            {
                applicationID = "";
                senderId = "";

                //return 'Lic Data'
            }

            else if (productid == "125")
            {
                applicationID = "AAAA2ELh4MY:APA91bHpjaZRGqWN2xXFWpBONK6FKC1jPHmcxbrCjQ_aiYWIuv-TwMbWbpRErX6GR9Qyfd6-9fx7PZb7xErIvwxdrTFCB77-NakAvzh8i8Ay7MmnCUX9OSyvxm-0cjHkng6_XgYurY3i";
                senderId = "928835035334";

                //return 'Auto-SMS'
            }

            else if (productid == "129")
            {
                applicationID = "AAAAOXNk8Dw:APA91bFEZW2rq5zG-_a8VdF7oBDn-q5AOKcZ1TKRxJ0Ed_Ywbx09gerFPfR0CIP36tfV5q_asPo3Xie9LSYCSkblb-KfRvM0M_f3Nqlo1aqmVRC-qmCr84SkPIRw0P30En8WOT9Qoyeo";
                senderId = "246749130812";

                //return 'Premium Calculator'
            }

            else if (productid == "996")
            {
                applicationID = "AAAAEV7MQxs:APA91bHDAVEdVAPPe-vdlLERXPSzXrT2h1GB_fPwEHLZo40YZPLFYY-95cslfPCJEO5KCIy9vAppdFCtSKyG40uxtPIR8JkdH0iSAVWEzHF6TSRc43SSvzEH-viZKqOMPtv0jODPZjXv";
                senderId = "74604888859";

                //return 'Buisness Moniter'
            }

            else if (productid == "995")
            {
                applicationID = "AAAACEWLsLU:APA91bG0OcFn_IqTH_t12OmMFzO9-eJQvHtLNKO3sw2ohBwrFafomhv7QLtz4-mMJGsEOBkiNp01SdKbpP173nGDyYsaOfxAtmWyLR_vl0UUXBG1fTPptiEN9noiv_zVHpJQCTgVTHxC";
                senderId = "35526521013";

                //return 'Digitel Card'
            }

            else if (productid == "994")
            {
                applicationID = "AAAAqTTG3Gs:APA91bGFPUZ7MxflV-1oE8zs_ZbuffGM7Hhx6GFYTyeyrSSL5dHzyppQn3jIMYGGn3sFcGt51d3dQDjGD4jOsXLZbrkP2MpnybpN5iLExvCKkWPPeKmbdbsoThRt_dQ306HhbxbIG_aI";
                senderId = "726734920811";

                //return 'Video App'
            }

            else if (productid == "993")
            {
                applicationID = "";
                senderId = "";

                //return 'DO Digitel Card'
            }

            else if (productid == "992")
            {
                applicationID = "AAAAKNYXlZQ:APA91bFrFkPnxB375lliVYh4nnjL9-WEyRlSYPTJ_pqmWqE3wfq-yb-l7Owj07-Fo8IYovu3XvYseTA75w7H7qnHIGWxoby0JJaeTxFcJXh2L60ZUOXbJSTgmDkb7Hqu0tBiqjMZA0nO";
                senderId = "175390561684";

                //return 'Zaidi App Store'
            }

            else if (productid == "146")
            {
                applicationID = "AAAA2ELh4MY:APA91bHpjaZRGqWN2xXFWpBONK6FKC1jPHmcxbrCjQ_aiYWIuv-TwMbWbpRErX6GR9Qyfd6-9fx7PZb7xErIvwxdrTFCB77-NakAvzh8i8Ay7MmnCUX9OSyvxm-0cjHkng6_XgYurY3i";
                senderId = "928835035334";

                //return 'My Sender'
            }
            else
            {
                applicationID = "";
                senderId = "";

            }

            try
            {
                WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
                tRequest.Method = "post";
                tRequest.ContentType = "application/json";

                var data = new
                {

                    to = FireBaseToken,
                    priority = "high",

                    data = new
                    {
                        title = Title,
                        is_background = true,
                        message = Message,
                 
                        clickAction = action,

                        imageUrl = imageurl,
                        link = urllink

                    }



                };


                var json = Newtonsoft.Json.JsonConvert.SerializeObject(data).Replace("\\", "");
                Byte[] byteArray = Encoding.UTF8.GetBytes(json.Replace("\\", ""));
                tRequest.Headers.Add(string.Format("Authorization: key={0}", applicationID));
                tRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
                tRequest.ContentLength = byteArray.Length;

                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);

                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            using (StreamReader tReader = new StreamReader(dataStreamResponse))
                            {
                                String sResponseFromServer = tReader.ReadToEnd();

                            }
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
        public vision Getvision()
        {
            vision model = new vision();
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT visionid, data, customerid FROM public.vision where customerid=2021;", agcon);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.data = dt.Rows[0]["data"].ToString();
                string result = RemoveAllHTMLTags(model.data).Trim();
                model.subdata = result;

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            return model;
        }


        public IEnumerable<plan> bindplan()
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<plan>("SELECT productcategoryid, productid, category,plandesc, image  FROM public.productcategory where productid='3'");
        }
        public IEnumerable<plannames> bindplanname(int categoryid)
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<plannames>("select *,(select productcategoryId from productcategory where productcategoryId=" + categoryid + ") as categoryid from plan where productid=3 and productcategoryId=" + categoryid + "");
        }


        public IEnumerable<plannames> planiamge(int id)
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<plannames>("select image,planname from plan where planid='" + id + "'");
        }

        public IEnumerable<business> buisnessname()
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<business>("select category,businessinsuranceid,image from businessinsurance");
        }
        public IEnumerable<business> buisnessnameimage(int id)
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<business>("select image from businessinsurance where businessinsuranceid=" + id + " ");
        }

        public IEnumerable<bonus> bonus()
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<bonus>("select * from bonus order by bonusid desc");
        }

        public async Task<IEnumerable<article>> GetarticleGrid_Gallery(DataTableParam model)
        {
            string[] ColumnsName = "Title".Split(',');
            string where = "";
            if (model.search != "")
                where = "  where (heading_name Ilike '%" + model.search + "%')";

            string sqlquery = "SELECT count(1) OVER() as TotalRows, * FROM content_table  where parent_id=7 ORDER BY article_date desc OFFSET " + model.start + " LIMIT 10;";
            var result = await Connection.OpenConnection.QueryAsync<article>(sqlquery);
            if (result.Count() != 0)
                model.TotalCount = result.FirstOrDefault().TotalRows;

            return result;
        }

        public IEnumerable<article> bindimagearticle(int id)
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<article>("SELECT saudiovideopath,article_date,heading_description,article_source  FROM public.content_table where content_id='" + id + "'");
        }

        public async Task<IEnumerable<News>> GetnewsGrid_Gallery(DataTableParam model)
        {
            string[] ColumnsName = "Title".Split(',');
            string where = "";
            if (model.search != "")
                where = "  where (title Ilike '%" + model.search + "%')";

            string sqlquery = "SELECT count(1) OVER() as TotalRows, * FROM industrynews ORDER BY industrynewsid desc OFFSET " + model.start + " LIMIT 10;";
            var result = await Connection.OpenConnection.QueryAsync<News>(sqlquery);
            if (result.Count() != 0)
                model.TotalCount = result.FirstOrDefault().totalrows;

            return result;
        }

        public IEnumerable<News> bindnews(int id)
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<News>("select * from industrynews where industrynewsid='" + id + "'");
        }

        public async Task<IEnumerable<form>> GetformGrid_Gallery(DataTableParam model, string category)
        {
            string[] ColumnsName = "Title".Split(',');
            string where = "";
            if (model.search != "")
                where = "  where (title Ilike '%" + model.search + "%')";

            string sqlquery = "SELECT count(1) OVER() as TotalRows, * FROM form  where category='" + category + "' ORDER BY formid desc OFFSET " + model.start + ";";
            var result = await Connection.OpenConnection.QueryAsync<form>(sqlquery);
            if (result.Count() != 0)
                model.TotalCount = result.FirstOrDefault().TotalRows;

            return result;
        }

        public string policyenquiry(contact model)
        {
            try
            {
                if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
                NpgsqlCommand cmd = new NpgsqlCommand("insert into feedback (name,mobileno, emailid, message, customerid, datatype,policyno) values ('" + model.name + "','" + model.phone + "','" + model.email + "','" + model.msg + "',2021,'Enquiry','" + model.policyno + "')", agcon);
                cmd.ExecuteNonQuery();
                if (agcon.State == ConnectionState.Open) { agcon.Close(); }
                string body = "<html><body><h2>New Enquiry From Website User.....</h2><br/><span>Name: " + model.name + "</span><br/><span>Mobile No: " + model.phone + "</span><br/><span>Email Id: " + model.email + "</span><br/><span>Message: " + model.msg + "</span></body></html>";
                SendMail(body, "Policy Enquiry", "info@kazimraza.com","","");
                //SmtpClient smtp = new SmtpClient
                //{
                //    Host = "mail.kazimraza.com", // smtp server address here…
                //    Port = 587,
                //    EnableSsl = true,
                //    DeliveryMethod = SmtpDeliveryMethod.Network,
                //    Credentials = new System.Net.NetworkCredential("info@kazimraza.com", "kr9898989898"),
                //    Timeout = 30000,
                //};
                //MailMessage message = new MailMessage("info@kazimraza.com", "info@kazimraza.com", "Enquiry", body);
                //smtp.Send(message);
                return ("Success");
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public IEnumerable<Tax> taxinfo()
        {

            NpgsqlCommand cmd = new NpgsqlCommand();
            return Connection.OpenConnection.Query<Tax>("select * from taxinfo");
        }

        public string sendgridapi()
        {
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM public.tbl_sendgrid where customerid=0 ", con);
            DataTable dt = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return dt.Rows[0]["api"].ToString();
            }
            return "";
        }


        public async Task SendMail(string msg, string subject, string email,string frommail,string name)
        {
            try
            {
                var apiKey = sendgridapi();
                //creating a sendgrid client to connect to the service provider
                var client = new SendGridClient(apiKey);
                //from which email you have to send the email
                var from = new EmailAddress(frommail, name);
                //mail subject can be dynamic as per need i have hard coded it


                //where a reply from user to be delivered
                var replyto = new EmailAddress(frommail);
                //recipient email id to emailid
                //can be dynamic i have hard corded
                var to = new EmailAddress(email, "");
                //email content
                var plainTextContent = "";


                var body = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, msg);
                body.ReplyTo = replyto;
                //readig response from the api not implement complete
                Response r = await client.SendEmailAsync(body);

            }
            catch (Exception)
            {


            }
            
        }
        public List<popup> Getpopup()
        {
            if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
            var gallery = new List<popup>();
            NpgsqlCommand cmd = new NpgsqlCommand("SELECT mappid, popupid, customerid, createdon, image,isself FROM public.popupmapping where customerid=2021 ", agcon);
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                if (dt.Rows[0]["isself"].ToString() == "True")
                {
                    if (agcon.State == ConnectionState.Open) { agcon.Close(); }
                    if (agcon.State == ConnectionState.Closed) { agcon.Open(); }
                    cmd = new NpgsqlCommand("SELECT popupid, title, imageurl, status, customerid, isdelete,link  FROM public.popup where popupid='" + dt.Rows[0]["popupid"].ToString() + "' ", agcon);
                    da = new NpgsqlDataAdapter(cmd);
                    da.Fill(dt1);
                }
                else
                {
                    if (con.State == ConnectionState.Open) { con.Close(); }
                    if (con.State == ConnectionState.Closed) { con.Open(); }
                    cmd = new NpgsqlCommand("SELECT popupid, title, imageurl, status  FROM public.popup where popupid='" + dt.Rows[0]["popupid"].ToString() + "' ", con);
                    da = new NpgsqlDataAdapter(cmd);
                    da.Fill(dt1);
                }
                for (int i = 0; i <= dt1.Rows.Count - 1; i++)
                {
                    if (dt.Rows[0]["isself"].ToString() == "True")
                    {
                        gallery.Add(new popup()
                        {
                            imageurl = dt1.Rows[i]["imageurl"].ToString(),
                            link = dt1.Rows[i]["link"].ToString()

                        });
                    }
                    else
                    {
                        gallery.Add(new popup()
                        {
                            imageurl = dt1.Rows[i]["imageurl"].ToString()


                        });
                    }

                }

            }
            if (agcon.State == ConnectionState.Open) { agcon.Close(); }
            if (con.State == ConnectionState.Open) { con.Close(); }
            return gallery;
        }
    }

    internal class NpgSqlConnection
    {
        private string connectionString;

        public NpgSqlConnection(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }

}