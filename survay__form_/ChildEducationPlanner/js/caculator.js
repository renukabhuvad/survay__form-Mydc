var strDobAge;
var maxNoOfChildren = 5;
var ageStart = 16;
var ageEnd = 25;

function Init() {
    alertify.defaults.transition = "slide";
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
    $(window).bind('scroll', function () {
        var navHeight = $(window).height() - 590;
        if ($(window).scrollTop() > navHeight) {
            $('.top_whiteframe').addClass('fixednav');
        }
        else {
            $('.top_whiteframe').removeClass('fixednav');
        }
    });

    $('.form_datetime').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
}

function fnDateOnchange(dateControlName, ageControlName) {
    fnAgeCalc(dateControlName, ageControlName);
    fnFocusChange();
}

function fnAgeCalc(dateControlName, ageControlName) {
    var today = new Date();
    var stDOB = document.getElementById(dateControlName).value;
    var datearray = stDOB.split('/');
    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    var birthDate = new Date(newdate);
    intAGE = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        intAGE--;
    }

    if (today < strDobAge) {
        fnAlert(dateControlName, 'DOB should be less than current date');
        document.getElementById(dateControlName).style.borderColor = "#ff0000";
        document.getElementById(ageControlName).value = "";
        return false;
    }
    else {
        document.getElementById(ageControlName).value = intAGE;
    }

}

function fnFocusChange() {
    document.getElementById("txtName").style.borderColor = "#666666";
    document.getElementById("txtDob").style.borderColor = "#666666";
    document.getElementById("txtNoOfChildren").style.borderColor = "#666666";

    document.getElementById("txtChildDob1").style.borderColor = "#666666";
    document.getElementById("txtChildAge1").style.borderColor = "#666666";
    document.getElementById("txtChildDob2").style.borderColor = "#666666";
    document.getElementById("txtChildAge2").style.borderColor = "#666666";
    document.getElementById("txtChildDob3").style.borderColor = "#666666";
    document.getElementById("txtChildAge3").style.borderColor = "#666666";
    document.getElementById("txtChildDob4").style.borderColor = "#666666";
    document.getElementById("txtChildAge4").style.borderColor = "#666666";
    document.getElementById("txtChildDob5").style.borderColor = "#666666";
    document.getElementById("txtChildAge5").style.borderColor = "#666666";
}

function fnChildNameChange(childNumber) {
    document.getElementById("txtChildName" + childNumber).style.borderColor = "#666666";
    $("#lblJunioCollege" + childNumber).html($("#txtChildName" + childNumber).val().toUpperCase() + "'s Need Details for Junior College");
    $("#lblGraduation" + childNumber).html($("#txtChildName" + childNumber).val().toUpperCase() + "'s Need Details for Graduation");
    $("#lblPostGraduation" + childNumber).html($("#txtChildName" + childNumber).val().toUpperCase() + "'s Need Details for Post Graduation");
    $("#lblMarriage" + childNumber).html($("#txtChildName" + childNumber).val().toUpperCase() + "'s Need Details for ");
}
function fnAlert(strFieldName, strMessage) {
    alertify.alert("Error", strMessage).set('onok', function (closeEvent) {
        if (strFieldName != "") {
            document.getElementById(strFieldName).focus();
        }
    });
}

function alphOnly(txt, e) {
    var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' ";
    var code;
    if (window.event)
        code = e.keyCode;
    else
        code = e.which;
    var char = keychar = String.fromCharCode(code);
    if (arr.indexOf(char) == -1)
        return false;
}

function isANumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
}

