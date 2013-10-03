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

     document.getElementById('localize').addEventListener("click", function(){
          var options = {};
          var mode; 
          var lmodmodeSelector = document.getElementById('lmodmode');
          var lmodfixSelector = document.getElementById('lmodfix');
          var elements = document.getElementsByName('mode');     
          var paramString = "{";
          for(var i=0; i < elements.length; ++i){
               if(elements[i].checked){
                    mode = elements[i].value;
                    break;
               }
          }
          if(mode == "all")
               paramString += '"all":true,';
          if(mode == "all" || mode == "lmod"){
               paramString += '"lmod":true';
               paramString += ',"lmodpercent":' + document.getElementById('lmodpercent').value;
               paramString += ',"lmodmode":"' + lmodmodeSelector.options[lmodmodeSelector.selectedIndex].value + '"';
               paramString += ',"lmodfix":"' + lmodfixSelector.options[lmodfixSelector.selectedIndex].value + '"';
          }
          else{
               paramString += '"' + mode + '":true';
          }
          paramString += "}";
          
          chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {
                 code: "plocalize(" + paramString + ");"
               }, function() { console.log('done'); });
          });

          return false;
     });

     document.getElementById("lmodpercent").addEventListener("change", function(){
          document.getElementById('lmodpercent-display').innerHTML = document.getElementById('lmodpercent').value + "%";
     });

     document.getElementById("reset").addEventListener("click", function(){
          chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {
                 code: "resetPageNodes();"
               }, function() { console.log('done'); });
          });
          return false;
     });
});

$(document).ready(function(){
     $('.radio-set input[type="radio"]').change(function(){
          if($(this).val() == "all" || $(this).val() == "lmod"){
               if($('.lmod-options').css('display') == 'none')
                    $('.lmod-options').slideDown();
          }
          else{
               if($('.lmod-options').css('display') != 'none')
                    $('.lmod-options').slideUp();  
         }
     });
});


     