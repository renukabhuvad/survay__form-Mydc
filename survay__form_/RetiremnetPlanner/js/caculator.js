var strDobAge;
var maxNoOfExpenses = 8;
var strName = '';
var strMobileNo = '';
var gender = '';
var strEmailId = '';
var strDOB = '';
var retirementAge = 0;
var inflationRate = 0;
var interestRate = 0;
var currentSavings = 0;
var pensionAge = 0;
var monthlyIncomeOption = 0;
var monthlyExpense = 0;
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
    //$(".detailed").hide();
    //$(".radio-inline").click(function () {
    //    var monthlyIncomeOption = $("input[name=optradio]:checked").val();
    //    if (monthlyIncomeOption == "M") {
    //        $(".detailed").hide();
    //        $(".monthly").show();
    //    }
    //    else {
    //        $(".detailed").show();
    //        $(".monthly").hide();
    //    }
    //});
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
    document.getElementById("txtMobileNo").style.borderColor = "#666666";
    document.getElementById("txtEmailId").style.borderColor = "#666666";
    document.getElementById("txtDob").style.borderColor = "#666666";
    document.getElementById("txtRetirementAge").style.borderColor = "#666666";
    document.getElementById("txtInflationRate").style.borderColor = "#666666";
    document.getElementById("txtInterestRate").style.borderColor = "#666666";
    document.getElementById("txtCurrentSavings").style.borderColor = "#666666";
    document.getElementById("txtPensionAge").style.borderColor = "#666666";

    document.getElementById("txtMonthlyExpense").style.borderColor = "#666666";
    for (var itemNo = 1; itemNo <= maxNoOfExpenses; itemNo++) {
        document.getElementById("txtMonthlyExpense" + itemNo).style.borderColor = "#666666";
    }
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

