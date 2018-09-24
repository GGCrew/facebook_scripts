var advertisersInteracted = document.getElementById('interacted');
var buttons = advertisersInteracted.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) { 
  var content = buttons[i].getAttribute("data-tooltip-content"); 
  if ( content == "Remove" ) { 
    buttons[i].click();
  }
}
