using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Models
{
    public class DataTableParam
    {
        public string sortDirection;
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public string search { get; set; }
        public int sortColumn { get; set; }
        public string sortby { get; set; }
        public string Columns { get; set; }
        public Int64 TotalCount { get; set; }
        public string ColumnsName { get; set; }
        public int start { get; set; }
    }
}