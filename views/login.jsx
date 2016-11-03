const React = require('react');
const ipc = require('electron').ipcRenderer;
const ReactDOM = require('react-dom');
const request = require('superagent');
const loginMFA = require('./loginMFA.jsx');

class login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {ticket: null, key: Math.random()};
    }

    loginForm(e) {
      e.preventDefault();
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      if (this.state.ticket === null){
      request.post(`https://discordapp.com/api/v6/auth/login`)
        .send({ email: email, password: password })
        .end((err, res) => {
          const loginPacket = JSON.parse(res.text);
          if (loginPacket.token === null && loginPacket.mfa) {
            this.state.ticket = loginPacket.ticket;
            this.setState({ticket: loginPacket.ticket, key: Math.random()});
          } else {
            localStorage.token = loginPacket.token;
            ipc.send('login', loginPacket.token);
          }
        });
      }
    }

    loginMFA(e) {
      e.preventDefault();
      const code = this.refs.code.value;
      if (this.state.ticket !== null) {
      request.post(`https://discordapp.com/api/v6/auth/mfa/totp`)
        .send({ code: code, ticket: this.state.ticket })
        .end((err, res) => {
          const loginPacket = JSON.parse(res.text);
          if (loginPacket.token === null) {
            this.setState({ticket: loginPacket.ticket, key: Math.random()})
          } else {
            localStorage.token = loginPacket.token;
            ipc.send('login', loginPacket.token);
          }
        });
      }
    }

    render() {
        return this.state.ticket !== null ? (
          <div className="login">
          <div className="logo">
          </div>
          <div className="content">
          <form className="login-form" onSubmit={this.loginMFA.bind(this)}>
              <h3 className="form-title font-green">Welcome Back!</h3>
              <div className="form-group">
                  <label className="control-label">Enter Discord Auth Code</label>
                  <input className="form-control form-control-solid placeholder-no-fix" ref="code" type="text" autoComplete="off" name="code"></input>
              </div>
              <div className="form-actions">
                  <button type="submit" className="btn green uppercase">Login</button>
              </div>
          </form>
          </div>
          </div>
        ) : (
          <div className="login" id="LoginForm" key={this.state.key}>
          <div className="logo">
          </div>
          <div className="content">
            <form className="login-form" id="login" onSubmit={this.loginForm.bind(this)}>
                <h3 className="form-title font-green">Sign In</h3>
                <div className="form-group" id="email">
                    <label className="control-label visible-ie8 visible-ie9">Email</label>
                    <input className="form-control form-control-solid placeholder-no-fix" type="email" autoComplete="off" placeholder="Email" ref="email"></input>
                </div>
                <div className="form-group" id="password">
                    <label className="control-label visible-ie8 visible-ie9">Password</label>
                    <input className="form-control form-control-solid placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" ref="password"></input>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn green uppercase">Login</button>
                </div>
            </form>
          </div>
          </div>
        );
    }
}

module.exports = login;
