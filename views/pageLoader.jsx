const React = require('react');
const ReactDOM = require('react-dom');
const ipc = require('electron').ipcRenderer;
const Index = require('./index.jsx');
const Login = require('./login.jsx');
const LoginMFA = require('./loginMFA.jsx');

if (localStorage.token !== undefined) {
  ipc.send('login', localStorage.token);
  ReactDOM.render(<Index/>, document.getElementById('app-root'));
} else {
  ReactDOM.render(<Login/>, document.getElementById('app-root'));
}
