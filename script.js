"strict mode";
function translateAccent(character){
    var dictionary = [
     ' ', '2003' ,
     '!', '00a1' ,
     '"', '2033' ,
     '#', '266f' ,
     '$', '20ac' ,
     '%', '2030' ,
     '&', '214b' ,
     '\'', '00b4' ,
     '*', '204e' ,
     '+', '207a' ,
     ',', '060c' ,
     '-', '2010' ,
     '.', '00b7' ,
     '/', '2044' ,
     '0', '24ea' ,
     '1', '2460' ,
     '2', '2461' ,
     '3', '2462' ,
     '4', '2463' ,
     '5', '2464' ,
     '6', '2465' ,
     '7', '2466' ,
     '8', '2467' ,
     '9', '2468' ,
     ',', '2236' ,
     ';', '204f' ,
     '<', '2264' ,
     '=', '2242' ,
     '>', '2265' ,
     '?', '00bf' ,
     '@', '055e' ,
     'A', '00c5' ,
     'B', '0181' ,
     'C', '00c7' ,
     'D', '00d0' ,
     'E', '00c9' ,
     'F', '0191' ,
     'G', '011c' ,
     'H', '0124' ,
     'I', '00ce' ,
     'J', '0134' ,
     'K', '0136' ,
     'L', '013b' ,
     'M', '1e40' ,
     'N', '00d1' ,
     'O', '00d6' ,
     'P', '00de' ,
     'Q', '01ea' ,
     'R', '0154' ,
     'S', '0160' ,
     'T', '0162' ,
     'U', '00db' ,
     'V', '1e7c' ,
     'W', '0174' ,
     'X', '1e8a' ,
     'Y', '00dd' ,
     'Z', '017d' ,
     '[', '2045' ,
     '\\', '2216' ,
     ']', '2046' ,
     '^', '02c4' ,
     '_', '203f' ,
     '`', '2035' ,
     'a', '00e5' ,
     'b', '0180' ,
     'c', '00e7' ,
     'd', '00f0' ,
     'e', '00e9' ,
     'f', '0192' ,
     'g', '011d' ,
     'h', '0125' ,
     'i', '00ee' ,
     'j', '0135' ,
     'k', '0137' ,
     'l', '013c' ,
     'm', '0271' ,
     'n', '00f1' ,
     'o', '00f6' ,
     'p', '00fe' ,
     'q', '01eb' ,
     'r', '0155' ,
     's', '0161' ,
     't', '0163' ,
     'u', '00fb' ,
     'v', '1e7d' ,
     'w', '0175' ,
     'x', '1e8b' ,
     'y', '00fd' ,
     'z', '017e' ,
     '|', '00a6' ,
     '~', '02de' ];

	for (var i = 0; i < dictionary.length; i+=2){
		if (dictionary[i] == character) {
			return String.fromCharCode(parseInt(dictionary[i+1], 16));
		}
	}
    return character;
}
function getRandomInt(min, max){
     return Math.floor(Math.random() * (max-min+1) + min);
}


function getIterator(){
	var scope = document.body,
		show = NodeFilter.SHOW_TEXT,
		filter = isValidTextNode,
		nodeIterator = document.createNodeIterator(scope, show, filter, false);

	//TODO: Skip if only currency symbol or number, skip if its a style element
	function isValidTextNode(node) {
	  if (node.parentNode.nodeName.toLowerCase() === 'script' || !/\S/.test(node.data)) {
		return NodeFilter.FILTER_SKIP;
	  } else {
		return NodeFilter.FILTER_ACCEPT;
	  }
	}
	
	return nodeIterator;
}

function alterTextNodes(nodeIterator, mode, lmodpercent, lmodmode, lmodfix){

	switch(mode)
	{
		case 'brackets':
			while(currNode = nodeIterator.nextNode()){
			  currNode.nodeValue = '[' + currNode.nodeValue + ']';
			}
		break;

		case 'accenter':
			while(currNode = nodeIterator.nextNode()){
				var nodeLength = currNode.nodeValue.length,
					translated = "";

				while(nodeLength--){
					translated = translateAccent(currNode.nodeValue[nodeLength]) + translated;
				}
			  currNode.nodeValue = translated;
			}
		break;

		case 'lmod':
               lmodpercent = (lmodpercent.length != 0 && !isNaN(parseFloat(lmodpercent)) && isFinite(lmodpercent) && lmodpercent != '0')?lmodpercent:false;
               if(lmodpercent !== false){
                    switch(lmodfix)
                    {
                         case "prefix":
                              while(currNode = nodeIterator.nextNode()){
                                   var charChange = Math.floor(currNode.nodeValue.length * (lmodpercent/100));
                                   if(lmodmode == "contract"){
                                        currNode.nodeValue = currNode.nodeValue.substring(charChange - 1);
                                   }
                                   else{
                                        //expand by default
                                        var preString = "";
                                        for(var i = 0; i < charChange; i++){
                                             preString += String.fromCharCode(61);
                                        }
                                        currNode.nodeValue = preString + currNode.nodeValue;
                                   }
                              }
                         break;

                         case "postfix":
                              while(currNode = nodeIterator.nextNode()){
                                   var charChange = Math.floor(currNode.nodeValue.length * (lmodpercent/100));
                                   if(lmodmode == "contract"){
                                        currNode.nodeValue = currNode.nodeValue.substring(0, currNode.nodeValue.length - charChange);
                                   }
                                   else{
                                        //expand by default
                                        var postString = "";
                                        for(var i = 0; i < charChange; i++){
                                             postString += String.fromCharCode(61);
                                        }
                                        currNode.nodeValue += postString;
                                   }
                              }
                         break;

                         case "both":
                         default:
                              while(currNode = nodeIterator.nextNode()){
                                   var charChange = Math.floor((currNode.nodeValue.length * (lmodpercent/100))/2);
                                   if(lmodmode == "contract"){
                                        currNode.nodeValue = currNode.nodeValue.substring(charChange, currNode.nodeValue.length - charChange);
                                   }
                                   else{
                                        //expand by default
                                        var preString = "";
                                        var postString = "";
                                        for(var i = 0; i < charChange; i++){
                                             preString += String.fromCharCode(61);
                                        }
                                        for(var i = 0; i < charChange; i++){
                                             postString += String.fromCharCode(61);
                                        }
                                        currNode.nodeValue = preString + currNode.nodeValue + postString;
                                   }
                              }
                         break;
                    }
               }
               
		break;

		case 'fakebidi':
			document.getElementsByTagName('body')[0].setAttribute('DIR', 'RTL');
          break;
	}
}

function plocalize(options){
     var actionList = new Array(); 
     if(options.all == true)
          actionList = ["accenter", "lmod", "fakebidi", "brackets"];
     else{
          if(options.accenter == true)
               actionList.push("accenter");
          if(options.lmod == true)
               actionList.push("lmod");
          if(options.fakebidi == true)
               actionList.push("fakebidi");
          if(options.brackets == true)
               actionList.push("brackets");
     }
     for(var i = 0; i < actionList.length; i++){
          if(actionList[i].trim() === "lmod")
               alterTextNodes(getIterator(), "lmod", options.lmodpercent, options.lmodmode, options.lmodfix);
          else
               alterTextNodes(getIterator(), actionList[i].trim());
     }
          
}

function getTranslatedWindow(options){
     var base_url = "http://translate.google.com/translate?js=n&sl=auto";
     var requested_page = encodeURIComponent(window.location.href);
     var full_url = base_url + "&tl=" + options.destLang + "&u=" + requested_page;
     window.open(full_url, "translated", "height=860,width=1200");
}


