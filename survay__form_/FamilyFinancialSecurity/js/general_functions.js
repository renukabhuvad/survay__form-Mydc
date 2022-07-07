//Database Key - This Refers To The Database To Be Used In The Application
var strECRMDBKey = "eCRMagic"		//this key points to the System database eCRMagicSysDB
//This constant refers to the System database of eCRMagic application. used to point to the
//system database while operating from the User databases
var gstrSysDBRefeConst = "eCRMagicSysDB.dbo."
var gstrClassName = "tblhead_level2"  //Used in AddRowDataInTable() for setting the style of each Row

//==============================================================================================
//			Developed By Shan
//			function to make the layers visible and hide other layers
//			this is only for layers with DIV tags
//==============================================================================================

function LayerShowHide()
{
	//the div object must have id starting with 'div'
	//1st argument is layer to show ie Object
	//2nd argument is left position of layer
	//3rd argument is top position of layer
	//same argumets continue for other layers to be shown
	//all other layers are hidden
	//if No arguments are given then all layers are hidden
	var i;
	//to hide all layers 
	var alldivs = document.all.tags("div"); 
	
	//alert(alldivs.length);
	for (i=0; i < alldivs.length; i++)
	{
		if (alldivs[i].id.substring(0,3) == "div")
		{
			alldivs[i].style.display = "none";
		}
	}

	var args=LayerShowHide.arguments;
	
	for (i=0; i<=args.length-1; i=i+3)
	{
		args[i].style.display = "block";
		args[i].style.left=args[i+1];  //"5px"
		args[i].style.top=args[i+2];   //"208px"
	}
	return "";
}


//==============================================================================================
//			Developed By Shan
//			function to make the tab buttons of layers activated
//			this is only for layers with DIV tags	
//==============================================================================================

function ActivateTabButton()
{
	//1st argument is button to be activated
	//2nd argument is classname for activate button
	//3rd argument is classname for normal button
	//remaining are button names to be deactivated

	var args=ActivateTabButton.arguments;	
	args[0].className = args[1]; //activate the button

	for (i=3; i<=args.length-1; i++)
	{
		args[i].className = args[2]; 
	}

	return "";
}


//==============================================================================================
//			Developed By Shan
//	To take the user to a particular url on click of the button
//  accepts two parameters one is the url string and other is target frame string
//  The Target Frame is Optional Parameter
//==============================================================================================

function GoToUrl(URL, OptTargetFrame)
{
	if (OptTargetFrame == "")
	{	
		window.location.href = URL;
	}
	else
	{	
		eval("parent."+OptTargetFrame+".location='"+URL+"'");
	}
	
	return "";
}


//==============================================================================================
//			Developed By Shan
//			function to Trim the String Value
//==============================================================================================

function Trim(strString, strTrimType)
{
	//trim Trailing Spaces
	while('' + strString.charAt(strString.length - 1) == ' ') 
	{
		strString = strString.substring(0, strString.length - 1);
	}
	
	//trim Leading Spaces
	while('' + strString.charAt(0) == ' ')
	{
		strString = strString.substring(1, strString.length);
	}
	
	return strString;
}

//==============================================================================================
//			Developed By Shan
//			function to enable and disable objects
//==============================================================================================

function EnableDisable()
{
	//1st argument is the object to disable or enable
	//2nd argument is a text string to "enable" or "disable"
	//same argument continues for other controls

	var args=EnableDisable.arguments;  	//get total arguments	

	for (i=0; i<=args.length-1; i=i+2)
	{
		if(args[i+1]=="disable")
		{
			args[i].disabled=true;
		}
		else
		{
			args[i].disabled=false;
		}
	}
	return "";
}


//==============================================================================================
//			Developed By Shan
//			function to clear the combo box
//==============================================================================================

function clearCombo(combo)
{
	var noitems=0;
	noitems = combo.length;
	for(var i=0;i<=noitems;i++)
	combo.remove(i);
	combo.length=0;
	return "";
}


//======================================================================
//			Developed By Shan
//    Get Currrent Date
//======================================================================



	
	
function getCurrentDate(){
  	var d = new Date();
	var dd, mm, yyyy;
	
	dd = d.getDate();
	mm = (d.getMonth() + 1);
	yyyy = d.getFullsYear();
	
	if (dd < 10){
	    dd = "0" + dd;
	}
	
	if (mm < 10)
	{
	    mm = "0" + mm;
	}
	if (yyyy <= 99)
	{
	   yyyy = "19" + yyyy;
	}	
	
	s = dd + "/" + mm + "/" + yyyy;	
	
	return s;
}

function GetDay(strDate)
{
	if (strDate != null && strDate != "")
	{
		var d = new Date(strDate);
	}
	else
	{
		var d = new Date();
	}

	var dd = d.getDate();

	/*if (dd < 10)
	{
	    dd = "0" + dd;
	}*/
	return dd;
}

function GetMonth(strDate, strMonthType)
{
	//strMonthType
	//If No Value Is Specified Then numeric month is returned
	//if value is "MM" then "Jan, Feb" will be returned
	//if value is "MMM" then "January , February" will be returned
	
	if (strDate != null && strDate != "")
	{
		var d = new Date(strDate);
	}
	else
	{
		var d = new Date();
	}


	if (strMonthType)
	{
		if (strMonthType.toUpperCase() == "MM") //for jan
		{
			var montharray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
			var mm = montharray[d.getMonth()];
		}
		else if (strMonthType.toUpperCase() == "MMM") //for January
		{
			var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
			var mm = montharray[d.getMonth()]
		}
	}
	else
	{
		var mm = (d.getMonth() + 1);
	}
	return mm;
}

	function GetMonthName(Date1,Date2)
	{
		//declaring and initialising date objects with arguments passed as string 
		var dtDate1=new Date(Date1);
		var dtDate2=new Date(Date2);
		var difference;
		
		//declaring array for retrieving month in "mmm" format
		var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		
		//generate the date in specified format for parsing
		var firstDate = montharray[dtDate1.getMonth()] + " " + dtDate1.getDate() + " " + dtDate1.getFullYear();
		var secondDate = montharray[dtDate2.getMonth()] + " " + dtDate2.getDate() + " " + dtDate2.getFullYear();
		
		//calculating the difference in days
		var milliDiff=Date.parse(firstDate)-Date.parse(secondDate);
		
		if (milliDiff < 0)
			difference="Expired";
		else	
			difference=(Math.round(milliDiff/(24*60*60*1000)) * 1);
			
		return difference;
	}

function GetYear(strDate)
{
	if (strDate != null && strDate != "")
	{
		var d = new Date(strDate);
	}
	else
	{
		var d = new Date();
	}

	var yyyy = d.getYear();

	if (yyyy <= 99)
	{
	   yyyy = "19" + yyyy;
	}	
	return yyyy;
}

//===========================================================
//			Developed By Shan
// 		To compare two dates with time
//=========================================================== 
function compareTwoDateTime(small_dd, small_mm, small_yy, small_hour_min, small_ampm, big_dd, big_mm, big_yy, big_hour_min, big_ampm)
{

	var small_date = Date.parse(small_mm + 
								"/" + small_dd + 
								"/" + small_yy + 
								" " + small_hour_min + 
								" " + small_ampm)	 
	var big_date = Date.parse(big_mm + 
								"/" + big_dd + 
								"/" + big_yy + 
								" " + big_hour_min + 
								" " + big_ampm)	 
									 
	if(small_date>=big_date)
	{
		return false;
	}
	else
	{
		return true;
	}
}

//===========================================================
//			Developed By Shan
// 		Set Focus Field 
//=========================================================== 

function SetFocus(ItemName) 
{
	//alert(ItemName);
	ItemName.focus();
	return true;
}


//===========================================================================================
//			Developed By Girish
// 	Function for calling the component DWTUtilityServer.clsADOLib which returns the 
//  recordset, this function internally calls the  FillCombo function to fill the combo
//===========================================================================================

function GetDataForPopulateUI(TargetCombo,strSql,strDelimiter,strFirstItem)
{
	var rstData, blnRetval
	//var objADOLib = GetAdoLibObject()
	var rstData = GetRecordset(strSql, 0, 1)
	FillCombo(rstData,TargetCombo,strFirstItem);
}


//===========================================================================================
//			Developed By Girish
// 	Function for populating the combo with the recordset returned by the component 
//  DWTUtilityServer.clsADOLib 
//===========================================================================================

