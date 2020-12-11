import React, { Component } from "react";

export class User extends Component {
  static displayName = User.name;

  constructor(props) {
    super(props);
    this.state = { redirect: false };
    //bind User object to handleLoginBtn function
    //after that we can use this inside function
    //other solution is using arrow function name = () => {}
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
  }

  componentDidMount() {}

  handleLoginBtn = async () => {
    const login = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    let formData = new FormData();
    formData.append("log", login);
    formData.append("pwd", password);
    await fetch("/wp-login.php", {
      method: "POST",
      body: formData,
    });

    fetch("https://api.kamilpasek.pl/api/user/login", {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: login,
        Password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("login successful, start redirect");
        this.setState({ redirect: "/" });
      }
    });
  };

  renderBody() {
    if (this.state.redirect) {
      window.location.href = "/";
      return null;
    } else {
      return (
        <React.Fragment>
          <div className="">
            <div className="">
              <h2>Zaloguj się</h2>
              <div id="login-form">
                <div className="">
                  <label htmlFor="login-email">Email</label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    id="login-email"
                    name="Email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="">
                  <label htmlFor="login-password">Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    name="Password"
                    placeholder="Hasło"
                    required
                  />
                </div>
                <button style={{ marginTop: 20 }} onClick={this.handleLoginBtn}>
                  Zaloguj
                </button>
                {/* <div style="clear: both;"></div> */}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  render() {
    return this.renderBody();
  }
}
