using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public partial class Slider
    {
        public int customerid { get; set; }
        public int slider { get; set; }
        public string imagepath { get; set; }
        public bool isself { get; set; }
    }
}