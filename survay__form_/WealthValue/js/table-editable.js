var TableEditable = function () {

    var handleTable = function () {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }
     
        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input id="txtid" type="text" class="form-control" style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[0] + '">';
            jqTds[1].innerHTML = '<input id="txtamount" type="text" class="form-control"  style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[1] + '">';
            jqTds[2].innerHTML = '<input id="txtgrowth" type="text" class="form-control" style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[2] + '">';
            jqTds[3].innerHTML = '<input id="txtexpence" type="text" class="form-control" style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[3] + '">';
            jqTds[4].innerHTML = '<input id="txtinflation" type="text" class="form-control" style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[4] + '">';
            jqTds[5].innerHTML = '<input id="txtendyear" type="text" class="form-control" style="background-size: 0 2px, 100% 1px; background-repeat: no-repeat; background-position: center bottom, center calc(100% - 1px); background-color: white; transition: background 0s ease-out; float: none; box-shadow: none; border-radius: 0; font-weight: 400; text-align: center;" value="' + aData[5] + '">';

            jqTds[6].innerHTML = '<button id="button" class="btn btn-success edit" style="padding: 4px 10px;">UPDATE</button>';
       
        }

        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 4, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 5, false);
            oTable.fnUpdate('<button id="button" class="btn btn-success cancel" style="padding: 4px 10px;">Cancel</button>', nRow, 6, false);
            oTable.fnUpdate('<button id="button" class="btn btn-success edit" style="padding: 4px 10px;">EDIT</button>', nRow, 6, false);
            oTable.fnDraw();
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
            oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
            oTable.fnUpdate('<button id="button" class="btn btn-success cancel" style="padding: 4px 10px;">Cancel</button>', nRow, 6, false);
            oTable.fnUpdate('<button id="button"  class="btn btn-success edit" style="padding: 4px 10px;">EDIT</button>', nRow, 6, false);
            oTable.fnDraw();
        }
       
        var table = $('#sample_editable_1');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "bPaginate": false,
           
            "bLengthChange": false,
            "bFilter": false,
            "bSort": false,
            "bInfo": false,
            "bAutoWidth": true,
            "bProcessing": true, // set first column as a default sort by asc
        });

        var tableWrapper = $("#sample_editable_1_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new').click(function (e) {
            e.preventDefault();

            if (nNew && nEditing) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    
                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();
          
            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML == "UPDATE") {

                var $this = $(this);
                var tds = $this.closest('tr').find('td').filter(function () {
                    return $(this).find('.edit').length === 0;
                });
                var currentRow = $(this).closest("tr")
          
                debugger
                var GrandTotal = 0;

                //  if (document.getElementById('mytable') != null) {
                var table = document.getElementById('sample_editable_1');
                var rows = table.getElementsByTagName('tr');
                var index = $(this).closest('tr').index()
                //var index = table.rows(this).index();
                var influction = '@ViewBag.influction';
                var window = localStorage.getItem("storageName");

                var Id = '';
                var Present_Amount = '';
                var Growth_Rate = '';
                var Expancess = '';
                var RatOfInflation = '';
                var Amount_end_year = '';
                var rowcount = rows.length;
               // for (var i = 1; i < rowcount; i++) {

                    //rows[i].i = i;
                    //  rows[i].onclick = function () {
                 
                   
                        //rows[this.i].cells[0].innerHTML = "<input type='text' value='" + Id + "'>";
                        // if (rows[i].i == i) {
                        //Id = $("#id").val();
                        //Present_Amount = $("#amount").val();
                        //Growth_Rate = $("#growth").val();
                        //Expancess = $("#expence").val();
                        //RatOfInflation = $("#inflation").val();
                        //Amount_end_year = $("#endyear").val();

                        Id = parseInt($("#txtid").val());
                        Present_Amount = parseInt($("#txtamount").val());
                        Growth_Rate = parseInt($("#txtgrowth").val());
                        Expancess = parseInt($("#txtexpence").val());
                        RatOfInflation = parseInt($("#txtinflation").val());
                        Amount_end_year = parseInt($("#txtendyear").val());


                        //  }
                        //else {
                        //    Id = parseInt(table.rows[this.i].cells[0].innerHTML);
                        //    Present_Amount = parseInt(table.rows[this.i].cells[1].innerHTML);
                        //    Growth_Rate = parseInt(table.rows[this.i].cells[2].innerHTML);
                        //    Expancess = parseInt(table.rows[this.i].cells[3].innerHTML);
                        //    RatOfInflation = parseInt(table.rows[this.i].cells[4].innerHTML);
                        //    Amount_end_year = parseInt(table.rows[this.i].cells[5].innerHTML);
                        //}
                        var myTable = document.getElementById('sample_editable_1');

                        jsonObj = [];
                        for (var j = index+1; j <= rowcount-1  ; j++) {

                            Amount_end_year = Math.abs(Present_Amount - Expancess);

                            GrandTotal += Amount_end_year;
                            //myTable.rows[j].cells[0].innerHTML = "<input type='text' value='" + Id + "'>";
                            myTable.rows[j].cells[0].innerHTML = Id;
                            // myTable.rows[j].cells[1].innerHTML = "<input type='text' value='" + Math.round(Present_Amount) + "'>";
                            myTable.rows[j].cells[1].innerHTML = Math.round(Present_Amount);
                            myTable.rows[j].cells[2].innerHTML = Math.round(Growth_Rate);
                            myTable.rows[j].cells[3].innerHTML = Math.round(Expancess);
                            myTable.rows[j].cells[4].innerHTML = Math.round(RatOfInflation);
                            myTable.rows[j].cells[5].innerHTML = Math.round(Amount_end_year);
                            myTable.rows[j].cells[6].innerHTML='<button id="button" class="btn btn-success edit" style="padding: 4px 10px;">EDIT</button>';
                           
                                item = {}
                                item["Id"] = Id;
                                item["Present_Amount"] = Math.round(Present_Amount);
                                item["Growth_Rate"] = Math.round(Growth_Rate);
                                item["Expancess"] = Math.round(Expancess);
                                item["RatOfInflation"] = Math.round(RatOfInflation);
                                item["Amount_end_year"] = Math.round(Amount_end_year);
                            
                                jsonObj.push(item);
                         

                            console.log(jsonObj);



                            if (RatOfInflation > 0) {

                                var exp = (RatOfInflation / 100) * Expancess;
                                Expancess += exp;
                                //myTable.rows[j].cells[3].innerHTML = Math.round(Expancess);
                            }


                            if (Growth_Rate > 0) {
                                Present_Amount += (Growth_Rate / 100) * Present_Amount;
                                //myTable.rows[j].cells[2].innerHTML = Math.round(Growth_Rate);

                            }

                            Id += 1;

                            //calculation End

                            //  alert('Year: ' + Id + ' Present_Amount: ' + Present_Amount + ' Growth_Rate: ' + Growth_Rate + ' Expancess : ' + Expancess + '  RatOfInflation ' + RatOfInflation + ' Amount_end_year: ' + Amount_end_year);


                      //  }
                    
                    //var gtotal = 0;
                    //for (var k = 1; k < rows.length - 1 ; k++) {
                    //    gtotal += parseInt(table.rows[k].cells[5].innerHTML);

                    //}
                    //$("#gtotal").html(gtotal);

                    // alert(gtotal);
                            // };
                            var gtotal = 0;
                            for (var k = 1; k < rows.length  ; k++) {
                                gtotal += parseInt(table.rows[k].cells[5].innerHTML);

                            }
                            $("#gtotal").html(gtotal);
                            //document.getElementById("MyElement").style.display = "none";

                            var data1 = gtotal - window;
                            //alert(window);
                            $("#gtotal1").html(data1);
                            document.getElementById("gtotal1").innerHTML = data1;
                            // document.getElementById("MyElement1").style.display = "none";
                            // alert(gtotal);
                            // };
                
                        }
                       
                        if (jsonObj.length > 0) {
                            $("#sample_editable_1").dataTable().fnDestroy();
             $('#sample_editable_1').dataTable({
                 "bPaginate": false,

                 "bLengthChange": false,
                 "bFilter": false,
                 "bSort": false,
                 "bInfo": false,
                 "bAutoWidth": true,
                 "bProcessing": true,
                 "Data": jsonObj,
                 "Columns": [
                    { "data": "Id", "orderable": true },
                    { "data": "Present_Amount", "orderable": true },
                    { "data": "Growth_Rate", "orderable": true },
                    { "data": "Expancess", "orderable": true },
                    { "data": "RatOfInflation", "orderable": true },
                    { "data": "Amount_end_year", "orderable": true },
                    {
                        "data": function (data, type, row, meta) {
                            var user = "";
                            user = "<button id='button'  class='btn btn-success edit' style='padding: 4px 10px;'>Edit</button>";

                            return user;
                        }
                    }
                     ] //These are static columns defined here in JSON object.

            });
                 
         }
                     
                        //$('.edit').show();
                        //$('.save').hide();
                        //$('.cancel').hide();
                   //    editRow(oTable, nRow)
                    //oTable.fnDeleteRow(nEditing);
                    nEditing = null;
                   nNew = false;
                }
             else {
                /* No edit in progress - let's start one */

                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();