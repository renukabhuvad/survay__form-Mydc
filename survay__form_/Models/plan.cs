using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class plan
    {
        public string category { get; set; }
        public string image { get; set; }
      
        public string banner { get; set; }
        public string plandesc { get; set; }
        public int productcategoryid { get; set; }
        public int productid { get; set; }
    }
}