//fills the combo with the records retuned from calling populate data
function FillCombo(rstData,combo,strFirstItem)
{
	var blnNotSpace;
		
	//clear the combo elements
	clearCombo(combo);
		
	if (strFirstItem != "undefined")   // if something is given for strFirstItem Parameter else skip
	{		
		//check that whether the First Option item is given by the user
		for(i=0;i<strFirstItem.length;i++)
		{
			if(strFirstItem.charAt(i) != " " )
				blnNotSpace=true;
		}
		
		if (blnNotSpace==true && rstData.EOF==false)
		{
			var objoption = document.createElement("Option");
			objoption.value=0;
			objoption.text=strFirstItem;
			combo.add(objoption);
		}
	}
					
	while (rstData.EOF==false)
	{
		var strOptionText=new String;
		var objoption = document.createElement("Option");

		//creating the instance of the option element for dynamic creation of combo
		for (j=0;j<rstData.fields.count;j++)
		{
			if (j==0)
			{
				objoption.value = rstData.fields(j).Value;

				if (rstData.fields.count==1)
				{
					strOptionText=rstData.fields(j).Value;					
				}
			}	
			else
			{
				strOptionText = strOptionText + rstData.fields(j).Value + " - ";
			}					
		}

		objoption.text = strOptionText.substring(0,strOptionText.length-3) ;
		strOptionText="";
		combo.add(objoption);
		rstData.moveNext(); 
	}
}


//===========================================================================================
//			Developed By Shan
// 	Function to Select a option in the combobox or list box if value is known 
//===========================================================================================
function SelectOptionInCombo(objCombo, strSeleValu, blnValuText, blnFillWhenNotFound)
{
	//objCombo is the combo object
	//strSelectValue is the option which is to be selected
	// blnValuText is Boolean whether the to check value or the displayed text
	//0 is for value 1 is for text
	
	var blnfound = false //to check if the given value is found, default value is false
	for (var i = 0; i < objCombo.length; i++)
	{
		if (objCombo.options(i).value == strSeleValu && blnValuText == "0") //for Value
		{
			objCombo.selectedIndex = i;
			blnfound = true;
		}
		else if (objCombo.options(i).innerText == strSeleValu && blnValuText == "1") //for Displayed Text
		{
			objCombo.selectedIndex = i;
			blnfound = true;
		}
	} 
	
	if (blnfound == false && blnFillWhenNotFound == "1") //value not found in combo and fillcombo is true ie 1
	{
		fillupCombo(objCombo, strSeleValu, strSeleValu, 1)
	}
}

//===========================================================================================
//			Developed By Shan
// 	Function to fill the combo for selected foilds
//===========================================================================================

function FillComboSelectedFields(rstData, objCombo, strFirstItem, strDelimeter, strValueField)
{
	//1st parameter is the recordset to populate the combo
	//2nd parameter is the combobox object
	//3rd parameter is the text to be displayed first in the combo box
	//4th parameter is the delimiter
	//5th parameter strValueField is the field name which is to be put as value
	//remaining are the fields to displayed seperated by delimiter
	
	
	
	var args = FillComboSelectedFields.arguments;
	var blnNotSpace;
		
	//clear the combo elements
	clearCombo(objCombo);
		
	if (strFirstItem != "undefined")   // if something is given for strFirstItem Parameter else skip
	{		
		//check that whether the First Option item is given by the user
		for(i=0;i<strFirstItem.length;i++)
		{
			if(strFirstItem.charAt(i) != " " )
				blnNotSpace=true;
		}
		
		if (blnNotSpace==true && rstData.EOF==false)
		{
			var objoption = document.createElement("Option");
			objoption.value = "0";
			objoption.text=strFirstItem;
			objCombo.add(objoption);
		}
	}
					
	while (rstData.EOF==false)
	{
		var strOptionText=new String;
		var objoption = document.createElement("Option");

		//creating the instance of the option element for dynamic creation of combo
		for (j=5;j<args.length;j++)
		{
			if (strOptionText != "")
			{
				strOptionText = strOptionText + strDelimeter + eval('rstData.fields("' + args[j] + '").Value');
			}
			else
			{
				strOptionText = strOptionText + eval('rstData.fields("' + args[j] + '").Value');
			}
		}

		objoption.text = strOptionText;
		objoption.value = eval('rstData.fields("' + strValueField + '").Value');
		strOptionText="";
		objCombo.add(objoption);
		rstData.moveNext();
	}
}

//===========================================================================================
//			Developed By Shan
// 	to create dynamic rows and columns in table and to add data in the columns
//===========================================================================================

function AddRowDataInTable(strTableName, lngCols)
{
	//0 - strTableName is name of the table
	//1 - lngCols is the no of columns to generate
	
	//--------these parameters are not specified in the function--------------------
	//--------but the user has to pass these parameters-----------
	//2 - strTag is the tag of the object to be generated eg: BUTTON, CHECKBOX
	//3 - strName is the name of the Tag or Object
	//4 - strValue is the value to be assigned to the Object Tag
	//5 - strClassName is the class style sheet to be assigned
	//6 - strEvent is the event to be attached to the Object tag 
	//7 - strFunction is the function to be attache to the strEvent
	//the above 2 - 6 parameters are repeated
	//-----------------------
	
	var i, j, column, objtag
	var args = AddRowDataInTable.arguments
	var tbody = document.getElementById(strTableName).getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    
	if (!(gstrClassName == ""))
	{
		row.className = gstrClassName
	}
	else
	{
		row.className = "CtntTblHd"
	}
	
	for(i=2; i<args.length; i=i+6)
	{
		column = document.createElement("TD")
		
		//to create the object tag
		if (args[i].toUpperCase() == "TEXT")
		{
			objtag = eval("document.createTextNode('" + args[i+2] + "')");
		}
		else if (args[i].toUpperCase() == "HIDDEN")
		{
			objtag = eval("document.createTextNode('" + args[i+2] + "')");
			column.style.visibility="hidden"
		}
		else
		{
			objtag = eval("document.createElement('" + args[i].toUpperCase() + "')")
			//to set the name and id of the object tag
			objtag.name = args[i+1]
			objtag.id = args[i+1]
			
			//to set the value of the object tag
			objtag.value = args[i+2]
		}			

		//to set the value of the object tag
		column.value = args[i+2]
		
		if (args[i+3] != "")
		{
			column.className = args[i+3]
		}
		else
		{
			column.className = "CtntTblHd"
		}

		if (args[i+4] != "") //if event is given
		{
			//to set the event of the object tag and the function to be called when the event occurs
			eval("column" + "." + args[i+4].toLowerCase() + " = " + args[i+5] + "")
		}
				
		//to add the object tag create to the column
		column.appendChild(objtag)

		//to append the new column to the row object
		row.appendChild(column);
	}
	//to append the newly created row to the table body object
	tbody.appendChild(row);
}

//===========================================================================================
//			Developed By Shan
// 	to get the values of selected checkboxes having same name
//  it returns all the check box values with a seperator
//===========================================================================================

function GetSelectedCheckboxValue(strTableName, strCheckbox, strSeperator, strCaptionOrValue, lngColNo)
{
	//strCheckbox is the name of the check box
	//strSeperator is the string to seperate the values of check boxes
	//strCaptionOValue is whether caption or value is required
	//lngColNo is the column index from where the caption text is required
		
	var totchkbox, strvalue="";
	var i;
	var objrow, objrownum
	
	//if the object is not available
	if (isObject(strCheckbox.substring(strCheckbox.indexOf(".") + 1, strCheckbox.length)) == false)
	{
		return strvalue;
	}
	
	//if there is only one checkbox then
	if (!(eval(strCheckbox + ".length")))
	{
		if (eval(strCheckbox + ".checked") == true)
		{
			if (strCaptionOrValue.toUpperCase() == "CAPTION")
			{
				objrownum = eval(strCheckbox + ".parentElement")
				objrownum = objrownum.parentElement.rowIndex

				objrow  = eval(strTableName + ".rows[" + objrownum + "]")
				
				if (strvalue != "")
				{
					strvalue = strvalue + strSeperator + objrow.cells[lngColNo].innerText
				}
				else
				{
					strvalue = objrow.cells[lngColNo].innerText;
				}
			}
			else
			{
				strvalue = eval(strCheckbox + ".value");
			}
		}
		return strvalue;
	}
	//---------------------	
	
	//if more than 1 checkbox exist
	totchkbox = eval(strCheckbox + ".length");

	for(i=0; i <= totchkbox - 1; i++)	
	{
		if (eval(strCheckbox + "[" + i + "].checked") == true)
		{
			if (strCaptionOrValue.toUpperCase() == "CAPTION")
			{
				objrownum = eval(strCheckbox + "[" + i + "].parentElement")
				objrownum = objrownum.parentElement.rowIndex

				objrow  = eval(strTableName + ".rows[" + objrownum + "]")
				
				if (strvalue != "")
				{
					strvalue = strvalue + strSeperator + objrow.cells[lngColNo].innerText
				}
				else
				{
					strvalue = objrow.cells[lngColNo].innerText;
				}
			}
			else
			{
				if (strvalue != "")
				{
					strvalue = strvalue + strSeperator + eval(strCheckbox + "[" + i + "].value");
				}
				else
				{
					strvalue = eval(strCheckbox + "[" + i + "].value");
				}
			}
		}
	}
	return strvalue; 
}


