using survay__form_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace survay__form_.Core.Grid
{
    public class DatatableGrid<T> where T : new()
    {
        public int draw { get; set; }
        public Int64 recordsTotal { get; set; }
        public Int64 recordsFiltered { get; set; }
        public List<T> data { get; set; }

        public DatatableGrid<T> AjaxGetJsonData(DataTableParam model, List<T> Data)
        {
            var dataTableData = new DatatableGrid<T>();
            dataTableData.draw = model.draw;
            dataTableData.data = Data;
            if (model.TotalCount != 0)
            {
                dataTableData.recordsTotal = model.TotalCount;
                dataTableData.recordsFiltered = model.TotalCount;
            }
            else
                dataTableData.recordsTotal = 0;

            return dataTableData;
        }
    }
}