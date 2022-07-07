//==============================================================================================
//				Check Valid Login		: Dinesh B. 28-May-2002
//==============================================================================================

function CheckLoginName(txtBox,txtMsg) 
{		
	var str = txtBox.value;
	txtMsg="";
	if ((str == "") || (str == "Username") || (str == "Member ID") || (str == "Loginname"))
	{
		txtMsg="The Login Name field is blank.\n\nPlease re-enter your Login Name."
		txtBox.focus();
		return txtMsg;
	}
	// Given below validation removed becuase now wealthmagic user can start with numeric field
	//if((str.substring(0,1)<"a" || str.substring(0,1)>"z") && (str.substring(0,1)<"A" || str.substring(0,1)>"Z"))
	//{
	//	txtMsg="The Login Name should begin with an alphabetic character.";
	//	return txtMsg;
	//}
	for (var i = 1; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) && (ch < "0" || "9" < ch) && (ch != '_') && (ch!=".") && (ch!="@")) 
		{
			txtMsg="\nThe Login Name field  accepts letters,numbers & underscore, but not a space!\n\nPlease re-enter your Login Name.";
			txtBox.select();
			txtBox.focus();
			return txtMsg;
		}
	}
	return txtMsg;
}

//==============================================================================================
//				Check Valid Password		: Dinesh B. 28-May-2002
//==============================================================================================

function CheckPassWord(txtBox,txtMsg) 
{
	var str = txtBox.value;
	txtMsg="";
	if ((str == "") || (str == "Password") || (str == "********") || (str.length < 4)) 
	{
		txtMsg="\nThe PASSWORD field is either empty or less than 4 chars.\n\nPlease re-enter your Password.";
		txtBox.focus();
		return txtMsg;
	}
	return txtMsg;
}

//==============================================================================================
//				Check Valid Alphabets		: Dinesh B. 28-May-2002
//==============================================================================================
function CheckAlphabets(txtBox,txtMsg)
{
	var str = txtBox.value;	
	if (str == "")
	{
		txtMsg = txtMsg +  " cannot be blank .\nPlease re-enter your data."
		//txtBox.focus();
		return txtMsg;
	}

	if ((str.charCodeAt(0)>=48) && (str.charCodeAt(0)<=57))
	{
		txtMsg = txtMsg + " Cannot start with number"
		return txtMsg;
	}

	if (str.charAt(0)==" ")
	{
		txtMsg = txtMsg + " Cannot start with blank"
		return txtMsg;
	}

	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i + 1);
		if ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch) && (ch!=" ") && (ch!="'") && (ch!=".")) 
		{
			//txtBox.focus();
			txtMsg="You have entered invalid alphabets!\nPlease re-enter your data."
			return txtMsg;
		}
	}
	txtMsg="";
	return txtMsg;
}

//==============================================================================================
//				Check Valid Role Name		: Dinesh B. 28-May-2002
//==============================================================================================
function CheckRoleName(txtBox,txtMsg)
{
	var str = txtBox.value;	
	txtMsg="";

	if (str == "")
	{
		txtMsg="The Name field is blank .\n\nPlease re-enter your data."
		SetTab("tabBasiInfo");
		txtBox.focus();
		return txtMsg;
	}

	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i + 1);
		if ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch) && (ch!=" ") && (ch!=".") && (ch!="-") && (ch!="_") && (ch!="0") && (ch!="1") && (ch!="2") && (ch!="3") && (ch!="4") && (ch!="5") && (ch!="6") && (ch!="7") && (ch!="8") && (ch!="9")) 
		{
			txtBox.focus();
			txtMsg="\nYou have entered invalid alphabets!\n\nPlease re-enter name."
			return txtMsg;
		}
	}
	return txtMsg;
}
//==============================================================================================
//				Check Valid Email Address: Dinesh B. 28-May-2002
//==============================================================================================

 function CheckEmailAddress(txtBox,txtMsg) 
{
	
	var email = txtBox.value;
	txtMsg="";

	if(email == "") {
		txtMsg="\nEmail address can not be left blank."
		return txtMsg;
	}
	var exclude=/[^@\-\.\w\_]|^[_@\.\-\_]|[\._\-\_]{2}|[@\.\_]{2}|(@)[^@\_]*\1/;
	var checkend=/\.[a-zA-Z]{2,3}$/;
	
//	alert(email.search(exclude));
	// Are there any invalid characters in the address?
	if((email.search(exclude) != -1) || (email.search(checkend) == -1)) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	atPos = email.indexOf("@",0);
	pPos1 = email.indexOf(".",0);
	periodPos = email.indexOf(".",atPos);

	// Are there consecutive periods?
	pos1 = pPos1;
	pos2 = 0;
	while (pos2 > -1) {
		pos2 = email.indexOf(".",pos1+1);
		if (pos2 == pos1+1) {
			txtMsg="Please enter a valid Email address.";
			return txtMsg;
		} else {
			pos1 = pos2;
		}
	}

	// Is there an @ symbol in the address?
	if (atPos == -1) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Is the @ symbol in the first position?
	if (atPos == 0) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Is there a period in the first position?
	if (pPos1 == 0) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Is there more than one @ symbol in the address?
	if(email.indexOf("@",atPos+1) > -1) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Is there a period after the @ symbol?
	if (periodPos == -1) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Is the period imediately after the @ symbol?
	if (atPos+1 == periodPos) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}

	// Are there at least 2 characters after the period?
	if (periodPos+3 > email.length) {
		txtMsg="Please enter a valid Email address.";
		return txtMsg;
	}
	return txtMsg;
}


