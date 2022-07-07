using Npgsql;
using survay__form_.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Web;
using System.Web.Mvc;

namespace survay__form_.Controllers
{
    public class digitel_calenderController : Controller
    {
        NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);
        NpgsqlConnection con1 = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        // GET: digitel_calender
        public ActionResult calender1(string auth_key)
        {
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key=" + auth_key + "", con1);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["auth_key"] = auth_key;
            }

            //NpgsqlCommand cmd = new NpgsqlCommand("select * from familymember", con);
            //NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            //DataTable dt = new DataTable();
            //da.Fill(dt);
            //if (dt.Rows.Count > 0)
            //{
            //    for (int i = 0; i <= dt.Rows.Count - 1; i++)
            //    {
            //        if (dt.Rows[i]["auth_key"].ToString() == "" || dt.Rows[i]["auth_key"].ToString() == null)
            //        {
            //            int length = 14;
            //            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
            //            string auth_key1 = new string(Enumerable.Repeat(chars, length)
            //                .Select(s => s[random.Next(s.Length)]).ToArray());

            //            cmd = new NpgsqlCommand("update familymember set auth_key='" + auth_key1 + "' where familymemberid=" + dt.Rows[i]["familymemberid"].ToString() + "", con);
            //            cmd.ExecuteNonQuery();
            //        }
            //    }
            //}
            return View();
        }

        public ActionResult calenderview(string auth_key)
        {
            Session["auth_key"] = auth_key;
            List<policyentry> list = new List<policyentry>();
            policyentryview policylist = new policyentryview();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            if (con1.State == ConnectionState.Closed) { con1.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select customerid from customermaster where auth_key=" + auth_key + "", con1);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);

            cmd = new NpgsqlCommand("SELECT otherpolicyid, p.familymemberid, productid, policyno, coveramount, modelofpayment, premium, tax, totalpremium, agencyid, startdate, nextduedate, complitiondate, policysortdetails, remarks, p.customerid, p.efrom, p.edate, pay_term, pay_end_date, term, ppt, appid, details, product_name,f.fullname,f.mobileno,f.familymemberid,(select case when familyheadid=0 then (select auth_key from familymember where familymemberid=f.familymemberid) else (select auth_key from familymember where familymemberid=(select familyheadid from familymember where familymemberid=f.familymemberid)) end from familymember where familymemberid=f.familymemberid) as headid,(select case when familyheadid=0 then (select mobileno from familymember where familymemberid=f.familymemberid) else (select mobileno from familymember where familymemberid=(select familyheadid from familymember where familymemberid=f.familymemberid)) end from familymember where familymemberid=f.familymemberid) as head_mobile FROM public.otherpolicy p join familymember f on p.familymemberid = f.familymemberid where p.customerid = " + dt.Rows[0]["customerid"].ToString() + "", con);
            da = new NpgsqlDataAdapter(cmd);
            DataTable dt1 = new DataTable();
            da.Fill(dt1);
            if (dt1.Rows.Count > 0)
            {
                for (int i = 0; i <= dt1.Rows.Count - 1; i++)
                {
                    policyentry model = new policyentry();
                    model.fullname = dt1.Rows[i]["fullname"].ToString();
                    model.policyno = dt1.Rows[i]["policyno"].ToString();
                    model.Insurance = dt1.Rows[i]["product_name"].ToString();
                    model.Insurer = dt1.Rows[i]["coveramount"].ToString();
                    model.fupdate = dt1.Rows[i]["nextduedate"].ToString();
                    model.policyentryid = dt1.Rows[i]["otherpolicyid"].ToString();
                    model.mobileno = dt1.Rows[i]["head_mobile"].ToString();
                    if (dt1.Rows[i]["headid"].ToString() == "0")
                    {
                        model.familymemberid = dt1.Rows[i]["familymemberid"].ToString();
                    }
                    else
                    {
                        model.familymemberid = dt1.Rows[i]["headid"].ToString();
                    }
                    list.Add(model);
                }
            }
            ViewBag.auth_key = auth_key;
           
            policylist.policyentries = list;
            return View(policylist);
        }

        public JsonResult policyview(int id,string auth_key)
        {
           
            List<policyentry> list = new List<policyentry>();
            policyentryview policylist = new policyentryview();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select customerid from customermaster where auth_key='" + Session["auth_key"].ToString() + "'", con1);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);

            cmd = new NpgsqlCommand("SELECT otherpolicyid, p.familymemberid, productid, policyno, coveramount, modelofpayment, premium, tax, totalpremium, agencyid, startdate, nextduedate, complitiondate, policysortdetails, remarks, p.customerid, p.efrom, p.edate, pay_term, pay_end_date, term, ppt, appid, details, product_name,f.fullname,f.mobileno,f.familymemberid,f.recorddateofbirth as dateofbirth FROM public.otherpolicy p join familymember f on p.familymemberid = f.familymemberid where p.customerid = " + dt.Rows[0]["customerid"].ToString() + " and otherpolicyid=" + id+"", con);
            da = new NpgsqlDataAdapter(cmd);
            DataTable dt1 = new DataTable();
            da.Fill(dt1);
            if (dt1.Rows.Count > 0)
            {
                for (int i = 0; i <= dt1.Rows.Count - 1; i++)
                {
                    policyentry model = new policyentry();
                    model.fullname = dt1.Rows[i]["fullname"].ToString();
                    model.policyno = dt1.Rows[i]["policyno"].ToString();
                    model.Insurance = dt1.Rows[i]["product_name"].ToString();
                    model.Insurer = "";
                    model.fupdate = dt1.Rows[i]["nextduedate"].ToString();
                    model.dateofbirth = dt1.Rows[i]["dateofbirth"].ToString();
                    model.sumassured = dt1.Rows[i]["coveramount"].ToString();
                    model.mode = dt1.Rows[i]["modelofpayment"].ToString();
                    model.term = dt1.Rows[i]["term"].ToString();
                    model.ppt = dt1.Rows[i]["ppt"].ToString();
                    model.docstartdate = dt1.Rows[i]["startdate"].ToString();
                    model.fupdate = dt1.Rows[i]["nextduedate"].ToString();
                    model.premium = dt1.Rows[i]["premium"].ToString();
                    model.mobileno = dt1.Rows[i]["mobileno"].ToString();
                    model.policyentryid = id.ToString();
                    list.Add(model);
                }
            }
            policylist.policyentries = list;
            //return View(policylist);
            ViewBag.auth_key = Session["auth_key"].ToString();

            return Json(new { data = list }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult chkdata(string mobile,string rdo)
        {
            member Subcatlist = new member();

           
            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            con.Open();
            string employee_sale = "0", dealer_sale = "0";
            string employee_recive = "0", dealer_recive = "0";
            string employee_bal = "0", dealer_bal = "0";
            dt.Clear();
            //===========employee=================
            cmd = new NpgsqlCommand("select * from familymember where mobileno='"+ mobile + "' and customerid=" + Session["customerid"].ToString() + "", con);

            adp = new NpgsqlDataAdapter(cmd);
            dt = new DataTable();
            adp.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    if (rdo == "head")
                    {
                        if (dt.Rows[i]["familyheadid"].ToString() == "0" || dt.Rows[i]["familyheadid"].ToString() == "")
                        {
                            Subcatlist.familycode = dt.Rows[i]["familycode"].ToString();
                            Subcatlist.familymemberid = Convert.ToInt32(dt.Rows[i]["familymemberid"].ToString());
                            Subcatlist.fullname = dt.Rows[i]["fullname"].ToString();
                            Subcatlist.recorddateofbirth = dt.Rows[i]["recorddateofbirth"].ToString();
                            break;
                        }
                        else if (Convert.ToInt32(dt.Rows[i]["familymemberid"].ToString()) > 0)
                        {
                            Subcatlist.familycode = "";
                            Subcatlist.familymemberid = Convert.ToInt32("-1");
                        }
                        else {
                            Subcatlist.familycode = "";
                            Subcatlist.familymemberid = Convert.ToInt32("0");
                        }
                    }
                    else
                    {
                        //if (dt.Rows[i]["familyheadid"].ToString() == "0")
                        //{
                        //    Subcatlist.familycode = dt.Rows[i]["familycode"].ToString();
                        //    Subcatlist.familymemberid = Convert.ToInt32(dt.Rows[i]["familymemberid"].ToString());
                        //    Subcatlist.fullname = dt.Rows[i]["fullname"].ToString();
                        //    Subcatlist.recorddateofbirth = dt.Rows[i]["recorddateofbirth"].ToString();
                        //    break;
                        //}
                        //else
                        //{
                            Subcatlist.familycode = "";
                            Subcatlist.familymemberid = Convert.ToInt32("0");
                       // }

                    }

                }
            }
            //===========dealer=================
            
           
            return Json(new { data = Subcatlist }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult savedata(string rdo,string mobile, string name,string productname, string dob, string comp,string insure,string policyno,string sumass, string mode, string term, string ppt, string psd, string nxtdue, string premium,int policyentryid=0,int headid=0,int familyid=0)
        {
            try
            {
                
                if (con.State == ConnectionState.Closed) { con.Open(); }
                
                NpgsqlCommand cmd = new NpgsqlCommand();
                if (policyentryid == 0)
                {
                    var complitiondate = Convert.ToDateTime(psd).ToShortDateString();
                    var pay_end_date = Convert.ToDateTime(psd).ToShortDateString();
                    if (mode == "S")
                    {
                        complitiondate = Convert.ToDateTime(psd).ToShortDateString();
                        pay_end_date = Convert.ToDateTime(psd).ToShortDateString();
                    }
                    else {
                         complitiondate = Convert.ToDateTime(psd).AddYears(Convert.ToInt32(term)).ToShortDateString();
                         pay_end_date = Convert.ToDateTime(psd).AddYears(Convert.ToInt32(ppt)).ToShortDateString();
                    }

                    cmd = new NpgsqlCommand("insert into otherpolicy (familymemberid, product_name, policyno, coveramount, modelofpayment, premium, totalpremium, agencyid, startdate, nextduedate, complitiondate, customerid, efrom, pay_term, pay_end_date, term, ppt, appid) values ('" + familyid + "','"+ productname + "','" + policyno + "','" + sumass + "','" + mode + "','" + premium + "','" + premium + "',0,'" + psd + "','" + nxtdue + "','" + complitiondate + "','" + Session["customerid"].ToString() + "','W'," + ppt + ",'" + pay_end_date + "'," + term + ",'"+ppt+"',0)", con);
                    cmd.ExecuteNonQuery();

                    //cmd = new NpgsqlCommand("insert into policyentry (familymemberid,dateofbirth,policyno,docstartdate,mode,ppt,fupdate,term,sumassured,premium,customerid,company_id,policy_type) values ('" + familyid + "','" + dob + "','" + policyno + "','" + psd + "','" + mode + "','" + ppt + "','" + nxtdue + "','" + term + "','" + sumass + "','" + premium + "'," + Session["customerid"].ToString() + ","+ comp + ","+ insure + ")", con);
                    //cmd.ExecuteNonQuery();
                }
                else {
                    var complitiondate = Convert.ToDateTime(psd).ToShortDateString();
                    var pay_end_date = Convert.ToDateTime(psd).ToShortDateString();
                    if (mode == "S")
                    {
                        complitiondate = Convert.ToDateTime(psd).ToShortDateString();
                        pay_end_date = Convert.ToDateTime(psd).ToShortDateString();
                    }
                    else
                    {
                        complitiondate = Convert.ToDateTime(psd).AddYears(Convert.ToInt32(term)).ToShortDateString();
                        pay_end_date = Convert.ToDateTime(psd).AddYears(Convert.ToInt32(ppt)).ToShortDateString();
                    }
                    //cmd = new NpgsqlCommand("update policyentry set dateofbirth='"+dob+"',policyno='"+policyno+"',docstartdate='"+psd+"',mode='"+mode+"',ppt='"+ppt+"',fupdate='"+nxtdue+"',term='"+term+"',sumassured='"+sumass+"',premium='"+premium+ "',company_id="+ insure + ",policy_type="+ comp + " where policyentryid=" + policyentryid + "", con);
                    //cmd.ExecuteNonQuery();

                    cmd = new NpgsqlCommand("update otherpolicy set product_name='" + productname + "', policyno='"+policyno+"', coveramount='"+sumass+"', modelofpayment='"+mode+"', premium='"+ premium + "', totalpremium='"+ premium + "', agencyid=0, startdate='"+ psd + "', nextduedate='"+ nxtdue + "', complitiondate='"+ complitiondate + "', pay_term='"+ppt+"', pay_end_date='"+ pay_end_date + "', term='"+term+"', ppt='"+ppt+ "' where otherpolicyid=" + policyentryid + " ", con);
                    cmd.ExecuteNonQuery();
                }
                return Redirect("../digitel_calender/calenderview?auth_key="+Session["auth_key"].ToString()+"&s=Success");
            }
            catch (Exception)
            {
                return Redirect("../digitel_calender/calenderview?auth_key=" + Session["auth_key"].ToString() + "&s=Failed");
               
            }
           
            
        }


        public ActionResult memberlist(string id,string auth_key)
        {
            List<policyentry> list = new List<policyentry>();
            policyentryview policylist = new policyentryview();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select customerid,personalcontact,customername from customermaster where auth_key=" + auth_key + "", con1);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);

            cmd = new NpgsqlCommand("SELECT otherpolicyid, p.familymemberid, productid, policyno, coveramount, modelofpayment, premium, tax, totalpremium, agencyid, startdate, nextduedate, complitiondate, policysortdetails, remarks, p.customerid, p.efrom, p.edate, pay_term, pay_end_date, term, ppt, appid, details, product_name,f.familyheadid, f.fullname,f.mobileno,f.familymemberid,f.recorddateofbirth as dateofbirth FROM public.otherpolicy p join familymember f on p.familymemberid = f.familymemberid where p.customerid = " + dt.Rows[0]["customerid"].ToString() + " and (f.auth_key='" + id + "' or f.familyheadid=(select familymemberid from familymember where auth_key='"+id+"'))", con);
            da = new NpgsqlDataAdapter(cmd);
            DataTable dt1 = new DataTable();
            da.Fill(dt1);
            if (dt1.Rows.Count > 0)
            {
                for (int i = 0; i <= dt1.Rows.Count - 1; i++)
                {
                    policyentry model = new policyentry();
                    model.fullname = dt1.Rows[i]["fullname"].ToString();
                    model.policyno = dt1.Rows[i]["policyno"].ToString();
                    model.Insurance = dt1.Rows[i]["product_name"].ToString();
                    model.Insurer = "";
                    model.fupdate = dt1.Rows[i]["nextduedate"].ToString();
                    model.dateofbirth = dt1.Rows[i]["dateofbirth"].ToString();
                    model.sumassured = dt1.Rows[i]["coveramount"].ToString();
                    model.mode = dt1.Rows[i]["modelofpayment"].ToString();
                    model.term = dt1.Rows[i]["term"].ToString();
                    model.ppt = dt1.Rows[i]["ppt"].ToString();
                    model.docstartdate = dt1.Rows[i]["startdate"].ToString();
                    model.fupdate = dt1.Rows[i]["nextduedate"].ToString();
                    model.premium = dt1.Rows[i]["premium"].ToString();
                    model.mobileno = dt1.Rows[i]["mobileno"].ToString();
                    model.familyheadid = dt1.Rows[i]["familyheadid"].ToString();
                    model.policyentryid = id.ToString();
                    list.Add(model);
                }
            }
            ViewBag.auth_key = auth_key;
            policylist.policyentries_date = list.OrderBy(r=>r.fupdate).ToList();
            policylist.policyentries_name = list.OrderBy(r => r.fullname).ToList();
            ViewBag.id = id+".json";
            TempData["id"] = id + ".json";
            Session["filename"] = id + ".json";
            ViewBag.name = dt.Rows[0]["customername"].ToString();
            ViewBag.mobile = dt.Rows[0]["personalcontact"].ToString();
            return View(policylist);
            
        }

        public JsonResult GetDropdownuser(string type)
        {
            List<companyModel> companyModelList = new List<companyModel>();
            
            NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);
            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            con.Open();
            
                dt.Clear();
                cmd = new NpgsqlCommand("SELECT companyid, fullname FROM public.companymaster", con);

                adp = new NpgsqlDataAdapter(cmd);
                dt = new DataTable();
                adp.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                    companyModel Subcat = new companyModel();

                        Subcat.companyid = Convert.ToInt32(dt.Rows[i]["companyid"]);
                        Subcat.fullname = dt.Rows[i]["fullname"].ToString();
                    companyModelList.Add(Subcat);
                    }
                }
                else
                {
                companyModel Subcat = new companyModel();
                Subcat.companyid =0;
                Subcat.fullname = "---Select---";
                companyModelList.Add(Subcat);
                }
                con.Close();
                return Json(new { data = companyModelList }, JsonRequestBehavior.AllowGet);
            
           


        }
        private static Random random = new Random();
        public JsonResult savefamily(string mobile, string rdo,string name,string dob,int selHead=0)
        {
            member Subcatlist = new member();


            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            con.Open();
            string employee_sale = "0", dealer_sale = "0";
            string employee_recive = "0", dealer_recive = "0";
            string employee_bal = "0", dealer_bal = "0";
            dt.Clear();
            int length = 14;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string auth_key= new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            //===========employee=================
            if (rdo != "member")
            {
                cmd = new NpgsqlCommand("select * from familymember where mobileno='" + mobile + "' and customerid=" + Session["customerid"].ToString() + " and familyheadid=0", con);
                adp = new NpgsqlDataAdapter(cmd);
                dt = new DataTable();
                adp.Fill(dt);
            }
            

            
            var res = 0;
            string res1 = "";
            if (dt.Rows.Count == 0)
            {
                int headid = 0;
                if (con.State == ConnectionState.Closed) { con.Open(); }
                if (rdo == "head")
                {
                    headid = 0;
                    cmd = new NpgsqlCommand("insert into familymember (fullname,recorddateofbirth,mobileno,edate,customerid,familyheadid,auth_key) values ('" + name + "','" + dob + "','" + mobile + "',current_timestamp," + Session["customerid"].ToString() + "," + headid + ",'" + auth_key + "') RETURNING familymemberid;", con);
                    res = (dynamic)cmd.ExecuteScalar();
                    string json = "{'short_name': 'Premium Calender','name': 'Premium Calender','icons': [{'src': '/survay/images/calendar128.png',      'sizes': '128x128', 'type': 'image/png' }, {  'src': '/survay/images/calendar256.png', 'sizes': '256x256', 'type': 'image/png' },{ 'src': '/survay/images/calendar512.png', 'type': 'image/png', 'sizes': '512x512' }], 'start_url': 'https://mydc.in/survay/digitel_calender/memberlist?id="+ auth_key + "&auth_key="+Session["auth_key"].ToString()+"',  'background_color': '#fff',  'theme_color': '#222',  'display': 'standalone'}";
                
                    string json1 = JsonSerializer.Serialize(json.Replace("'","\"\""));
                    System.IO.File.WriteAllText(HttpContext.Server.MapPath("../manifest/"+ auth_key + ".json"), json.Replace("'", "\""));
                }
                else
                {
                    headid = selHead;
                    cmd = new NpgsqlCommand("insert into familymember (fullname,recorddateofbirth,mobileno,edate,customerid,familyheadid,auth_key) values ('" + name + "','" + dob + "','" + mobile + "',current_timestamp," + Session["customerid"].ToString() + "," + headid + ",'" + auth_key + "') RETURNING familymemberid;", con);
                    res = (dynamic)cmd.ExecuteScalar();
                }

            }
            else {
                if (dt.Rows[0]["auth_key"].ToString() != "")
                {
                    cmd = new NpgsqlCommand("update familymember set auth_key='" + auth_key + "' where familymemberid="+dt.Rows[0]["familymemberid"].ToString() +";", con);
                    cmd.ExecuteNonQuery();
                }

                res1 = "Member Already Exist";
            }
            //===========dealer=================
            string resp = "";
            if (res1 != "")
            {
                resp = res1;
            }
            else {
                resp = res.ToString();
            }

           // Subcatlist.familymemberid = res;
            return Json(new { data = resp }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHeadList()
        {
            List<member> memberList = new List<member>();

            NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);
            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            con.Open();

            dt.Clear();
            cmd = new NpgsqlCommand("SELECT familymemberid,CONCAT(fullname,'-',mobileno) as name FROM public.familymember where customerid=" + Session["customerid"].ToString()+ " and familyheadid=0", con);

            adp = new NpgsqlDataAdapter(cmd);
            dt = new DataTable();
            adp.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    member Subcat = new member();

                    Subcat.familymemberid = Convert.ToInt32(dt.Rows[i]["familymemberid"]);
                    Subcat.fullname = dt.Rows[i]["name"].ToString();
                    memberList.Add(Subcat);
                }
            }
            else
            {
                member Subcat = new member();

                Subcat.familymemberid = 0;
                Subcat.fullname ="---Select---";
                memberList.Add(Subcat);
            }
            con.Close();
            return Json(new { data = memberList }, JsonRequestBehavior.AllowGet);




        }
        public JsonResult getfamilymember(int id)
        {
            List<member> memberList = new List<member>();

            NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);
            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            con.Open();

            dt.Clear();
            cmd = new NpgsqlCommand("SELECT familymemberid,CONCAT(fullname,'-',mobileno) as name FROM public.familymember where customerid=" + Session["customerid"].ToString() + " and familyheadid="+id+"", con);

            adp = new NpgsqlDataAdapter(cmd);
            dt = new DataTable();
            adp.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    member Subcat = new member();
                    
                    Subcat.familymemberid = Convert.ToInt32(dt.Rows[i]["familymemberid"]);
                    Subcat.fullname = dt.Rows[i]["name"].ToString();
                    memberList.Add(Subcat);
                    if (i == dt.Rows.Count-1)
                    {
                        member Subcat2 = new member();
                        Subcat2.familymemberid = -1;
                        Subcat2.fullname = "Add New Member";
                        memberList.Add(Subcat2);
                        member Subcat1 = new member();
                        Subcat1.familymemberid = -1;
                        Subcat1.fullname = "Add New Member";
                        memberList.Add(Subcat1);
                    }

                }
            }
            else
            {
                //member Subcat = new member();

                //Subcat.familymemberid = 0;
                //Subcat.fullname = "---Select---";
                //memberList.Add(Subcat);
                member Subcat2 = new member();
                Subcat2.familymemberid = -1;
                Subcat2.fullname = "Add New Member";
                memberList.Add(Subcat2);
                member Subcat1 = new member();
                Subcat1.familymemberid = -1;
                Subcat1.fullname = "Add New Member";
                memberList.Add(Subcat1);
            }
            con.Close();
            return Json(new { data = memberList }, JsonRequestBehavior.AllowGet);




        }
        public JsonResult getfamilymember1(int id)
        {
            List<member> memberList = new List<member>();

            NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["AgentConnection"].ConnectionString);
            NpgsqlCommand cmd = new NpgsqlCommand();
            NpgsqlDataAdapter adp = new NpgsqlDataAdapter();
            DataTable dt = new DataTable();
            con.Open();

            dt.Clear();
            cmd = new NpgsqlCommand("SELECT * FROM public.familymember where customerid=" + Session["customerid"].ToString() + " and familymemberid=" + id + "", con);

            adp = new NpgsqlDataAdapter(cmd);
            dt = new DataTable();
            adp.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    member Subcat = new member();

                    Subcat.familycode =dt.Rows[i]["mobileno"].ToString();
                    Subcat.fullname = dt.Rows[i]["fullname"].ToString();
                    Subcat.recorddateofbirth = dt.Rows[i]["recorddateofbirth"].ToString();
                    Subcat.familymemberid = id;
                    memberList.Add(Subcat);
                    

                }
            }
            
            con.Close();
            return Json(new { data = memberList }, JsonRequestBehavior.AllowGet);




        }
    }
}