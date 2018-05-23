import React, { Component } from "react";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleLogin = this.toggleLogin.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.verifyUserTwo = this.verifyUserTwo.bind(this);
  }
  toggleLogin = e => {
    e.preventDefault();
    const login = document.getElementById("login-container");
    login.style.display === 'none' ? login.style.display = 'block' : login.style.display = "none";
  }
  verifyUser = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/', {
      name: e.target.username.value,
      password: e.target.password.value,
    }).then(res => {
      if (res.data) this.toggleLogin(e);
      else alert('Invalid user information.');
    });
  }
  verifyUserTwo = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', {
      name: e.target.username.value,
      password: e.target.password.value,
    }).then(res => {
      if (res.data) this.toggleLogin(e);
      else alert('Invalid user information.');
    });
  }
  render() {
    return (
      <div id="login-container">
        <form className="login-form" onSubmit={this.verifyUser}>
        👩‍💻 👨‍💻Username:
          <input name="username"/>
          <br />
          🤫Password:
          <input name="password" type="password"/>
          <br />
          <button>Sign up</button>
          <br />
          <br />
          <button onClick={this.toggleLogin}>Continue as Guest</button>
        </form>
        <form className="login-form" onSubmit={this.verifyUserTwo}>
        👩‍💻 👨‍💻Username:
          <input name="username"/>
          <br />
          🤫Password:
          <input name="password" type="password"/>
          <br />
          <button>Log in</button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default Login;