function fnValidate(pageNumber) {
    //handle pages
    //handle the 1st page 
    if (pageNumber == 1) {
        strName = $("#txtName").val();
        strMobileNo = $("#txtMobileNo").val();
        gender = $("#hdGender").val();
        strEmailId = $("#txtEmailId").val();
        strDOB = $("#txtDob").val();
        retirementAge = $("#txtRetirementAge").val();
        if (strName == "") {
            fnAlert('txtName', 'Enter name');
            document.getElementById("txtName").style.borderColor = "#ff0000";
            return false;
        }
        if (strMobileNo == "") {
            fnAlert('txtMobileNo', 'Enter mobile number');
            document.getElementById("txtMobileNo").style.borderColor = "#ff0000";
            return false;
        }
        else if (strMobileNo.length < 10) {
            fnAlert('txtMobileNo', 'Enter valid mobile number');
            document.getElementById("txtMobileNo").style.borderColor = "#ff0000";
            return false;
        }
        if (strEmailId == "") {
            fnAlert('txtEmailId', 'Enter email id');
            document.getElementById("txtEmailId").style.borderColor = "#ff0000";
            return false;
        }
        else {
            var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            if (!pattern.test(strEmailId)) {
                fnAlert('txtEmailId', 'Enter valid email id');
                document.getElementById("txtEmailId").style.borderColor = "#ff0000";
                return false;
            }
        }
        if (strDOB == "") {
            fnAlert('txtDob', 'Enter DOB');
            document.getElementById("txtDob").style.borderColor = "#ff0000";
            return false;
        }
        if (retirementAge == "") {
            fnAlert('txtRetirementAge', 'Enter retirement age');
            document.getElementById("txtRetirementAge").style.borderColor = "#ff0000";
            return false;
        }
        else {
            if (parseInt(retirementAge) < parseInt($("#txtAge").val())) {
                fnAlert('txtRetirementAge', 'Retirement age should be greater than current age');
                document.getElementById("txtRetirementAge").style.borderColor = "#ff0000";
                return false;
            }
        }
        if (gender == "") {
            fnAlert('', 'Select gender');
            return false;
        }
        else {
            GoToPage(true, false, null);
        }
    }
    if (pageNumber == 2) {
        //strEmailId = $("#txtEmailId").val();
        //strDOB = $("#txtDob").val();
        //retirementAge = $("#txtRetirementAge").val();
        inflationRate = $("#txtInflationRate").val();
        interestRate = $("#txtInterestRate").val();
        currentSavings = $("#txtCurrentSavings").val();
        pensionAge = $("#txtPensionAge").val();

        //if (strEmailId == "") {
        //    fnAlert('txtEmailId', 'Enter email id');
        //    document.getElementById("txtEmailId").style.borderColor = "#ff0000";
        //    return false;
        //}
        //else {
        //    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
        //    if (!pattern.test(strEmailId)) {
        //        fnAlert('txtEmailId', 'Enter valid email id');
        //        document.getElementById("txtEmailId").style.borderColor = "#ff0000";
        //        return false;
        //    }
        //}
        //if (strDOB == "") {
        //    fnAlert('txtDob', 'Enter DOB');
        //    document.getElementById("txtDob").style.borderColor = "#ff0000";
        //    return false;
        //}
        //if (retirementAge == "") {
        //    fnAlert('txtRetirementAge', 'Enter retirement age');
        //    document.getElementById("txtRetirementAge").style.borderColor = "#ff0000";
        //    return false;
        //}
        //else {
        //    if (parseInt(retirementAge) < parseInt($("#txtAge").val())) {
        //        fnAlert('txtRetirementAge', 'Retirement age should be greater than current age');
        //        document.getElementById("txtRetirementAge").style.borderColor = "#ff0000";
        //        return false;
        //    }
        //}

        if (currentSavings == "") {
            $("#txtCurrentSavings").val("0");
        }
        if (interestRate == "") {
            fnAlert('txtInterestRate', 'Enter interest rate on Saving');
            document.getElementById("txtInterestRate").style.borderColor = "#ff0000";
            return false;
        }
        if (inflationRate == "") {
            $("#txtInflationRate").val("0");
        }

        if (pensionAge == "") {
            fnAlert('txtPensionAge', 'Enter age till pension is required');
            document.getElementById("txtPensionAge").style.borderColor = "#ff0000";
            return false;
        }
        else {
            if (parseInt(pensionAge) < parseInt(retirementAge)) {
                fnAlert('txtPensionAge', 'age till pension is required should be greater than retirement age');
                document.getElementById("txtPensionAge").style.borderColor = "#ff0000";
                return false;
            }
        }
        GoToPage(true, false, null);
    }
    if (pageNumber == 3) {
        //monthlyIncomeOption = $("input[name=optradio]:active").val();
        monthlyIncomeOption = $('.tab-pane').attr('class');
        monthlyExpense = 0;
        if (monthlyIncomeOption == "tab-pane fade active in") {
            monthlyExpense = parseInt($("#txtMonthlyExpense").val());
            if (monthlyExpense == 0) {
                fnAlert('txtMonthlyExpense', 'Monthly expense can not be 0');
                document.getElementById("txtMonthlyExpense").style.borderColor = "#ff0000";
                return false;
            }
        }
        else {
            for (var itemNo = 1; itemNo <= maxNoOfExpenses; itemNo++) {
                monthlyExpense += parseInt($("#txtMonthlyExpense" + itemNo).val());
            }

            if (monthlyExpense == 0) {
                fnAlert('txtMonthlyExpense1', 'Monthly expense can not be 0');
                for (var itemNo = 1; itemNo <= maxNoOfExpenses; itemNo++) {
                    document.getElementById("txtMonthlyExpense" + itemNo).style.borderColor = "#ff0000";
                }
                return false;
            }
        }
        postDataToServer();
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

function setGender(gender) {
    if (gender == "Male") {
        $("#txtMale").addClass("HLV_maleActive");
        $("#txtFemale").removeClass("HLV_femaleActive");
        $(".imgGender").attr("src", "../../RetiremnetPlanner/images/retirement_male.png");
        $("#hdGender").val("Male");
    }
    else {
        $("#txtMale").removeClass("HLV_maleActive");
        $("#txtFemale").addClass("HLV_femaleActive");
        $(".imgGender").attr("src", "../../RetiremnetPlanner/images/retirement_female.png");
        $("#hdGender").val("Male");
    }

}

function postDataToServer() {
    var rpCalcInput =
    {
        Name: strName,
        MobileNo: strMobileNo,
        Gender: gender,
        EmailId: strEmailId,
        DOB: strDOB,
        Age: $("#txtAge").val(),
        RetirementAge: retirementAge,
        InflationRate: inflationRate,
        InterestRate: interestRate,
        CurrentSavings: currentSavings,
        PensionAge: pensionAge,
        IsDetailedMonthlyExpense: monthlyIncomeOption == "C",
        MonthlyExpense: monthlyExpense,
    };
    console.log(JSON.stringify(rpCalcInput));
    $.ajax({
        url: '../RetirementPlanCalculator',
        type: 'POST',
        data: JSON.stringify(rpCalcInput),
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);
            $("#txtTotalNeed").val(parseInt(json.TotalNeed));
            $("#txtTotalGap").val(parseInt(json.Gap));
            $("#txtTotalSavings").val(parseInt(json.TotalSavings));
            $("#rpMessage").html(json.Message);
            GoToPage(true, false, null);
        },
        error: function (x) {
            alert('Failed' + x);
        }
    });
}