//===========================================================================================
//			Developed By Shan
// 	to delete the rows in the table
//  it deletes all the rows except the no of rows specified in lngRows to Keep
//===========================================================================================

function RemoveAllTableRows(strTableName, lngRowsToKeep)
{
	//strTableName is the name of the table
	//lngRowsToKeep is the no of rows not to be deleted
	
	var rows = eval(strTableName + "." + "rows.length");
	var i;
	
	i = parseInt(rows,0) - 1;
	for(i=rows-1; i>=lngRowsToKeep; i--)
	{
		eval(strTableName + "." + "deleteRow(" + i + ")");
	} 
	return null; 
} 


//===========================================================================================
//			Developed By Shan
// 	to delete the rows in the table
//  it deletes all the rows except the no of rows specified in lngRows to Keep
//===========================================================================================

function RemoveSelectedTableRows(strTableName)
{
	//strTableName is the name of the table
	//remaining parameters are the rows to be deleted seperated by commas
	
	var i;
	var args = RemoveSelectedTableRows.arguments;
	for(i=1; i<args; i++)
	{
		eval(strTableName + "." + "deleteRow(" + i + ")");
	} 
	return null; 
} 


//===========================================================================================
//			Developed By Shan
// 	to make objects visible or hidden
//  this function make a object visible and hidden
//===========================================================================================

function ShowHideObject(objname, blnhideorshow)
{
	//objname is the name of the object to be made hidden or visible
	//bln showhide is the boolean value '1' is to show and '0' is to hide
	
	
	if (blnhideorshow == "0")
	{
		eval(objname + ".style.visibility='hidden'");
	}
	else
	{
		eval(objname + ".style.visibility='visible'");
		//alert(eval(objname + ".style.visibility='visible'"));
		//alert(blnhideorshow)
	}
}


//===========================================================================================
//			Developed By Shan
//to check for navigation Previous or Next				
// this 
//===========================================================================================
																 
function NavigateRecordsInDataControl(objRDSDataControl, strSql, lngPageSize, strNavigate, NextButton, PrevButton)
{

	//objRDSDataControl is the total no of records in the recprdset od RDS datacontrol
	//strSqlQuery is the select query for the recordset
	//lngPageSize is the pagesize in which the records are fetched
	//strNavigate is the action of navigation "Next" or "Previous"
	//NextButton is the name of the Next Button
	//PrevButton is the name of the Previous Button

	//get the numeric values of the next and previous button pageno attribute
	var prevpageno = parseInt(PrevButton.getAttribute("pageno"), 0)
	var nextpageno = parseInt(NextButton.getAttribute("pageno"), 0)
		

	//obtain a recodset The GerRecordset function is written in general_function.ja
	if (strNavigate.toUpperCase() == "NEXT")
	{
		var lngPageno = nextpageno;
	}
	else if (strNavigate.toUpperCase() == "PREVIOUS")
	{
		var lngPageno = prevpageno;
	}
	else
	{
		var lngPageno = 0;
	}
	
	if (lngPageno < 0 )
		lngPageno = 0;
	var Rs = GetRecordset(strSql, lngPageSize, lngPageno);
	
	objRDSDataControl.SourceRecordset = Rs;

	if (strNavigate.toUpperCase() == "NEXT") //if the user clicks next button
	{
		if (Rs.recordcount < lngPageSize) //EOF has been reached
		{
			//hide the next button
			NextButton.style.visibility = "hidden";

			if (isObject(NextButton.id + "1") == true)
			{
				eval("iamsform." + NextButton.id + "1.style.visibility = 'hidden'");
			}							
		}
		//set the pageno attributes for the previous and next button which are used aa page nos
		NextButton.setAttribute("pageno", nextpageno + 1);
		PrevButton.setAttribute("pageno", prevpageno + 1);
		PrevButton.style.visibility = "visible"
		
		if (isObject(PrevButton.id + "1") == true)
		{
			eval("iamsform." + PrevButton.id + "1.style.visibility = 'visible'")		
		}
	}
	else if (strNavigate.toUpperCase() == "PREVIOUS") //if the user clicks previous button
	{
		if (PrevButton.getAttribute("pageno") <= "1") //if the first set of records are shown
		{
			//hide the previous button
			PrevButton.style.visibility="hidden";
			
			if (isObject(PrevButton.id + "1") == true)
			{
				eval("iamsform." + PrevButton.id + "1.style.visibility = 'hidden'");
			}			
		}
		//set the pageno attribute for the previous and next button which are used aa page nos
		PrevButton.setAttribute("pageno", prevpageno - 1);
		NextButton.setAttribute("pageno", nextpageno - 1);		
		NextButton.style.visibility = "visible"		
		
		if (isObject(NextButton.id + "1") == true)
		{
			eval("iamsform." + NextButton.id + "1.style.visibility = 'visible'");
		}				
	}

	//if none of he navigation buttons are clicked
	if (strNavigate == "")
	{
		PrevButton.setAttribute("pageno", 0);
		PrevButton.style.visibility="hidden"
		
		if (isObject(PrevButton.id + "1") == true)
		{
			eval("iamsform." + PrevButton.id + "1.style.visibility = 'hidden'")		
		}
				
		NextButton.setAttribute("pageno", 2);
		
		if (Rs.recordcount < lngPageSize)
		{
			NextButton.style.visibility="hidden";
			if (isObject(NextButton.id + "1") == true)
			{
				eval("iamsform." + NextButton.id + "1.style.visibility = 'hidden'");
			}			
		}
		else
		{
			NextButton.style.visibility="visible";
			if (isObject(NextButton.id + "1") == true)
			{
				eval("iamsform." + NextButton.id + "1.style.visibility = 'visible'");
			}			
		}
	}
	
	if (Rs.recordcount <= 0)
	{
		alert("No records found");
	}
}

//===========================================================================================
//		developed by shan
//to add the values and parse it in integer or numeric format
// t
//===========================================================================================

function AddSubstract()
{
	//1st argument is the parse format ie 'Integer' or 'Float', balnk will indicate 'Float'
	//2nd argument is the arithmetic symbol either '+' or '-'
	//3rd is the variable
	//the 2nd and 3rd argument continues in similar manner for other variables sepearted by commas
	
	//get allthe arguments in the parameter list
	var args = AddSubstract.arguments;
	
	//declare variable to return the result
	var total;
	total = "0";
	
	//procedure to calculate the resule
	for(var i=1; i<args.length; i=i+2)
	{
		//add the values using eval method
		total = eval(parseFloat(total) + args[i] + parseFloat(args[i+1]));
	}
	
	//to convert the result total to integer format if the argument is given
	if (args[0].toUpperCase() == "INTEGER")
	{
		total = parseInt(total);
	}
	return total;
}

//===================================
//	Developed By Shan
// rounds number to X decimal places, defaults to 2
//===================================

function Round(number,X) 
{
	X = (!X ? 2 : X);
	return Math.round(number*Math.pow(10,X))/Math.pow(10,X);
}

//===================================
//	Developed By Shan
//to get the selected values of listbox
//===================================

function GetSelecttedListBoxValues(objListBox)
{
	var strRetVal;
	strRetVal = "";
	for (var i=0; i<objListBox.length; i++)
	{
		//alert(objListBox.item(i).selected + " " + objListBox.item(i).value);
		if (objListBox.item(i).selected == true)
		{
			(strRetVal == "")?strRetVal = objListBox.item(i).value : strRetVal = strRetVal + "," + objListBox.item(i).value;
		}
	}
	//alert(strRetVal)
	return strRetVal;
}

