document.addEventListener("DOMContentLoaded", bindButtons);		// .JS FILE 

function bindButtons()

{
    document.getElementById("submission").addEventListener("click", function(event)
    {
        var req = new XMLHttpRequest();
        var request = "http://httpbin.org/post";
        var payload = {"words": null};

        payload.myData = document.getElementById("words").value;     
       
        req.open("POST", request, true);                         
        req.setRequestHeader("Content-Type", "application/json");	// SPECIFYING APPLICATION/JSON TYPE
        req.addEventListener("load",function()
	{
            if (req.status >= 200 && req.status < 400)          // TEST TO SEE IF RESPONSE WAS SUCCESSFUL
            {
                var response = JSON.parse(JSON.parse(req.responseText).data);
                dataReturned(response);
            }

            else {console.log("ERROR!");}

    	});
        
	var test2=payload.myData;
	console.log(test2, test2);
	output="Not a valid response!";
	if (test2=="you") {output="Вы любите есть пиццу.";};
	if (test2=="we") {output="Мы любим есть пиццу.";};
	if (test2=="I") {output="Я люблю есть пиццу.";};
	console.log(output);
	//req.send(output);
        req.send(JSON.stringify(payload));                  
        event.preventDefault();						// PREVENTING DEFAULT
    });

}



var testme = "Вы любите есть пиццу.";


function dataReturned(response) {document.getElementById("dataBack").textContent = output;}	// DISPLAYING THE DATA WE GET BACK
console.log(document.getElementById("dataBack").textContent);


var clockMoscow = new Date();

clockMoscow.setHours(clockMoscow.getHours() + 3); // UTC+3

clockMoscow.getUTCHours();
clockMoscow.getUTCMinutes();

console.log(clockMoscow.getUTCHours() + ":" + clockMoscow.getUTCMinutes());

