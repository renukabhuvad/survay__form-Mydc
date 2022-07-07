var strDobAge;
var strName = '';
var strMobileNo = '';
var strEmailId = '';
var strDOB = '';
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

    $(".emitype").change(function () {
        var selectedItem = $(this).val()
        $(".loanproduct-nav li").each(function (n) {            
            if ($(this).attr("id") == selectedItem) {
                $(this).show();
                $(this).trigger("click");
            }
            else {
                $(this).hide();
            }
        });
        dc($(this).val());
        $('#loan_type').val($(this).val());
    })

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
    fnFocusChange();
}

function fnFocusChange() {
    document.getElementById("txtName").style.borderColor = "#666666";
    document.getElementById("txtMobileNo").style.borderColor = "#666666";
    document.getElementById("txtEmailId").style.borderColor = "#666666";
    //document.getElementById("txtDob").style.borderColor = "#666666";
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
        strEmailId = $("#txtEmailId").val();
        strDOB = $("#txtDob").val();

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
        else {
            GoToPage(true, false, null);
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