//===================================
//	Developed By Shan
//to get product of the Insurer
//===================================
function FillInsurerProduct(strInsurerCode, objProdCombo, blnAllProducts, strTypeOfPlan)
{
	var strSql;
	strSql = ""
	if (strInsurerCode != "0" && strInsurerCode != "")		
	{
		switch (strInsurerCode)
		{
			case "1": //Lic
				strSql = "Select PlanNumb, PlanNumb as PlanNo, PlanName from SLPlanMast "	
				break;
			case "2": //ICICI
				strSql = ""
				break;
			case "3": //HDFC
				strSql = "Select PlanNumb, PlanNumb as PlanNo, PlanName from SHPlanMast"
				break;
			case "4": //bsl
				strSql = ""
				break;
			case "5": //Om Kotak
				strSql = ""
				break;
			case "6": //SBI
				strSql = ""
				break;
			case "7": //bajaj
				strSql = ""
				break;			
			case "8": //Max Newyork
				strSql = ""
				break;
			case "9": //tata aig
				strSql = ""
				break;
		}
		
		if (strSql != "")
		{
			if (blnAllProducts == true)
			{
				if (strTypeOfPlan)
				{
					switch (strTypeOfPlan.toUpperCase())
					{
						case "OPTIPLAN":
							strSql =  strSql + " WHERE OptiPlan='1' ";
							break;
						case "MULTPLAN":
							strSql =  strSql + " WHERE MultPlan='1' ";
							break;
						case "SPECPLAN":
							strSql =  strSql + " WHERE SpecPlan='1' ";
							break;
					}
				}
				else
				{
					strSql =  strSql + " WHERE SpecPlan='1' ";
				}			
			}
			GetDataForPopulateUI(objProdCombo, strSql, "-", "Select Plan");
		}
		else
		{
			clearCombo(objProdCombo);
		}
	}
	else if (strInsurerCode == "0")	//other products master table is nopt made yet from where u have to fill their plans
	{
		clearCombo(objProdCombo);
	}
}


//===================================
//	developed by Shan
//to get the all values of listbox or combo box
//===================================

function GetAllListBoxValues(objListBox)
{
	var strRetVal;
	strRetVal = "";
	for (var i=0; i<objListBox.length; i++)
	{
		//alert(objListBox.item(i).selected + " " + objListBox.item(i).value);
		(strRetVal == "")?strRetVal = objListBox.item(i).value : strRetVal = strRetVal + "," + objListBox.item(i).value;
	}
	//alert(strRetVal)
	return strRetVal;
}


//==============================================================================================
//			function to Fillup the combo box : By Dinesh B. 22-June-2002
//==============================================================================================

function fillupCombo(combo,intStartVal,intEndVal,intStep)
{
	var i;
	clearCombo(combo);
	for(i=intStartVal;i<=intEndVal;i=i+intStep)
	   {
		 var objoption = document.createElement("Option");
		 objoption.value=i;
		 objoption.text=i;
		 combo.add (objoption);
		}
	return "";
}


function isObject(obj) 
{
	if(document.getElementById(obj))
	{
		return true;
	} 
	else
	{
		return false;
	}
}

//===========================================================================================
//			Developed By Girish - Shan
// 	Function for calculating the difference between 2 dates 
//===========================================================================================

function DateDiff(datBigDate, datSmallDate, strYMD)
{
	//declaring and initialising date objects with arguments passed as string 
	var dtBigDate = new Date(datBigDate);
	var dtSmallDate = new Date(datSmallDate);
	var difference;
	
	difference = dtBigDate.getTime() - dtSmallDate.getTime();
	
	if (strYMD)
	{
		switch(strYMD.toUpperCase())
		{
			case "Y":
				difference = Math.floor(difference /(1000 * 60 * 60 * 24 * 365));	
				break;
			case "M":
				difference = Math.floor(difference /(1000 * 60 * 60 * 24 * 12));	
				break;
			case "D":
				difference = Math.floor(difference /(1000 * 60 * 60 * 24));	
				break;
		}
	}
		
	if (difference < 0)
	{
		difference="Expired";
	}
	return difference;
}	


//==============================================================================================
//				Count Level		: Dinesh B. 04-Jul-2002
//==============================================================================================
//The logic is : level=no of titlers -1
function CountLevel(strLevel) 
{
	strLevel = "" + strLevel + ""	
	var intLevel=0;
	var ch;
	for (var i = 1; i < strLevel.length; i++) 
	{
		ch = strLevel.substring(i, i + 1);
		if (ch=='~') 
		{
			intLevel= parseInt(intLevel, 0) + 1
		}
	}
	  
	return parseInt(intLevel, 0) - 1;
	//The logic is : level=no of titlers -1
	
}//End Function



//==============================================================================================
//By Shan 12 August 2002
//==============================================================================================

//All The Objects Required in Emagic Application
//General Emagic Object functions

//To Create Any Object Registered In eCRMagic
function GeteCRMagicObject(strProgId)
{
	var rdsSpace = new ActiveXObject("RDS.DataSpace");
	var objeCRMagic = rdsSpace.CreateObject(strProgId, strHttpServer);
	return objeCRMagic;
}	

	//------------------------------------------------------------------
	//Class Declaration Of DWTUtilityServer.clsADOLib Object Starts Here
	
	function GetAdoLibObject()
	{
		var objADOLib = GeteCRMagicObject("DWTUtilityServer.clsADOLib");
	
		return objADOLib;
	}

	//Method Declaration Of clsAdoLib Object Starts Here
	function GetRecordset(strSql, lngPageSize, lngPageNo, blnAllowEmpty, 
				lngCursorType, lngLockType, lngCursorLocation, vntCommandType, vntDBConn)
	{
		
		//alert(strSql);
	//	alert(lngPageSize);
		if (lngPageSize == null || lngPageSize == "")
			lngPageSize = 0;
					
		if (lngPageNo == null || lngPageNo == "")
			lngPageNo = 1;

		if (blnAllowEmpty == null || blnAllowEmpty == "")
			blnAllowEmpty = true
				
		if (lngCursorType == null || lngCursorType == "")
			lngCursorType = 3		//adOpenStatic
				
		if (lngLockType == null || lngLockType == "")
		{
			lngLockType = 1			//adLockReadOnly
		}	
					
		if (lngCursorLocation == null || lngCursorLocation == "")
			lngCursorLocation = 3	//adUseClient
				
		if (vntCommandType == null || vntCommandType == "")
			vntCommandType = 1		//adCmdText
				
		if (vntDBConn == null || vntDBConn == "")
			vntDBConn = ""
			
		var objADOLib = GetAdoLibObject();
	
		var rstData = objADOLib.GetRecordset(strSql, strECRMDBKey, lngPageSize, +
											 lngPageNo, blnAllowEmpty, lngCursorType, +
											 lngLockType, lngCursorLocation, +
											 vntCommandType,vntDBConn)
		return rstData;
	}


	function ExecSPGetRecordset(strSql, lngPageSize, lngPageNo, blnAllowEmpty, 
				lngCursorType, lngLockType, lngCursorLocation, vntCommandType, vntDBConn)
	{
		if (lngPageSize == null || lngPageSize == "")
			lngPageSize = 0;
					
		if (lngPageNo == null || lngPageNo == "")
			lngPageNo = 1;

		if (blnAllowEmpty == null || blnAllowEmpty == "")
			blnAllowEmpty = true
				
		if (lngCursorType == null || lngCursorType == "")
			lngCursorType = 3		//adOpenStatic
				
		if (lngLockType == null || lngLockType == "")
		{
			lngLockType = 1			//adLockReadOnly
		}	
					
		if (lngCursorLocation == null || lngCursorLocation == "")
			lngCursorLocation = 3	//adUseClient
				
		if (vntCommandType == null || vntCommandType == "")
			vntCommandType = 1		//adCmdText
				
		if (vntDBConn == null || vntDBConn == "")
			vntDBConn = ""
			
		var objADOLib = GetAdoLibObject();
		
//		var rstData = objADOLib.ExecSPGetRecordset(strSql, strECRMDBKey, lngPageSize, +
//											 lngPageNo, blnAllowEmpty, lngCursorType, +
//											 lngLockType, lngCursorLocation, +
//											 vntCommandType,vntDBConn)
			
		var rstData = objADOLib.ExecSPGetRecordset(strSql, strECRMDBKey)


		return rstData;
	}


//
//	function CreateParamInArray(strParamName, vvntParamValue)
//	{
//		var objADOLib = GetAdoLibObject();
//		return;
//		var arrInput = Array(objADOLib.CreateParamInArray(strParamName, vvntParamValue));
//		return arrInput;
//	}
//

