using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class EMIPlanCalculator
    {
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string DOB { get; set; }
        public string EMIType { get; set; }
        public string agentname { get; set; }
        public int agentid { get; set; }
        public string emailid { get; set; }
        public string personalcontact { get; set; }
        public string profileimage { get; set; }

        public EMIPlanCalculator()
        {            
        }        
    }
}