//==============================================================================================
//				Check Number 
//==============================================================================================

function CheckNumber(txtBox,txtMsg)
{
	
	var txtval;
	txtval = txtBox.value
	
   	if ((txtval == "") || (txtval == " ")) 
	{
		return "Please Enter " + txtMsg		
	}
	else
	{
		if (txtval <= 0)
		{
            return txtMsg + " should be greater than Zero"   
		}
       
		if (isNaN(txtval))
		{
			return txtMsg + " should be Numeric value "
		}
	}
	return ""
 }


//==============================================================================================
// 		Check Number allow Null or Zero Length String
//==============================================================================================    

function CheckNumberNull(txtBox,txtMsg)
{
	var txtval;
	txtval = txtBox.value
    if (txtval == "") 
	{
		return txtMsg + " should be greater than or equal to Zero"
	}
	else
	{
		if (txtval < 0)
		{
        	return txtMsg + " should be greater than or equal to Zero"   
		}
       
	  	if (isNaN(txtval))
		{
			return txtMsg + " should be Numeric value "
		}
	}
	return ""
 }


function CheckNumberDecimal(txtBox, lngDecimal, txtMsg)
{
	//txtBox is the textbox object
	//lngDecimal is the number of decimals to be allowed
	//txtMsg is the message to be displayed 
	
	var decimalposition = txtBox.value.indexOf(".");
	if (decimalposition != "-1")
	{
		var strdecimal = txtBox.value.substring(decimalposition)
		if ((strdecimal.length - 1) > lngDecimal)
		{
			return txtMsg + " " + lngDecimal + " Decimals are allowed"
		}
	}
	return "";
	//last shan 
}

 
//==============================================================================================
// 		Check Number In Combo box for nonselected values
//==============================================================================================

function CheckNumberInCombo(cmbBox,txtMsg)
{
	var txtval;
	if (cmbBox.length != 0)
	{
		txtval = cmbBox.options[cmbBox.selectedIndex].value
	}
	else
	{
		txtval = "0"
	}
	
	
	if (txtval == "") 
	{
		return "Please Select " + txtMsg
	}
	else if (txtval == "0")
	{
		return "Please Select " + txtMsg
	}
	else
	{
		if (txtval < 0)
		{
      		return txtMsg + " should be greater than Zero"
		}
       
		if (isNaN(txtval))
		{
			return txtMsg + " should be Numeric value "
		}
	}
	return ""
 }


//==============================================================================================
// 		Check Value In Combo box for nonselected values
//==============================================================================================

function CheckValueInCombo(cmbBox,txtMsg)
{
	var txtval;
	if (cmbBox.length != 0)
	{
		txtval = cmbBox.options[cmbBox.selectedIndex].value
	}
	else
	{
		txtval == ""
	}
	
	if (txtval == "") 
	{
		//cmbBox.focus();
		return "Please Select " + txtMsg
	}
	else if (txtval == "0")
	{
		//cmbBox.focus();
		return "Please Select " + txtMsg
	}

	return ""
 }

//===========================================================
// 		Check date Format
//=========================================================== 
 
