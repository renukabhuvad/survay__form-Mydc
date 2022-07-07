using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class form
    {
        public int formid { get; set; }
        public string title { get; set; }

        public string file { get; set; }

        public string category { get; set; }

        public long TotalRows { get; set; }
    }
}