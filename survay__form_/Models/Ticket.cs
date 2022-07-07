using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public Double Amount { get; set; }
        public Double Growth_Rate { get; set; }
        //public Double Tax { get; set; }
        public Double Expancess { get; set; }
        public Double RatOfInflation { get; set; }
        //public Double Net_AnnualAmount { get; set; }
        public Double Amount_end_year { get; set; }
        public string agentname { get; set; }
        public int agentid { get; set; }
        public string emailid { get; set; }
        public string personalcontact { get; set; }
        public string profileimage { get; set; }
        public string Id_ { get; set; }

    }
}