function fnValidate(isChildDetails, childNumber, pageNumber) {
    //handle pages other than child details 
    if (!isChildDetails) {
        //handle the 1st page 
        if (pageNumber == 1) {
            strName = document.getElementById("txtName").value;
            strDOB = document.getElementById("txtDob").value;
            intAge = document.getElementById("txtAge").value;
            stremail = document.getElementById("txtEmail").value;
            intmobile = document.getElementById("txtMobile").value;
            intNoOfChildren = document.getElementById("txtNoOfChildren").value;
            atpos = stremail.indexOf("@");
            dotpos = stremail.lastIndexOf(".");
            filter = (/^\d*(?:\.\d{1,2})?$/) || (charCode > 31 && (charCode < 48 || charCode > 57));
            if (strName == "") {
                fnAlert('txtName', 'Enter proposer name');
                document.getElementById("txtName").style.borderColor = "#ff0000";
                return false;
            }
            else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= stremail.length) {
                fnAlert('txtEmail', 'Enter your correct Email');
                document.getElementById("txtEmail").style.borderColor = "#ff0000";
                return false;
            }
            else if (intmobile == "" || isNaN(intmobile) || intmobile.length != 10) {
                fnAlert('txtMobile', 'Enter Correct Mobile No');
                document.getElementById("txtMobile").style.borderColor = "#ff0000";
                return false;
            }
            else if (strDOB == "") {
                fnAlert('txtDob', 'Select DOB');
                document.getElementById("txtDob").style.borderColor = "#ff0000";
                return false;
            }
            else if (parseInt(intAge) < 0) {
                fnAlert('txtDob', 'Select proper DOB');
                document.getElementById("txtDob").style.borderColor = "#ff0000";
                return false;
            }
            
            else if (intNoOfChildren == "") {
                fnAlert('txtNoOfChildren', 'Enter no of children');
                document.getElementById("txtNoOfChildren").style.borderColor = "#ff0000";
                return false;
            }
            else if (parseInt(intNoOfChildren) == NaN || parseInt(intNoOfChildren) <= 0) {
                fnAlert('txtNoOfChildren', 'No on children must be greater than 0');
                document.getElementById("txtNoOfChildren").style.borderColor = "#ff0000";
                return false;
            }
            else {
                GoToPage(true, false, null);
            }
        }

        if (pageNumber == 3) {
            intCurrSavings = document.getElementById("txtCurrSavings").value;

            if (intCurrSavings == "") {
                fnAlert('txtCurrSavings', 'Enter your current savings');
                document.getElementById("txtCurrSavings").style.borderColor = "#ff0000";
                return false;
            }
            else {
                postDataToServer();
            }
        }
    }
    else {
        //handle 1st page for the child details
        if (pageNumber == 1) {
            strName = document.getElementById("txtChildName" + childNumber).value;
            strDOB = document.getElementById("txtChildDob" + childNumber).value;
            intAge = document.getElementById("txtChildAge" + childNumber).value;
            gender = $("#hdGender" + childNumber).val();

            if (strName == "") {
                fnAlert('txtChildName' + childNumber, 'Enter child name');
                document.getElementById("txtChildName" + childNumber).style.borderColor = "#ff0000";
                return false;
            }
            else if (strDOB == "") {
                fnAlert('txtChildDob' + childNumber, 'Select DOB');
                document.getElementById("txtChildDob" + childNumber).style.borderColor = "#ff0000";
                return false;
            }
            else if (parseInt(intAge) < 0) {
                fnAlert('txtChildDob' + childNumber, 'Select proper DOB');
                document.getElementById("txtChildDob" + childNumber).style.borderColor = "#ff0000";
                return false;
            }
            else if (gender == "") {
                fnAlert('', 'Select gender');
                return false;
            }
            else {
                GoToPage(true, false, null);
            }
        }
    }
}

function GoToPage(isNext, isPrev, pageNumber) {
    var currentPageNumber = $("#CurrentStepNumber").val();
    var currentPageNumberInt = parseInt(currentPageNumber);
    if (isNext) {
        currentPageNumberInt += 1;
    }
    else if (isPrev) {
        currentPageNumberInt -= 1;
    }
    else {
        currentPageNumberInt = pageNumber;
    }
    $("#CurrentStepNumber").val(currentPageNumberInt);
    $("#myCarousel").carousel(currentPageNumberInt);
}

function GoToNextChild() {
    var currentPageNumber = $("#CurrentStepNumber").val();
    var currentPageNumberInt = parseInt(currentPageNumber);
    var currentChildNumber = currentPageNumberInt / 5;
    var noOfChildren = $("#txtNoOfChildren").val();
    var noOfChildrenInt = parseInt(noOfChildren);
    //5, 10, 15 ,20, 25 last step numbers for children
    if (currentChildNumber == noOfChildrenInt) {
        //skip next children
        GoToPage(false, false, (maxNoOfChildren * 5) + 1);
    }
    else {
        //go to next child
        GoToPage(true, false, null);
    }
}

