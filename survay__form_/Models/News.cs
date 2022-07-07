using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class News
    {
        public int industrynewsid { get; set; }
        public string title { get; set; }
        public string news { get; set; }
        public string source { get; set; }
        public string news_date { get; set; }
        public long totalrows { get; set; }
    }
}