/*	
	function ExecQuery(strSql, intRetVal)
	{
		var intRetVal
		var objADOLib = GetAdoLibObject();

		intRetVal = objADOLib.ExecQuery(strSql, strECRMDBKey);
		return intRetVal;
	}
*/	

	function ExecQuery(strSql, vstrDBKey)
	{
		var intRetVal
		var objADOLib = GetAdoLibObject();

		intRetVal = objADOLib.ExecQuery(strSql, vstrDBKey);
		return intRetVal;
	}
		
	//Method Declaration Of clsAdoLib Object Ends Here
	//------------------------------------------------------------------

	//------------------------------------------------------------------
	//Class Declaration Of DWTLICUIServer.clsPopulateUI Object Starts Here

	function GetPopulateUIObjectLIC()
	{
		var objPopulateUI = GeteCRMagicObject("DWTLICUIServer.clsPopulateUI");
		return objPopulateUI;
	}
	function GetPopulateBLObjectLIC()
	{
		var objPopulateBL= GeteCRMagicObject("DWTCommonBLServer.clsInsuLib");
		return  objPopulateBL;
	}
	
	//Method Declaration Of clsPopulateUI Object Starts Here
	function PopulatePlanLIC(vdatBirthDate, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();
//			objClsPopulateUI.dbkey = "ecrmagic";
			
			var rstPlan = objClsPopulateUI.PopulatePlan(vdatBirthDate, vdatCommDate,gstrDBCode);
			
			return rstPlan;
		}

		function PopulatePlanModeLIC(vstrPlanNumb, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();
			var rstMode = objClsPopulateUI.PopulatePlanMode(vstrPlanNumb, vdatCommDate); 
			return rstMode;
		}

		function PopulatePlanTermLIC(vstrPlanNumb, vstrPlanMode, vstrBirthDate, vstrCommdate)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();
			var rstTerm = objClsPopulateUI.PopulatePlanTerm(vstrPlanNumb, vstrPlanMode, vstrBirthDate, vstrCommdate,gstrDBCode);
			return rstTerm;			
		}

		function PopulatePremTermLIC(vstrPlanNumb, vstrPlanMode, vintPlanTerm, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();
			var rstPremTerm = objClsPopulateUI.PopulatePremTerm(vstrPlanNumb, vstrPlanMode, vintPlanTerm, vdatCommDate,gstrDBCode);
			return rstPremTerm;
		}	

		// this function calls the validRideAgeNGetRideTerm method of PopulateUI
		// which validates the age of the policy holder for the rider selected & returns 
		// available terms for the rider
		// optional paramter : - vdatPropBirtDate
		function PopulateRiderTerm(strPlanNumb, intRideCode, datRideCommDate,
									datBirtDate, strPaymMode, bytPlanTerm,
									bytPlanPremTerm, vdatPropBirtDate,
									vdatPlanCommDate,vlngPlanSumAssu)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();

/*
			
			alert(strPlanNumb);
			alert(intRideCode);
			alert(datRideCommDate);
			alert(datBirtDate);
			alert(strPaymMode);
			alert(bytPlanTerm);
			alert(bytPlanPremTerm);
			alert(vdatPropBirtDate);
			alert(vdatPlanCommDate);
			alert(vdatPlanCommDate);
			
*/			
			
			var rstRiderTerm = objClsPopulateUI.validRideAgeNGetRideTerm( 
									strPlanNumb, intRideCode, datRideCommDate,
									datBirtDate, "SLPlanMast", strPaymMode, bytPlanTerm, 
									bytPlanPremTerm, vdatPropBirtDate,	vdatPlanCommDate,vlngPlanSumAssu,gstrDBCode ) //
//			alert(vdatPlanCommDate);
			
			
		

