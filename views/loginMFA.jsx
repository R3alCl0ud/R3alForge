const React = require('react');

class loginMFA extends React.Component {

    submitForm(e) {
      e.preventDefault();
      console.log(this.refs.code.value);
      console.log(this.props.ticket);
    }

    render() {
        return (
          <div className="login">
          <div className="logo">
          </div>
          <div className="content">
          <form className="login-form" onSubmit={this.submitForm.bind(this)}>
              <h3 className="form-title font-green">Welcome Back!</h3>
              <div className="form-group">
                  <label className="control-label">Enter Discord Auth Code</label>
                  <input className="form-control form-control-solid placeholder-no-fix" ref="code" type="text" autoComplete="off" name="code"></input>
              </div>
              <div class="form-actions">
                  <button type="submit" class="btn green uppercase">Login</button>
              </div>
          </form>
          </div>
          </div>
        );
    }
}

loginMFA.propTypes = {
  ticket: React.PropTypes.string
}

module.exports = loginMFA;