function checkDate(iDay,iMonth,iYear,blnAllowNull) 
{
	var dd = parseInt(iDay,10);
	var mm = parseInt(iMonth,10);
	var yy = parseInt(iYear,10);
	var indexMon = mm;
	var indexDate = dd;
	//alert("dd=" + dd + "mm=" + mm +  "yy=" + yy)

	if (blnAllowNull == true)		//check only when something is selected from the combo
	{
		if (dd == 0 && mm == 0 && yy == 0)
		{
			return "null";
		}
		else
		{
			if (dd==0 || mm==0 || yy==0 || yy=="" || isNaN(yy))
			{
				return ("Invalid Date");
			}
		}	
	}
	else
	{
		if (dd==0 || mm==0 || yy==0 || yy=="" || isNaN(yy))
		{
			return ("Invalid Date");
		}
	}

	if (iYear.length < 4)
	{
		return ("Please Enter Year in long format i.e YYYY");
	}
			
	if (indexMon==1 && (indexDate<1 ||indexDate>31)) 
	{
 		return ("january has 31 days"); 
			
	}
	else if (indexMon==2 && (indexDate<1 ||indexDate>28)) 
	{
		if (indexDate==29)
		{
			//alert("Check for Leap Year")
			var iFirstTwo =  parseInt(iYear.substring(0,2),10)
			var iLastTwo = parseInt(iYear.substring(2,4),10)
			//alert("Remainder" + (iFirstTwo % 4))				 
			if ((yy%4) == 0) 
			{
				if ((iLastTwo == 0) && (iFirstTwo % 4 != 0))
				{
					return (iYear + " is Not a Leap Year")
				}	
			}
			else
			{
				return (iYear + " is Not a Leap Year")
			}
		}
		else
		{
			 return ("February has maximum of 29 days")
		}

	}
	else if (indexMon==3 && (indexDate<1 ||indexDate>31))
	{
	 		return("March has 31 days");  
	}
	else if (indexMon==4 && (indexDate<1 ||indexDate>30)) 
	{
	 		return("April has 30 days"); 
 	}
	else if (indexMon==5 && (indexDate<1 ||indexDate>31)) 
	{
 		return ("May has 31 days"); 
	}
	else if (indexMon==6 && (indexDate<1 ||indexDate>30))
	{
   		return ("June has 30 days"); 
	}
	else if (indexMon==7 && (indexDate<1 ||indexDate>31)) 
	{
	   	return ("July has 31 days"); 
	}
	else if (indexMon==8 && (indexDate<1 ||indexDate>31)) 
	{
		return("August has 31 days"); 
	}
	else if (indexMon==9 && (indexDate<1 ||indexDate>30)) 
	{	
		return ("September has 30 days"); 
	}
	else if (indexMon==10 && (indexDate<1 ||indexDate>31))
	{
		return ("October has 31 days"); 
	}
	else if (indexMon==11 && (indexDate<1 ||indexDate>30)) 
	{
		return ("November has 30 days"); 
 	}
	else if (indexMon==12 && (indexDate<1 ||indexDate>31)) 
	{
	   	return ("December has 31 days"); 
	} 
	
	return ""; 
}		


//==============================================================================================
//	Validate Data In The Object Provided
//==============================================================================================


function ValidateData(obj,Type)
{
	switch (Type.toUpperCase())
	{
		case "INITIAL NUMBER":
		{
			if ((obj.charCodeAt(0)>=48) && (obj.charCodeAt(0)<=57))
			{
				alert("Cannot start with number");
				return true;
			}
			break;
		}
		case "INITIAL BLANK":
		{
			if (obj.charAt(0)==" ")
			{
				alert("Cannot start with blank");
				return true;
			}
			break;			
		}
	}		
	return false;
}



//==============================================================================================
//	Validate Data for spaces and empty data
//==============================================================================================

function IsAllSpace(strField)
{
	for(i=0;i<strField.length;i++)
	{
		if(strField.charAt(i) != " ")
		{
			return false;
		}
	}
	return true;
}
 
function IsEmpty(obj)
{
	
	for (i=0;i<obj.length;i++)
	{
		if (obj.charAt(i)!=" ")
			return false;
	}
	return true;
} 

//==============================================================================================
//	Validate Data for two dates
//==============================================================================================