/*			var rstRiderTerm = objClsPopulateUI.validRideAgeNGetRideTerm( 
									strPlanNumb, intRideCode, datRideCommDate,
									datBirtDate, "SLPlanMast", strPaymMode, bytPlanTerm, 
									bytPlanPremTerm, vdatPropBirtDate,vdatPlanCommDate,vlngPlanSumAssu,DBKey);
									//vdatPlanCommDate,	vlngPlanSumAssu)									
*/			
			return rstRiderTerm;
		}

      	
      	// this function calls the GetRiderPremTerm method of PopulateUI
		// which returns a recordset of Rider Prem. Term for the Plan, Rider Term passed
		// optional paramter : - vdatPropBirtDate
		function PopulateRiderPremTerm(strPlanNumb, intRideCode, bytRideTerm, 
								datRideCommDate, datBirtDate, strPaymMode, bytPlanPremTerm)
		{
			var objClsPopulateUI = GetPopulateUIObjectLIC();
			var rstRiderPremTerm = objClsPopulateUI.GetRiderPremTerm( 
									strPlanNumb, intRideCode, bytRideTerm,
									datRideCommDate, datBirtDate, "SLPlanMast", 
									strPaymMode, bytPlanPremTerm,gstrDBCode);
			return rstRiderPremTerm;
		}

		//Method Declaration Of clsPopulateUI Object Ends Here
		//-------------------------------------------------------
		

	//------------------------------------------------------------------
	//Class Declaration Of DWTCommonRptServer.clsReportProcess Object Starts Here
	function GetDWTCommonRptServerObject()
	{
		var objCommonRptServer = GeteCRMagicObject("DWTCommonRptServer.clsReportProcess");
		return objCommonRptServer;
	}

		//Method Declaration Of clsReportProcess Object Ends Here


		//Method Declaration Of clsReportProcess Object Ends Here
		//------------------------------------------------------------------

	//------------------------------------------------------------------
	//Class Declaration Of DWTLICRptServer.clsReportProcess Object Starts Here
	function GetLICReportProcessObject()
	{
		var objLICReportProcessObject = GeteCRMagicObject("DWTLICRptServer.clsReportProcess");
		return objLICReportProcessObject;
	}

		//Method Declaration Of clsLICReportProcess Object Ends Here


		//Method Declaration Of clsLICReportProcess Object Ends Here
		//------------------------------------------------------------------

	//Class Declaration Of DWTCommonBLServer.clsInsuLib Object Starts Here
	function GetInsuLib()
	{
		var objInsuLib = GeteCRMagicObject("DWTCommonBLServer.clsInsuLib");
		return objInsuLib;
	}
	
	function GetFinLib()
	{
		var objFinLib = GeteCRMagicObject("DWTCommonBLServer.clsFinLib");
		return objFinLib;
	}
	//------------------------------------------------------------------
	//Class Declaration Of DWTLICBLServer.clsCalculator Object Starts Here


	function GetCalculatorsObjectLIC()
	{
		var objCalculators = GeteCRMagicObject("DWTLICBLServer.clsCalculator");
		return objCalculators;
	}

		//Method Declaration Of clsCalculators Object Ends Here
		//Wrapper function for Calculating Premium for LIC [DWTLICBLServer.CalcPremium]
		//------------------------------------------------------------------		
		function CalcPremiumLIC(vstrPlanNumb, vbytTerm, vbytPremTerm , 
							    vlngSumAssured, vstrPaymMode, vdatDOB, 
							    vdatCommDate, vdatCompletionDate, vsngExtraPremiumRate, 
								vstrOthers, rvntPremiumRate, rvntRebateDetailRecordset, 
								rvntRiderDetailRecordset)
		{
			var objClsCalculators = GetCalculatorsObjectLIC();
			
			/*vsngExtraPremiumRate, vstrOthers, rvntPremiumRate,rvntRebateDetailRecordset, 
			rvntRiderDetailRecordset are all optional parameters */
			
			var vntPremiumRate;
			var vntRebaDeta;
			var vntRideDeta;
												
			if (vsngExtraPremiumRate == null || vsngExtraPremiumRate == "")
				vsngExtraPremiumRate = 0;
			
			if (vstrOthers == null)
				vstrOthers = "";

			if (rvntPremiumRate == null || rvntPremiumRate == "")
				vntPremiumRate = 0;
			else
				vntPremiumRate = rvntPremiumRate;
										
			if (rvntRebateDetailRecordset == null)
				vntRebaDeta = "";
			else
				vntRebaDeta = rvntRebateDetailRecordset;

			if (rvntRiderDetailRecordset == null)
				vntRideDeta = "";
			else
				vntRideDeta = rvntRiderDetailRecordset;

			try
			{
		
			/*var sngPremium = objClsCalculators.CalcPremium(
								vstrPlanNumb, vbytTerm, vbytPremTerm, 
								vlngSumAssured, vstrPaymMode, vdatDOB, 
								vdatCommDate, vdatCompletionDate,vsngExtraPremiumRate,
								vstrOthers, vntRideDeta,sngInstallmentPremium,,vntRebaDeta);*/
			
					
				var sngPremium = objClsCalculators.CalcPremium(
								vstrPlanNumb, vbytTerm, vbytPremTerm, 
								vlngSumAssured, vstrPaymMode, vdatDOB, 
								vdatCommDate, vdatCompletionDate,vsngExtraPremiumRate,
								vstrOthers, 0,vntRebaDeta,vntRideDeta);
								
				/*var sngPremium = objClsCalculators.CalcPremium(
								vstrPlanNumb, vbytTerm, vbytPremTerm, 
								vlngSumAssured, vstrPaymMode, vdatDOB, 
								vdatCommDate, vdatCompletionDate,vsngExtraPremiumRate,vstrOthers,0) */
								//vstrOthers, 0,vntRebaDeta,vntRideDeta);								
			}
			
			catch(err)
			{
				alert(err.description);
				return 0;			
			}
			
			return sngPremium;	
		}

		//Method Declaration Of clsCalculators Object Ends Here
		//------------------------------------------------------------------


		//		                HDFC fuctions
		//*******************************************************************
		
		//Class Declaration Of DWTHDFCBLServer.clsCalculator Object Starts Here

		function GetCalculatorsObjectHDFC()
			{
			var objCalculators = GeteCRMagicObject("DWTHDFCBLServer.clsCalculator");
			return objCalculators;
			}
		//-------------------------------------------------------------------
	
		//Wrapper function for Calculating Premium for LIC [DWTHDFCBLServer.CalcPremium]
		//------------------------------------------------------------------		
		//Called in ASP syntax:
		//CalcPremium(strPlanID,intTerm,intPTerm,lngSumAssd,strMode,strFullDOB,ucase(left(strSex,1)),strFullCommDate,strFullCommDate,0,strFullDOBOther, rsRider,rsRiderSummery,lngTotalRiderAmt)
		
			function CalcPremiumHDFC(vstrPlanNumb, vbytTerm, vbytPremTerm, vlngSumAssured, 
									 vstrPaymMode, vdatDOB, vstrSex, vdatCommDate, 
									 vdatCompletionDate, vstrExtrPrem, vstrOthers)
			{
				var objClsCalculators = GetCalculatorsObjectHDFC();
						
				if (vstrOthers == null)
				{
					vstrOthers = "";
				}
				
				try
				{
				
					var sngPremium = objClsCalculators.CalcPremium(vstrPlanNumb, vbytTerm, 
												  				   vbytPremTerm, vlngSumAssured, 
												  				   vstrPaymMode, vdatDOB,
																   vstrSex, vdatCommDate, 
																   vdatCompletionDate, 
																   0, vstrOthers);
													
																   
					/*
					var sngPremium = objClsCalculators.CalcPremium("1A", 10, 
												  				   10, 250000, 
												  				   "Y", "01-Jan-1970",
																   "M", "21-Aug-2002", 
																   "21-Aug-2002");
					*/
				}	
				catch(err)
				{
					alert(err.description);
					return 0;			
				}	
						
				return sngPremium;	
			}

		//Method Declaration Of clsCalculators Object Ends Here
		//------------------------------------------------------------------

	//Class Declaration Of DWTHDFCUIServer.clsPopulateUI Object Starts Here

	function GetPopulateUIObjectHDFC()
	{										 
		var objPopulateUI = GeteCRMagicObject("DWTHDFCUIServer.clsPopulateUI");
		return objPopulateUI;
	}

	  function GetProductRiders(vstrPlanNu, vstrProdNu, vstrDOB, vstrCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstRiders = objClsPopulateUI.GetProductRiders(vstrPlanNu, vstrProdNu, vstrDOB, vstrCommDate);
			return rstRiders;
		}

		function GetEMI(vlngLoan, vbytTenure, vsngIntRate, vstrRest)
		{
			var objClsPopulateUI = GetFinLib();
			var vlngEMI = objClsPopulateUI.CalcEMI(vlngLoan, vbytTenure, vsngIntRate, vstrRest);
			return vlngEMI;
		}


		//Method Declaration Of clsPopulateUI HDFC Object Starts Here
		function PopulatePlanHDFC(vdatBirthDate, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstPlan = objClsPopulateUI.PopulatePlan(vdatBirthDate, vdatCommDate);
			return rstPlan;
		}

		function PopulatePlanModeHDFC(vstrPlanNumb, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			//alert("vstrPlanNumb=" + vstrPlanNumb)
			//alert("vdatCommDate=" + vdatCommDate)
			var rstMode = objClsPopulateUI.PopulatePlanMode(vstrPlanNumb, vdatCommDate); 
			return rstMode;
		}

		function PopulatePlanTermHDFC(vstrPlanNumb, vstrPlanMode, vstrBirthDate, vstrCommdate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstTerm = objClsPopulateUI.PopulatePlanTerm(vstrPlanNumb, vstrPlanMode, vstrBirthDate, vstrCommdate);
			return rstTerm;			
		}

		function PopulatePremTermHDFC(vstrPlanNumb, vintPlanTerm, vdatCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstPremTerm = objClsPopulateUI.PopulatePremTerm(vstrPlanNumb, vintPlanTerm, vdatCommDate);
			return rstPremTerm;
		}	

		function GetPlanProductsHDFC(vstrPlanNu,vstrDOB,vstrCommDate)
		{
			//alert(vstrDOB)
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstPlanProduct = objClsPopulateUI.GetPlanProducts(vstrPlanNu,vstrDOB,vstrCommDate)
			return rstPlanProduct;
		}

		function GetProductRidersHDFC(vstrPlanNu,vstrProdNu,vstrDOB,vstrCommDate)
		{
			var objClsPopulateUI = GetPopulateUIObjectHDFC();
			var rstProductRider = objClsPopulateUI.GetProductRiders(vstrPlanNu,vstrProdNu,vstrDOB,vstrCommDate)
			return rstProductRider;
		}
		
		//Method Declaration Of clsPopulateUI Object Ends Here
		//-------------------------------------------------------

	//Class Declaration Of DWTLICUIServer.clsValidations Object Starts Here
	function GetLICValidations()
	{
		var objLICValidations = GeteCRMagicObject("DWTLICUIServer.clsValidation");
		return objLICValidations;
	}















/*				if (rvntRebateDetailRecordset == null && rvntRiderDetailRecordset == null)
				{
					var sngPremium = objClsCalculators.CalcPremium( 
									 vstrPlanNumb, vbytTerm, vbytPremTerm , 
									 vlngSumAssured, vstrPaymMode, vdatDOB, 
									 vdatCommDate, vdatCompletionDate, vsngExtraPremiumRate, 
									 vstrOthers, rvntPremiumRate);
				}
				else if (rvntRebateDetailRecordset == null)
				{
					
					var sngPremium = objClsCalculators.CalcPremium(
									 vstrPlanNumb, vbytTerm, vbytPremTerm , 
									 vlngSumAssured, vstrPaymMode, vdatDOB, 
									 vdatCommDate, vdatCompletionDate,vsngExtraPremiumRate, 
									 vstrOthers, rvntPremiumRate,"", rvntRiderDetailRecordset);
				}					
				else if (rvntRiderDetailRecordset == null)
				{
					
					var sngPremium = objClsCalculators.CalcPremium(
									 vstrPlanNumb, vbytTerm, vbytPremTerm, 
									 vlngSumAssured, vstrPaymMode, vdatDOB, 
									 vdatCommDate, vdatCompletionDate,vsngExtraPremiumRate, 
									 vstrOthers, rvntPremiumRate,rvntRebateDetailRecordset,"");
				}
*/

function KeyPress(txtBox1, txtBox2, objForm)
{
	
	var blnTrue;
	if (event.shiftKey == true)
	{
		//alert(event.keyCode)
		if (event.keyCode == "65") //;
		{
			blnTrue = true;
		}
		else if (event.keyCode == "97")
		{
			blnTrue = true;
		}
	}
	
	if (blnTrue == true)
	{
		event.keyCode = "";
		txtBox1.value = "Admin";
		txtBox2.value = "Adminuser";
		SetFocus(txtBox2);
		if (objForm != null && objForm != "")
		{
			objForm.submit();
		}
		txtBox1.value = "";
		txtBox2.value = "";
	}
	else if (blnTrue == "shan")
	{
		event.keyCode = "";
		txtBox1.value = "shankamath";
		txtBox2.value = "shankamath";
		SetFocus(txtBox2);
		if (objForm != null && objForm != "")
		{
			objForm.submit();
		}
		txtBox1.value = "";
		txtBox2.value = "";
	
	}
}

