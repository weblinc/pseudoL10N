function getTranslatedWindow(options){
     var base_url = "http://translate.google.com/translate?js=n&sl=auto";
     var requested_page = encodeURIComponent(options.windowUrl);
     var full_url = base_url + "&tl=" + options.destLang + "&u=" + requested_page;
     window.open(full_url, "Translated Content", "height=860,width=1200");
}
document.addEventListener('DOMContentLoaded', function () {
     var windowUrl;
    chrome.tabs.query({
               'active': true,
               'windowId': chrome.windows.WINDOW_ID_CURRENT
          }, function (tabs) {
               windowUrl = tabs[0].url;               
          });
     document.getElementById('translate').addEventListener("click", function () {
          var transSelect = document.getElementById('lang');
          getTranslatedWindow({'destLang': transSelect.options[transSelect.selectedIndex].value, 'windowUrl': windowUrl});
          return false; 
     });

     document.getElementById('localize').addEventListener("click", function(e){
          e.preventDefault();
          var options = {};
          var mode; 
          var lmodfixSelector = document.getElementById('lmodfix');
          var elements = document.getElementsByName('mode');     
          var paramString = "{";
          for(var i=0; i < elements.length; ++i){
               if(elements[i].checked){
                    if(paramString.length == 1)
                         paramString += '"' + elements[i].value + '":true';
                    else
                         paramString += ',"' + elements[i].value + '":true';
                    if(elements[i].value == "lmod"){
                         paramString += ',"lmodpercent":' + document.getElementById('lmodpercent').value;
                    }
               }
          }
          paramString += "}";
          
          chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {
                 code: "plocalize(" + paramString + ");"
               }, function() { console.log('done'); });
          });
     });

     document.getElementById("lmodpercent").addEventListener("change", function(){
          document.getElementById('lmodpercent-display').innerHTML = document.getElementById('lmodpercent').value + "%";
     });

     document.getElementById("reset").addEventListener("click", function(e){
          e.preventDefault();
          chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {
                 code: "resetPageNodes();"
               }, function() { console.log('done'); });
          });
     });

     document.getElementById("allmodes").addEventListener("change", function(){
          var elements = document.getElementsByName('mode');
          if(this.checked){
               for(var i=0; i < elements.length; ++i){
                    elements[i].checked = true;
               }
          }
          else{
               for(var i=0; i < elements.length; ++i){
                    elements[i].checked = false;
               }
          }

     });
});


     