function compareTwoDate(small_dd,small_mm,small_yy,big_dd,big_mm,big_yy, blnCheckEqual)
{
 var small_date = new Date();
 small_date.setTime(Date.parse(small_mm+" "+small_dd+" "+small_yy));
 var big_date   = new Date();
 big_date.setTime(Date.parse(big_mm+" "+big_dd+" "+big_yy));

 if(blnCheckEqual == true)
 {
 	if (small_date >= big_date)
		return false;
 }	
 else if(small_date > big_date)
 	return false;
 else
	return true;
}


//==============================================================================================
//  Developed By Shan
//	Check Pure Alphabets with the facility to exclude some special characters
//==============================================================================================

function CheckAlphabetsNumeric(txtBox,txtMsg)
{
	//1st argument is the Textbox object
	//2nd argument is the Message to be shown
	//remaining are the arguments for special characters which are to be included
	
	var str = txtBox.value;	
	var i, j;
	
	if (str == "")
	{
		txtMsg = txtMsg +  " cannot be Blank .\nPlease Re-Enter Your Data."
		return txtMsg;
	}
	
	if (str.charAt(0)==" ")
	{
		txtMsg = txtMsg + " cannot start with blank"
		return txtMsg;
	}
	
	if (str.indexOf("'") >= 0 || str.indexOf('"') >= 0)
	{
		txtMsg = txtMsg +  " Cannot Contain Quots.\nPlease Re-Eenter Your Data."
		return txtMsg;
	}
	
	//to create the condition fo special characters to be included
	var args = CheckAlphabetsNumeric.arguments
	var strCondition, ch
	
	strCondition = "";
	ch="";
	
	for (i = 0; i < str.length; i++)
	{
		ch = str.substring(i, i + 1);
		
		for (j=2; j< args.length; j++)
		{
			if (strCondition == "")
			{
				strCondition = '("' + ch + '" != "' + args[j] + '")'
			}
			else
			{
				strCondition = strCondition + ' && ("'  + ch + '" != "' + args[j] + '")'
			}
		}

		//&& (ch!="7") && (ch!="8") && (ch!="9")
		//alert(((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) + " " + ch)
		//alert((ch < "0" || "9" < ch) + " " + ch)
		//alert(eval(strCondition) + " " + ch)
		
		strCondition = (strCondition != "")?"(" + strCondition + ")":"('" + ch + "' != null)"
	//	alert(strCondition)
		if (((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) && (ch < "0" || "9" < ch) && eval(strCondition))
		{
			txtMsg="You Have Entered Invalid Characters!\nSpecial Characters are Not Allowed."
			return txtMsg;
		}
		strCondition = "";
	}
	return "";
}

//new function
function CheckNumericValue(txtBox,txtMsg)
{
	//1st argument is the Textbox object
	//2nd argument is the Message to be shown
	//remaining are the arguments for special characters which are to be included
	
	var str = txtBox.value;
	var i, j;
	
	if (str == "")
	{
		txtMsg = txtMsg +  " cannot be Blank .\nPlease Re-Enter Your Data."
		return txtMsg;
	}
	
	if (str.charAt(0)==" ")
	{
		txtMsg = txtMsg + " cannot start with blank"
		return txtMsg;
	}
	
	if (str.indexOf("'") >= 0 || str.indexOf('"') >= 0)
	{
		txtMsg = txtMsg +  " Cannot Contain Quots.\nPlease Re-Eenter Your Data."
		return txtMsg;
	}
	
	//to create the condition fo special characters to be included
	var args = CheckNumericValue.arguments
	var strCondition, ch
	
	strCondition = "";
	ch="";

	for (i = 0; i < str.length; i++)
	{
		ch = str.substring(i, i + 1);
		
		for (j=2; j< args.length; j++)
		{
			if (strCondition == "")
			{
				strCondition = '("' + ch + '" != "' + args[j] + '")'
			}
			else
			{
				strCondition = strCondition + ' && ("'  + ch + '" != "' + args[j] + '")'
			}
		}

		//&& (ch!="7") && (ch!="8") && (ch!="9")
		//alert(((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) + " " + ch)
		//alert((ch < "0" || "9" < ch) + " " + ch)
		//alert(eval(strCondition) + " " + ch)
		
		strCondition = (strCondition != "")?"(" + strCondition + ")":"('" + ch + "' != null)"
	//	alert(strCondition)
		if ((ch < "0" || "9" < ch) && eval(strCondition))
		{
			txtMsg="Please enter numeric values only."
			return txtMsg;
		}
		strCondition = "";
	}
	return "";
}
//
//==============================================================================================
//	Developed by Girish
//	Decimals restricts the entry of a decimal "."
//==============================================================================================

function noDecimalAllowed(objCtrl,txtMsg)
{
	if (objCtrl.value.indexOf(".") != -1)
	{
		alert("Decimals are not allowed in " + txtMsg);	
		return false;
	}
	return true;
}


function CheckNumberData(txtBox,txtMsg)
{
	var txtval;
	txtval = txtBox.value;

	blnEmpty=IsEmpty(txtval)

	if (blnEmpty==false)
	{
		if (txtval < 0)
		{
		    return txtMsg + " should be greater than Zero"
		}
		       
		if (isNaN(txtval))
		{
			return txtMsg + " should be Numeric value "
		}
	}
	return "";
}

function GetPlanValidity(strPlanNumb)
{
    //Fetch the validations values from the LIC 'v' tables
    var strSql;
	strSql= " SELECT  " 
		  +	"		SLVAge.MiniAge, "   
		  + "		SLVAge.MaxiAge, "  
		  +	"		SLVSum.MiniSum, "   
		  + "	    SLVSum.MaxiSum, "  
		  +	"		SLVSum.SumMult, "  
		  + "		SLPlanMast.TermBonuCode, "  
		  + "		'ALB' = CASE WHEN SLPlanMast.ALB = 1 THEN '1' ELSE '0' END " 
		  +	" FROM SLVAge "  
		  + " INNER JOIN SLVSum ON SLVAge.PlanNumb=SLVSum.PlanNumb "  
		  + " INNER JOIN SLPlanMast ON SLVAge.PlanNumb=SLPlanMast.PlanNumb "  
		  + " WHERE SLPlanMast.PlanNumb = '" + strPlanNumb + "'";
	
	var rstPlanValidity = GetRecordset(strSql);
	return rstPlanValidity;
}

function ValidatePlanAge(intALB, strCommDate, strDOB, intMiniAge, intMaxiAge)
{
	//StrCommDate And StrDOB must be of format 'dd-mmm-yyyy'
	if(!(strDOB == "") && !(strCommDate == ""))
	{
		var objInsuLib = GetInsuLib();
		var intAge = objInsuLib.CalcAge(intALB, strCommDate, strDOB);

		if((parseInt(intAge) < parseInt(intMiniAge)) || (parseInt(intAge) > parseInt(intMaxiAge)))
		{
			alert("Invalid Birth Date! Calculated Age is " + intAge + "\n Minimum Age for this Plan is " + intMiniAge + "\n Maximum Age for this Plan is " + intMaxiAge);
			return false;
		}
		
		return parseInt(intAge);
	}
	return false;	
}


//==============================================================================================
//				Check Valid Email Address: Nikhil  not to be included in pages only for testing
//==============================================================================================
/* 


// Check whether string s is empty.
var whitespace = " \t\n\r";function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}



// Returns true if string s is empty or 
// whitespace characters only.

function isWhitespace (s)

{   var i;

    // Is s empty?
    if (isEmpty(s)) return true;

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);

        if (whitespace.indexOf(c) == -1) return false;
    }

    // All characters are whitespace.
    return true;
}

function isEmail (s)
{   if (isEmpty(s)) 
       if (isEmail.arguments.length == 1) return false;
       else return (isEmail.arguments[1] == true);
   
    // is s whitespace?
    if (isWhitespace(s)) return false;
    
    // there must be >= 1 character before @, so we
    // start looking at character position 1 
    // (i.e. second character)
    var i = 1;
    var sLength = s.length;

    // look for @
    while ((i < sLength) && (s.charAt(i) != "@"))
    { i++
    }

    if ((i >= sLength) || (s.charAt(i) != "@")) return false;
    else i += 2;

    // look for .
    while ((i < sLength) && (s.charAt(i) != "."))
    { i++
    }

    // there must be at least one character after the .
    if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
    else return true;
}




function CheckEmailAddress(txtBox,txtMsg) 
{
	var email = txtBox.value;
	txtMsg="";

	//alert(isEmail(email))
	if(isEmail(email) == false ) {
		//txtMsg="\nEmail address can not be left blank."
		txtMsg="\nInvalid Email Address."
		return txtMsg;
	}

	return txtMsg;
}

*/

//////////////////////////////


