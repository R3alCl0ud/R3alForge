const ipc = require('electron').ipcRenderer;
const request = require('superagent');
const ReactDOM = require('react-dom');
const LoginForm = require('./components/loginForm');
require('')

$("#login").submit(function (data) {
  console.log($("#login input:first").val(), $("input:password").val());
  const email = $("input:email").val();
  const password = $("input:password").val();
  request.post(`https://discordapp.com/api/v6/auth/login`)
    .send({ email: email, password: password })
    .end((err, res) => {
      console.log(err, JSON.parse(res.text).token);
      const loginPacket = JSON.parse(res.text);
      if (loginPacket.token === null) {

      }
    })
    //ipc.send('login', $( "input:first" ).val(), $( "input:password" ).val());
});

$("#login_mfa").submit(function (data) {
  console.log($("#login input:first").val(), $("input:password").val());
  const code = $("input:first").val();
  request.post(`https://discordapp.com/api/v6/auth/mfa/totp`)
    .send({ ticket: ticket, code: code })
    .end((err, res) => {
      console.log(err, JSON.parse(res.text).token);
      const loginPacket = JSON.parse(res.text);
      if (loginPacket.token === null) {
        console.log("hmm")
        $("h3.form-title").replaceWith("<h3 class='form-title font-green'>Welcome back!</h3>");
        $("input:first").remove();
        $("input:password").remove()

        $(this).attr("id", "2fa");
        $(this).append("<div>")
        $("#2fa").submit(e => {
          const code = $("#2fa input:text")
        });
      }
    })
});
