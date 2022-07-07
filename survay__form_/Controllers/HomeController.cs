using survay__form_.Models;
using survay__form_.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Data;
using Npgsql;

namespace survay__form_.Controllers
{
    public class HomeController : Controller
    {
        NpgsqlConnection con = new NpgsqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        String dob, doc;
        int present_age, retirement_age, i_size, period, count = 0;
        Double Present_Amount, Expancess, Amount_end_year, RatOfInflation,
        Growth_Rate, Interest_Rate, Insurance, GrandTotal, Investment;

        //Double Total, Invest, Gtotal;

        Ticket ticketOne = new Ticket();
        List<Ticket> listOfTickets = new List<Ticket>();

        public ActionResult Index()
        {
            Globel model = new Globel();

            WebsiteServices serv = new WebsiteServices();
            model.slider = serv.Getslider();
            model.about = serv.aboutus();
            model.Testimonial = serv.Gettestimonial();
            model.Gallery = serv.Getgallery();
            model.video = serv.Getvideo();
            model.News = serv.Getnews();
            model.popup = serv.Getpopup();
            return View(model);
        }

        public ActionResult About()
        {
            WebsiteServices serv = new WebsiteServices();
            Globel model = new Globel();
            model.about = serv.aboutus();
            return View(model);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Vision()
        {
            WebsiteServices serv = new WebsiteServices();
            Globel model = new Globel();
            model.vision = serv.Getvision();
            return View(model);
        }
        public ActionResult Testimonials()
        {
            WebsiteServices serv = new WebsiteServices();
            Globel model = new Globel();
            model.Testimonial = serv.Gettestimonial();
            return View(model);
        }

        [HttpPost]
        public string Contact(contact model, string subject)
        {
            WebsiteServices serv = new WebsiteServices();
            var result = serv.contact(model, subject);
            return result;
        }
        public ActionResult Calculator()
        {
            return View();
        }

        public ActionResult FamilyFinancialSecurity(string id)
        {
            EMIPlanCalculator model = new EMIPlanCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            return View(model);
        }

        [HttpPost]
        public ActionResult HLVCalculator(HLVCalculator model)
        {
            model.CalculateTotalExpense();
            model.CalculateTotalSpouseIncome();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        //[Route("Default1")]
        public ActionResult ChildPlanner(string id)
        {
            ChildEducationCalculator model = new ChildEducationCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            return View(model);
        }
        public ActionResult ChildDetails()
        {
            
            return View();
        }
        //[Route("Home/cepCalculator")]
        [HttpPost]
        public ActionResult ChildEducationCalculator(ChildEducationCalculator model)
        {
            foreach (var child in model.ChildDetails)
            {
                if (child.Id <= model.NoOfChildren)
                {
                    foreach (var expense in child.Expenses)
                    {
                        child.CalculateTotalExpense(expense);
                    }
                }
            }
            //model.Message = "Here is the summary of your financial preparedness for your child(ren)'s education";
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult WealthValueCalculator(string id)
        {
            Ticket model = new Ticket();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
                model.Id_ = id;
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            return View(model);
        }

        [HttpPost]
        public ActionResult Calculation(String firstname, string phone, string email, String birthdate, int Retirement, Double income, Double expense, Double Growth, Double influction, Double interest, Double Investment, string id)
        {
            try
            {
                dob = birthdate;
                var dob2 = dob.Split('/');

                var day1 = dob2[0];
                var month1 = dob2[1];
                var year1 = dob2[2];


                DateTime doc1 = DateTime.Now;
                doc = string.Format("{0:dd/MM/yyyy}", doc1);
                var doc2 = doc.Split('-');

                var day2 = doc2[0];
                var month2 = doc2[1];
                var year2 = doc2[2];
                present_age = int.Parse(year2) - int.Parse(year1);
                //  retirement_age = Retirement;
                i_size = Retirement - present_age;

                Present_Amount = income;
                Expancess = expense;
                Amount_end_year = Present_Amount - Expancess;
                RatOfInflation = influction;
                Growth_Rate = Growth;
                Interest_Rate = interest;
                Insurance = Investment;

                Double Year_Interest = Interest_Rate / 12;

                count = int.Parse(year2);
                period = count;

                for (int i = 1; i <= i_size; i++)
                {

                    Amount_end_year = Math.Abs(Present_Amount - Expancess);
                    if (Interest_Rate > 0)
                    {
                        Double si = Amount_end_year * Year_Interest / 100;

                        si = 0;

                    }

                    GrandTotal += Amount_end_year;
                    listOfTickets.Add(new Ticket { Id = period, Amount = Present_Amount, Growth_Rate = Growth_Rate, /*Tax = Tax,*/ Expancess = Math.Round(Expancess, MidpointRounding.ToEven), RatOfInflation = RatOfInflation, /*Net_AnnualAmount = Net_AnnualAmount,*/ Amount_end_year = Math.Round(Amount_end_year, MidpointRounding.ToEven) });


                    if (RatOfInflation > 0)
                    {
                        Double exp = Math.Abs((RatOfInflation / 100) * Expancess);

                        Expancess += exp;

                    }

                    if (Growth_Rate > 0)
                    {
                        Present_Amount += (Growth_Rate / 100) * Present_Amount;
                        Present_Amount = Math.Round(Present_Amount, MidpointRounding.ToEven);
                    }
                    period = count + i;

                }
            }
            catch (Exception ex) { }


            ViewBag.data = listOfTickets;
            Double Gtotal = GrandTotal - Investment;
            ViewBag.data1 = Math.Round(Gtotal, MidpointRounding.ToEven);
            //  Double Gtotal = GrandTotal - Investment;

            Session["Gtotal"] = Gtotal;
            ViewBag.Invest = Investment;
            ViewBag.Total = Math.Round(GrandTotal, MidpointRounding.ToEven);
            ViewBag.Name = firstname;
            ViewBag.Phone = phone;
            ViewBag.Email = email;
            Ticket model = new Ticket();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
            }
            ViewBag.auth_key = id;
            return View("WealthValueCalculator", model);


        }
        public void clearsession()
        {
            Session.Clear();

        }

        public ActionResult PowerOfCompounting()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult RetirementCalculator(string id="")
        {
            RetirementPlanCalculator model = new RetirementPlanCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.EmailId_ = dt.Rows[0]["emailid"].ToString();
                model.profileimage= dt.Rows[0]["profilepicture"].ToString();
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            ViewBag.Message = "Your Retirement Page";
            return View(model);
        }

        //[Route("Home/rpCalculator")]
        [HttpPost]
        public ActionResult RetirementPlanCalculator(RetirementPlanCalculator model)
        {
            model.CalculateTotalSavings();
            model.CalculateTotalNeed();
            //var AB= string.Format("You need to start saving Rs. {0} daily for next {1} years.");
            //model.Message = string.Format("You need to start saving Rs. {0} daily for next {1} years.", (int)model.MonthlyEMI, model.YearsRetirementToPension + model.YearsTillRetirement);
            //model.Message = string.Format("Dear " + model.Name + "<br> Retirement is the longest vacation so as per the given details your monthly requirement on your retirement at age: " + model.RetirementAge + " is <i class='fa fa-inr'></i>" + (Math.Round(model.MonthlyEMI, 0)  * 30) + " with " + model.InflationRate + "% Inflation that you will receive till the age: " + model.PensionAge + ". so your total requirement amount comes to <i class='fa fa-inr'></i>" + Math.Round(model.TotalNeed, 0) + " But you already have saved  <i class='fa fa-inr'></i>" + Math.Round(model.CurrentSavings, 0) + " that become <i class='fa fa-inr'></i>" + Math.Round(model.TotalSavings, 0) + " on your Retirement at saving interest rate of " + model.InterestRate + "%.<br> <br> You now need to save more <i class='fa fa-inr'></i>" + Math.Round(model.MonthlyEMI, 0) + " daily till your retirement to fulfil the gap of <i class='fa fa-inr'></i>" + Math.Round(model.Gap, 0) + " to enjoy your required retirement life.");
            model.Message = string.Format("Dear " + model.Name + "<br> Retirement is the longest vacation without regular income but with regular expenses. <br> As per the given details your monthly income requirement on your retirement at age: <b>" + model.Age + "</b> is <b><i class='fa fa-inr'></i>" + (Math.Round(model.MonthlyEMI, 0) * 30) + "</b>(with " + model.InflationRate + "% Inflation) which you will receive till the age<b>: " + model.PensionAge + "</b>. So total amount required  amount comes to <b><i class='fa fa-inr'></i>" + Math.Round(model.TotalNeed, 0) + "</b>. You already have saved <b><i class='fa fa-inr'></i>" + Math.Round(model.CurrentSavings, 0) + "</b> which will become <b><i class='fa fa-inr'></i>" + Math.Round(model.TotalNeed, 0) + "</b> on your Retirement at saving interest rate of " + model.InterestRate + "%.<br> Now you need to save an additional <b><i class='fa fa-inr'></i>" + Math.Round(model.MonthlyEMI, 0) + "</b> daily till your retirement to fulfil the gap of  <b><i class='fa fa-inr'></i>" + Math.Round(model.Gap, 0) + "</b> to enjoy your desired retirement life Without Worries .");
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SendMail(mail model)
        {
            /*string name = "s";*//* string email = "s";*/ /*int wealth = 0; int future=0; int lifecover = 0;*/
            //string textBody = " <table border=" + 1 + " cellpadding=" + 0 + " cellspacing=" + 0 + " width = " + 400 + "><tr bgcolor='#4da6ff'><td><b>Column 1</b></td> <td> <b> Column 2</b> </td></tr>";
            //for (int loopCount = 0; loopCount < sample_editable_1.Rows.Count; loopCount++)
            //{
            //    textBody += "<tr><td>" + sample_editable_1.Rows[loopCount]["RowName"] + "</td><td> " + sample_editable_1.Rows[loopCount]["RowName2"] + "</td> </tr>";
            //}
            //textBody += "</table>";
            WebsiteServices serv = new WebsiteServices();

            var heading = "Dear " + model.name + "Your Wealth Value";
            var abc = "<table style='border:1px solid #000;'>" + model.message + "</table>";
            string body = new StringBuilder(heading).Append(abc).ToString();

            serv.SendMail(body, "Wealth Value", model.email,"","");


            ViewBag.Name = model.name;
            ViewBag.data1 = model.lifecover;
            ViewBag.Invest = model.future;
            ViewBag.Total = model.wealth;
            return View("WealthValueCalculator");
        }

        public ActionResult PresentAndFutureValue(string id)
        {
            ChildEducationCalculator model = new ChildEducationCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            return View(model);
        }

        public ActionResult PresentValue(string id)
        {
            ChildEducationCalculator model = new ChildEducationCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
            }
            return View(model);
        }
        public ActionResult EMI(string id)
        {
            EMIPlanCalculator model = new EMIPlanCalculator();
            if (con.State == ConnectionState.Closed) { con.Open(); }
            NpgsqlCommand cmd = new NpgsqlCommand("select * from customermaster where auth_key='" + id + "'", con);
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                model.agentname = dt.Rows[0]["customername"].ToString();
                model.agentid = Convert.ToInt32(dt.Rows[0]["customerid"].ToString());
                model.personalcontact = dt.Rows[0]["personalcontact"].ToString();
                model.emailid = dt.Rows[0]["emailid"].ToString();
                model.profileimage = dt.Rows[0]["profilepicture"].ToString();
                Session["customerid"] = dt.Rows[0]["customerid"].ToString();
                Session["emailid"] = dt.Rows[0]["emailid"].ToString();
            }
            return View(model);
        }
        [Route("Home/emicalculator")]
        public ActionResult EMICalculator()
        {
            
            return View();
        }
    }
}