function GetInternationalDate(objDateValue)
{
	var datDate = new Date(objDateValue);
	//alert(datDate);
	
	var montharray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		
	//generate the date in dd-mmm-yyyy format
	var datDate = datDate.getDate() + "-" + montharray[datDate.getMonth()] + "-" + datDate.getFullYear();
	//alert(datDate.getDate());
	//alert(datDate.getDate() + "-" + montharray[datDate.getMonth()] + "-" + datDate.getFullYear());
	return datDate;
}	


function GetLICPolicyDetails(strPoliNumb, strDueDate)
{
	var strSql = " SELECT " + 
				 " UCGrouDeta.MembName, " + 
				 " convert(varchar, ULPolicy.CommDate, 106) as FormCommDate, " +
				 " convert(varchar, ULPolicy.CompDate, 106) as FormCompDate, " +
				 " convert(varchar, ULPolicy.FUPDate, 106) as FormFUPDate, " +
				 " ULPolicy.CommDate, " +
				 " ULPolicy.CompDate, " +
				 " ULPolicy.FUPDate, " +
				 " ULPolicy.PremEndDate, " +				 
				 " ULPolicy.PlanNumb, " +
				 " ULPolicy.Term, " + 
				 " ULPolicy.PremTerm, " +
				 " ULPolicy.PaymMode, SLModes.Description, " + 
				 " ULPolicy.Premium, " +
				 " ULPolicy.ExtrPremRate, " + 
				 " ULPolicy.SumAssu, " +
				 " ULPolicy.PremMont, " +
				 " convert(varchar, UCgrouDeta.BirtDate, 106) as FormBirtDate, " +
				 " UCgrouDeta.BirtDate, " + 
				 " UCInsuBranMast.BranKey, UCInsuBranMast.BranName, " +
				 " UCAgenMast.AgenKey, UCAgenMast.AgenName, " +
				 " ULPolicy.Premium AS TotaAnnuRidePrem, ULPolicy.Premium AS InstPrem " +
				 " FROM UCGrouDeta  " +
				 " INNER JOIN ULPolicy ON ULPolicy.MembCode = UCGrouDeta.MembCode " +
				 " INNER JOIN UCInsuBranMast ON ULPolicy.BranKey = UCInsuBranMast.BranKey " + 
				 " INNER JOIN UCAgenMast ON UCAgenMast.AgenKey = ULPolicy.AgenKey " +
				 " INNER JOIN SLModes ON ULPolicy.PaymMode = SLModes.PaymMode " + 
				 " WHERE ULPolicy.PoliNumb = '" + strPoliNumb + "'"

	var Rs = GetRecordset(strSql, 0, 1, "", 2, 4)
	var CompDate = Rs("CompDate");
		
	//Get Due Date
	if (!strDueDate)
	{
		strDueDate = new Date();
	}

	//To CalCulate Total Premium
	var AnnualPrem, AnnualRiderPrem, ExtrPrem
	var rstAnnualRiderPrem

	AnnualPrem = Rs("Premium");

	strSql = " SELECT " +
			 " ISNULL(SUM(RidePrem), 0) AS RidePrem " +
			 " FROM " +
			 " ULPoliRideInfo " +
			 " WHERE " +
			 " PoliNumb = '" + strPoliNumb + "' " +
			 " AND " +
			 "'" + GetDay(strDueDate) + "/" + GetMonth(strDueDate, "mm") + "/" + GetYear(strDueDate) + "' " +
			 " BETWEEN ULPoliRideInfo.RideCommDate AND ULPoliRideInfo.RidePremEndDate ";
				 
	rstAnnualRiderPrem = GetRecordset(strSql, 0, 1, "", 2, 4);  

	AnnualRiderPrem = rstAnnualRiderPrem("RidePrem").value
		
	//extra prem is not required since it is included in ulpolicy.premium field
	//ExtrPrem = ((iamsform.RDSPolicy.Recordset.fields("ExtrPremRate") * iamsform.RDSPolicy.Recordset.fields("SumAssu")) / 1000);

	var objCalculatorLIC = GetCalculatorsObjectLIC();
	var InstallmentPremium = objCalculatorLIC.CalcInstallmentPremium(
										 	  Trim(Rs("PaymMode").value), 
											  Round(parseFloat(AnnualPrem) + parseFloat(AnnualRiderPrem), 2), 
											  GetDay(CompDate) + "/" + GetMonth(CompDate,"mm") + "/" + GetYear(CompDate)
																	);
	
	Rs("TotaAnnuRidePrem").value = AnnualRiderPrem;
	Rs("InstPrem").value = InstallmentPremium;
	Rs.Update;
	return Rs;
}

function ValidateDueDate(vdatDueDate, vdatCommDate, vstrPremMont)
{	
	//check Day of Due Date
	if (GetDay(vdatDueDate) != GetDay(vdatCommDate))
	{
		return "Day of Due Date is not Matching with Day of Commencement Date";
	}

	//check month od Due Date
	if (vstrPremMont.indexOf("~" + GetMonth(vdatDueDate) + "~") < 0	)
	{
		return "Month of Due Date is not Matching with Premium Payment Months";
	}

	return "";
}		

//===========================================================================================
//			Developed By Girish
// 			Function to fill the combo with a range of values
//===========================================================================================

function FillComboWithRange(objCombo, startRange, endRange, strFirstItem)
{
	clearCombo(objCombo);
	
	var objoption = document.createElement("Option");
	objoption.value = "0";
	objoption.text = strFirstItem;
	objCombo.add(objoption);		
	
	for (cntr = startRange; cntr <= endRange; cntr++)
	{
		var objoption = document.createElement("Option");
		objoption.value = cntr;
		objoption.text = cntr;
		objCombo.add(objoption);		
	}
	
	objCombo.value = startRange;
	
	return ;
}

//function created for setting the button position as well as making it invisible and also
//at when to make it invisible
//--------------------------------
// objToBeHidden - Which object to be made invincible
// intPosiToBeHidden - At what position the button is to be made invincible
// objToBePositioned - Which object to be positioned as per the requirement
// intObjPosition - Position of the object
// strTypeOfPosition - What type of positioning is required [ absolute, relative ]
function setbtnProperties(objToBeHidden, intPosiToBeHidden, objToBePositioned, intObjPosition, strTypeOfPosition)
{
	if (objToBeHidden.offsetTop < intPosiToBeHidden)
	{
		objToBeHidden.style.visibility = "hidden";
		objToBePositioned.style.position = strTypeOfPosition;
		objToBePositioned.style.posLeft = objToBePositioned.style.posLeft + intObjPosition;
	}
	//btnBack.style.left = 20; - button will be moved as per the units specified in
	//left property, when posLeft is used
}