function GoToLastChild() {
    var noOfChildren = $("#txtNoOfChildren").val();
    var noOfChildrenInt = parseInt(noOfChildren);
    //5, 10, 15 ,20, 25 last step numbers for children
    GoToPage(false, false, noOfChildrenInt * 5);
}

function setGender(gender, childNumber) {
    if (gender == "Male") {
        $("#txtChildMale" + childNumber).addClass("HLV_maleActive");
        $("#txtChildFemale" + childNumber).removeClass("HLV_femaleActive");
        $(".imgGender" + childNumber).attr("src", "../../ChildEducationPlanner/images/child_boyFull.png");
        $("#hdGender" + childNumber).val("Male");
    }
    else {
        $("#txtChildMale" + childNumber).removeClass("HLV_maleActive");
        $("#txtChildFemale" + childNumber).addClass("HLV_femaleActive");
        $(".imgGender" + childNumber).attr("src", "../../ChildEducationPlanner/images/child_girlFull.png");
        $("#hdGender" + childNumber).val("Female");
    }
}

function postDataToServer() {
    var chpCalcInput =
    {
        Name: $("#txtName").val(),
        DOB: $("#txtDob").val(),
        Age: $("#txtAge").val(),
        CurrentSavings: $("#txtCurrSavings").val(),
        NoOfChildren: $("#txtNoOfChildren").val(),
        ChildDetails: []
    };
    for (var childNo = 1; childNo <= maxNoOfChildren; childNo++) {
        var childObj = {};
        childObj.Id = $("#hdChildId" + childNo).val();
        childObj.Name = $("#txtChildName" + childNo).val();
        childObj.DOB = $("#txtChildDob" + childNo).val();
        childObj.Age = $("#txtChildAge" + childNo).val();
        childObj.Gender = $("#hdGender" + childNo).val();
        childObj.Expenses = [];
        for (var expenseNo = ageStart; expenseNo <= ageEnd; expenseNo++) {
            var expenseObj = {};
            expenseObj.Age = expenseNo;
            expenseObj.EstimatedAmount = $("#txtEstimatedAmount_" + expenseNo + "_" + childNo).val();
            expenseObj.InflationRate = $("#txtInflationRate_" + expenseNo + "_" + childNo).val();
            childObj.Expenses.push(expenseObj);
        }
        chpCalcInput.ChildDetails.push(childObj);
    }
    //console.log(JSON.stringify(chpCalcInput, null, 4));
    //document.getElementById('contact_message').value = JSON.parse(chpCalcInput);
    //var obj = JSON.parse('chpCalcInput');
    //obj = JSON.parse(chpCalcInput);
    console.log(JSON.stringify(chpCalcInput));
    //document.getElementById("contact_message").value = JSON.stringify(JSON.stringify(chpCalcInput)).toString();
    $.ajax({
        url: '../ChildEducationCalculator',
        type: 'POST',
        data: JSON.stringify(chpCalcInput),
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);

            $("#txtTotalNeed").val(json.TotalExpense);
            $("#txtTotalNeeds").html(json.TotalExpense);
            $("#txtTotalGap").val(json.Gap);
            $("#txtTotal_Gap").html(json.Gap);
            $("#txtTotalSavings").val(json.CurrentSavings);
            $("#txtTotal_Saving").html(json.CurrentSavings);
            $("#contactTotalNeed").val(parseInt(json.TotalExpense));
            $("#contactTotalGap").val(parseInt(json.Gap));
            $("#contactTotalSavings").val(parseInt(json.TotalSavings));
            for (var childNo = 1; childNo <= maxNoOfChildren; childNo++) {
                if (childNo <= json.NoOfChildren) {
                    $("#dvSummary" + childNo).show();
                    $("#txtName" + childNo).val(json.ChildDetails[childNo - 1].Name.toUpperCase());
                    $("#txtDOB" + childNo).val(json.ChildDetails[childNo - 1].DOB);
                    $("#txtCurrentAge" + childNo).val(json.ChildDetails[childNo - 1].Age);
                    $("#txtTotalNeed" + childNo).val(json.ChildDetails[childNo - 1].TotalExpense);
                    $("#contactTotalNeed" + childNo).val(json.ChildDetails[childNo - 1].TotalExpense);
                }
                else {
                    $("#dvSummary" + childNo).hide();
                }
            }
            $("#cepMessage").html(json.Message);
            var cepCover = Math.round(json.CurrentSavings / json.TotalExpense * 100);
            cepCoverText = "Child Expense Cover";
            cepOther = 100 - cepCover;
            var cepOtherText = "Total Gap";

            strArray = "['" + cepCoverText.replace("'", "") + "'," + cepCover + "],";
            strArray += "['" + cepOtherText + "'," + cepOther + "],";

            strArray = "[" + strArray.substring(0, strArray.length - 1) + "]";

            fnGraphComp(strArray.replace(/\"/g, ""));

            GoToPage(true, false, null);
        },
        error: function (x) {
            alert('Failed' + x);
        }
    });
}
function fnGraphComp(mf) {

    var srtPiePlot = mf.replace(/'/g, "\"");
    var srtPiePlotArray = JSON.parse(srtPiePlot);

    // Build the chart
    $(document).ready(function ()
    {
        Highcharts.setOptions({
            colors: ['#fc6bac', '#7b67fb', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#058DC7', '#50B432', '#ED561B']
        });


        //Highcharts.chart('chartContainer', {
        //    chart: {
        //        plotBackgroundColor: null,
        //        plotBorderWidth: null,
        //        plotShadow: false,
        //        type: 'pie'
        //    },
        //    title: {
        //        text: 'Children Financial Security Calculator'
        //    },
        //    tooltip: {
        //        pointFormat: '{series.name}: <b>{point.y:.2f}%</b>'

        //    },
        //    plotOptions: {
        //        pie: {
        //            allowPointSelect: true,
        //            cursor: 'pointer',
        //            dataLabels: {
        //                enabled: false,
        //                format: '<b>{point.name}</b>: {point.y:.2f} %',

        //                style: {
        //                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        //                }
        //            },
        //            showInLegend: true
        //        }
        //    },
        //    series: [{
        //        name: 'percent',
        //        colorByPoint: true,
        //        data: srtPiePlotArray


        //    }]
        //});

        //$(window).resize(function () {
        //    var chart = $('chartContainer').highcharts();

        //    console.log('redraw');
        //    var w = $('chartContainer').closest(".wrapper").width()
        //    // setsize will trigger the graph redraw 
        //    chart.setSize(
        //        w, w * (3 / 4), false
        //    );
        //});


        Highcharts.chart('containercharts', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Child Education Planner Calculator'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    }
                },
                  showInLegend: true
            },
            series: [{
                type: 'pie',
                name: 'Percent',
                data: srtPiePlotArray
            }]
        });

        $(window).resize(function () {
            var chart = $('containercharts').highcharts();

            console.log('redraw');
           // var w = $('chartContainer').closest(".wrapper").width()
           var w= 100%
            // setsize will trigger the graph redraw 
            chart.setSize(
                w, w * (3 / 4), false
            );
        });

    });

}

function calculateAmount(age, childNo) {
    var estimatedAmount = $("#txtEstimatedAmount_" + age + "_" + childNo).val();
    estimatedAmount = parseInt(estimatedAmount);
    var inflation = $("#txtInflationRate_" + age + "_" + childNo).val();
    inflation = parseInt(inflation);
    var currentAge = $("#txtChildAge" + childNo).val();
    currentAge = parseInt(currentAge);

    var runningAmount = estimatedAmount;
    for (var yearNo = currentAge; yearNo < parseInt(age) ; yearNo++) {
        runningAmount = runningAmount * (1 + inflation / 100);
    }
    $("#txtCalculatedAmount_" + age + "_" + childNo).val(Math.round(runningAmount));
}

function setProfession(childNo, age, name) {
    $(".profession" + childNo).each(function (index) {
        $(this).removeClass("HLV_singleActive");
        if ($(this).attr("title").split('|')[0] === name) {
            $("#txtEstimatedAmount_" + age + "_" + childNo).val($(this).attr("title").split('|')[1]);
            $("#lblProfEducation" + childNo).html(name);
            calculateAmount(age, childNo);
            $(this).addClass("HLV_singleActive");
        }
    });
}