var boolvalue;
function createrequest()
{
	request=false;
	if(window.XMLHttpRequest)
	{
	request= new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
	try
	{
	request= new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(e)
	{
	request= new ActiveXObject("Microsoft.XMLHTTP");
	}
	}
return request;
	
}

function valid(value,type)
{	
var url;
var request=createrequest();
if(value == '')
{
value="1";
}
url="validate.php?val="+value+"&id="+type;

	request.open('Get',url,true);
request.onreadystatechange=function()
{
if(request.readyState == 4)
{
	if(request.status == 200)
	{
		if(type =='country')
		{
		document.getElementById('state').innerHTML=request.responseText;
		}
	}
}
}
request.send(null);
}