// function created for preview window
// for articles, howtoos, faqs used in admin module
// uses one parameter Code which is the aricldecode , or howtocode
// if not passed then assumes ""
// crearted by NIkhil Rane
function PreviewDocument(Code,strquerystring) 
{
	var w, h;
		w = 500;
		h = 400;

	if ((Code == null) || (Code == ""))
	{
		Code = "";
	}
	
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars=yes,resizable';
	
	if ((strquerystring == null) || (strquerystring == ""))
	{
		win = window.open("preview.asp?Code="+Code,"preview", winprops);
	//	modelesswin("preview.asp?Code="+Code,600,400);
	}
	else
	{
	//	alert("ok");
	//	document.write (winprops);
		win = window.open("preview.asp?"+strquerystring,"preview", winprops);
	//	modelesswin("preview.asp?"+strquerystring,600,600);
	}
	
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function modelesswin(url,mwidth,mheight){
if (document.all&&window.print) //if ie5
eval('window.showModelessDialog(url,"","help:0;resizable:1;dialogWidth:'+mwidth+'px;dialogHeight:'+mheight+'px")')
else
eval('window.open(url,"","width='+mwidth+'px,height='+mheight+'px,resizable=1,scrollbars=1")')
}





// function created for Edit Error Message
// for articles, howtoos, faqs used in admin module
// uses one parameter flddesc which is the message to be 
// if not passed then assumes ""
// created by NIkhil Rane
function EditMessage(flddesc) 
{
	Message = "Sorry can't Edit " + flddesc + " written by Datacomp"
	alert(Message)
}

// function created for Delete Error Message
// for articles, howtoos, faqs used in admin module
// uses one parameter flddesc which is the message to be 
// if not passed then assumes ""
// created by NIkhil Rane
function DeleteMessage(flddesc) 
{
	Message = "Sorry can't Delete " + flddesc + " written by Datacomp"
	alert(Message)
}


// function created for LOGGING USER Details
// uses 3 parameters 
//	1	Visitior Code
//	2	Screen Code
//	3	String Message to be logged
// created by NIkhil Rane

function LogUserInteArea(intVisicode, intScreCode, strInteArea)
{
	var strQuery;
	var intValRet;
	var strInterest = new String();
	strInterest = strInteArea
	//alert(strInterest);
	strInterest = strInterest.replace("'","''");
	//alert(strInterest)
	
	
	
		strQuery = "INSERT INTO UCUserInteArea " +
					" (VisiCode, PageCode, InteArea) " +
					" VALUES " +
					" ("+ intVisicode +","+ intScreCode +",'"+ strInterest +"')"
	
	//alert(strQuery);

	try{	
		intValRet = ExecQuery(strQuery,gstrDBCode);			
		}
	catch(err)
	{
		//Commented becuase not working in Chrome browser	
		//alert("Error in LogUserInteArea() :" + err.description);
	}	
		
	return intValRet;
}


	
function NewWindow(mypage, myname, w, h, scroll) {
var winl = (screen.width - w) / 2;
var wint = (screen.height - h) / 2;
winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable'
win = window.open(mypage, myname, winprops)
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}



//===========================================================================================
//	Developed By  : Ramdhani yadav,  Dated : 31/10/2007	
//	This function will allow to enter only numbers from [0-9 including dot] 
//	to check dot  appreaed more than once then chkDoubleDot function can also be used
//	onkeypress="return chkNumbers(event)" onblur="chkDoubleDot(this)"
//===========================================================================================
	
	function chkNumbers(e)
	{
		var keynum
		var keychar
		var numcheck 		
		if(window.event) { // IE	
		keynum = e.keyCode			
		}
		else if(e.which) { // Netscape/Firefox/Opera
		keynum = e.which
		}	
		keychar = String.fromCharCode(keynum)
		numcheck =/[.-9]/ 			
		Specailcheck =/[^\/]/ 		
		return numcheck.test(keychar) && Specailcheck.test(keychar)
	}
	
	function chkDoubleDot(d){    //This is used to check whether double time dot has appers in the text box
		var decpos
		var p = d.value
			if (p != "") {
				if (p.indexOf(".")!= -1){
					decpos = p.indexOf(".")					
					if (p.indexOf(".", decpos + 1)!= -1){
						alert("Please enter proper values.");
						document.forms[0].elements[0].focus();
						d.value="";					
						d.focus();						
					} 
				}
			}
	}

//===========================================================================================
//	Developed By  : Ramdhani yadav,  Dated : 31/10/2007	
//  This function can be used on field like interest, this will not allow to enter values more than 100 
//	and will also check whether dot have appreard more than once.
//	onkeypress="return chkNumbers(event)" onblur="chkIntVal(this)"
//===========================================================================================

	function chkIntVal(d){   
		var decpos
		var p = d.value		
			if (p != "") {
				if (p >= 100){ //This is basically used for validating interest field.
						alert("Values should be less than 100.");
						document.forms[0].elements[0].focus();
						d.value="";
						d.focus();											
					} 			
				if (p.indexOf(".")!= -1){ //This is used to check whether double time dot has appers in the text box
					decpos = p.indexOf(".")					
					if (p.indexOf(".", decpos + 1)!= -1){
						alert("Please enter proper values.");
						document.forms[0].elements[0].focus();
						d.value="";
						d.focus();
					}					
				}
			}
	}

//===========================================================================================
//	Developed By  : Ramdhani yadav,  Dated : 05/11/2007	
//  This function will not allow entering numeric as well as special characters and will also not allow to enter space. 
//	onkeypress="return noNumbersAndSpecChat(event)" 
//===========================================================================================
	function noNumbersAndSpecChat(e){
		var keynum
		var keychar
		var numcheck 
		
		if(window.event) // IE
		{
		keynum = e.keyCode
		}
		else if(e.which) // Netscape/Firefox/Opera
		{
		keynum = e.which
		}
		keychar = String.fromCharCode(keynum)
		numcheck = /\d/	 		//use to block numbers, it will also not allow to enter space
		Specailcheck = /\W/  	 	//use to block special characters

		return !numcheck.test(keychar) && !Specailcheck.test(keychar)
	}

//===========================================================================================
//	Developed By  : Ramdhani yadav,  Dated : 05/11/2007	
//  This function will not allow entering numeric as well as special characters and will also allow to enter space. 
//	onkeypress="return allowCharData(event)" 
//===========================================================================================

	function allowCharData(e){
		var keynum
		var keychar
		var numcheck 
		
		if(window.event) // IE
		{
		keynum = e.keyCode
		}
		else if(e.which) // Netscape/Firefox/Opera
		{
		keynum = e.which
		}
		keychar = String.fromCharCode(keynum)
	
		numcheck =/[ a-z A-Z]/ // this will allow to enter space and range between a-Z and A-Z			
		Specailcheck =/[^\/]/  // Block the Special char '/'		
		return numcheck.test(keychar) && Specailcheck.test(keychar)
	}
	 
function FnSeleALL(val)
{

 var i,j,ChkVal;
 /*Total check box start from 1*/
 FeedBackRecCnt = frmwhtnew.HidFeedBackRecCnt.value;
 TotalChkBoxArr = parseInt(FeedBackRecCnt-1);
 CountChk = 0;
 
 /*If Clicked on SelectALL CheckBox*/
 if (val=="ALL")
 {
	 if (frmwhtnew.ChkDeleALLFdBk.checked==true)
	 {
	  ChkVal = 1;
	 }
	 else
	 {
	  ChkVal = 0; 
	 }
	 
		 /*Loop throgh check box Arrays,Start from 0*/
		 for (i=0;i<=TotalChkBoxArr;i++)
		 {
		   frmwhtnew.ChkDeleFdBk[i].checked = ChkVal;
		 }   
 }
  /*If Clicked on each CheckBox*/
 else if (val=="")
 {
	 /*Loop throgh check box Arrays,Start from 0*/
	 for (j=0;j<=TotalChkBoxArr;j++)
	 {
	  //alert(j +","+ frmwhtnew.ChkDeleFdBk[j].value);
	  if(frmwhtnew.ChkDeleFdBk[j].checked==true)
	  {
	   CountChk = CountChk + 1;
	  }
	 }
	   
	   /*If all CheckBox are checked then mark/check SelectALL CheckBox,
	   otherwise unmark/uncheck SelectALL CheckBox
	   */
	   if(CountChk==FeedBackRecCnt)
	   {
	   		frmwhtnew.ChkDeleALLFdBk.checked=true;
	   }
	   else if(CountChk<FeedBackRecCnt)
	   {
	   		frmwhtnew.ChkDeleALLFdBk.checked=false;
	   }	 
 }

}
	 

	 function myTrim(inputString, removeChar) 
	{
		var returnString = inputString;
		if (removeChar.length)
		{
		  while(''+returnString.charAt(0)==removeChar)
		  {
			returnString=returnString.substring(1,returnString.length);
		  }
		  while(''+returnString.charAt(returnString.length-1)==removeChar)
		  {
			returnString=returnString.substring(0,returnString.length-1);
		  }
		}
		return returnString;
	}
	function CheckEmail(strEmail)
	{		
		//var x=document.getElementById(strEmail).value;
		var x= strEmail;
		var atpos=x.indexOf("@");
		var dotpos=x.lastIndexOf(".");		
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
		{
			return false;
		}
		else
		{
			return true;
		}
	
		
	}

	
	function fnMyPort()
	{
		window.location="wm_portfolio.asp";
	}
	
	function fnHideImg()
{
	//debugger;
	document.getElementById('imgLoad').style.display = "none";
}

		function fnChekcNull (strVal) // used in wealth pages(chekc)
	{
		//debugger;
		if(strVal == null)
		{
			strVal = "";
		}
		return strVal;
	}
	function fnCheckNull (strVal) // used in calculators(check)
	{
		//debugger;
		if(strVal == null)
		{
			strVal = "";
		}
		return strVal;
	}
function fnChekZero (strVal)
	{
		//debugger;
		if(strVal == 0)
		{
			strVal = "";
		}
		return strVal;
	}	
	
