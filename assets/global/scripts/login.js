const ipc = require('electron').ipcRenderer;

$( "#login" ).submit(function(data) {
  console.log($( "input:first" ).val(), $( "input:password" ).val());
  ipc.send('login', $( "input:first" ).val(), $( "input:password" ).val());
});
