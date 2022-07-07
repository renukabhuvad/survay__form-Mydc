using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class popup
    {
        public int popupid { get; set; }
        public string title { get; set; }
        public string imageurl { get; set; }
        public string link { get; set; }

        public int customerid { get; set; }
        public Boolean isself { get; set; }
    }
}