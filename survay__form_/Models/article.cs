using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class article
    {
        public int content_id { get; set; }
        public string heading_name { get; set; }
        public string article_source { get; set; }
        public string article_date { get; set; }
        public string saudiovideopath { get; set; }
        public long TotalRows { get; set; }
        public string heading_description { get; set; }

    }
}