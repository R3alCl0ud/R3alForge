const React = require('react');
const ReactDOM = require('react-dom');
const Index = require('./index.jsx');
const Login = require('./login.jsx');

if (localStorage.token !== null) {
  ReactDOM.render(<Index/>, document.getElementById('root'));
} else {

}
