using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class policyentry
    {
        public string policyentryid { get; set; }
        public string familymemberid { get; set; }
        public string dateofbirth { get; set; }
        public string policyno { get; set; }
        public string docstartdate { get; set; }
        public string planno { get; set; }
        public string mode { get; set; }
        public string ppt { get; set; }
        public string tax { get; set; }
        public string nomineename { get; set; }
        public string nomineeremark { get; set; }
        public string relation { get; set; }
        public string policystatus { get; set; }
        public string maturitydate { get; set; }
        public string fupdate { get; set; }
        public string agencyid { get; set; }
        public string eform { get; set; }
        public string term { get; set; }
        public string sumassured { get; set; }
        public string premium { get; set; }
        public string riders { get; set; }
        public string appointee { get; set; }
        public string dab { get; set; }
        public string total { get; set; }
        public string customerid { get; set; }
        public string familycode { get; set; }
        public string isdelete { get; set; }
        public string edate { get; set; }
        public string premiumenddate { get; set; }
        public string policy_type { get; set; }
        public string fullname { get; set; }
        public string recorddateofbirth { get; set; }
        public string mobileno { get; set; }
        public string Insurance { get; set; }
        public string Insurer { get; set; }
        public string familyheadid { get; set; }
    }

    public class policyentryview
    {
        public List<policyentry> policyentries { get; set; }
        public List<policyentry> policyentries_date { get; set; }
        public List<policyentry> policyentries_name { get; set; }
    }
}