using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class Globel
    {
        public List<popup> popup;

        public List<Slider> slider { get; set; }
           public about about { get; set; }

        public List<Testimonial> Testimonial { get;set;}
        public List<Gallery> Gallery { get; set; }

        public List<video> video { get; set; }
        public List<News> News { get; set; }
        public vision vision { get; set; }
    }
}