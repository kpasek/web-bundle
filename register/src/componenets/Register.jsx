import React, { Component } from "react";

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {}

  handleRegister = async () => {
    const login = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const name = document.getElementById("reg-name").value;
    const lastname = document.getElementById("reg-lastname").value;
    const gender = document.getElementById("reg-gender").value;
    const birthdate = document.getElementById("reg-birthdate").value;

    let formData = new FormData();
    formData.append("user_login", login);
    formData.append("pass1", password);
    formData.append("email", login);
    formData.append("first_name", name);
    formData.append("last_name", lastname);
    formData.append("locale", "pl_PL");

    await fetch("wp-admin/user-new.php", {
      method: "POST",
      body: formData,
    });
    fetch("https://api.kamilpasek.pl/api/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: login,
        Password: password,
        Name: name,
        LastName: lastname,
        Gender: gender,
        Birthdate: birthdate,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("register successful, start redirect");
        this.setState({ redirect: "/" });
      }
    });
  };
  renderBody() {
    if (this.state.redirect) {
      return (window.location.href = this.state.redirect);
    } else {
      return (
        <div>
          <div>
            <div>
              <h2>Zarejestruj się</h2>
              <div id="reg-form" noValidate>
                <div>
                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-email"
                    >
                      Email
                    </label>
                    <br />
                    <div>
                      <input
                        type="email"
                        id="reg-email"
                        name="Email"
                        placeholder="Email"
                        aria-describedby="validation-email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-password"
                    >
                      Hasło
                    </label>
                    <br />
                    <input
                      type="password"
                      id="reg-password"
                      name="Password"
                      placeholder="Hasło"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-name"
                    >
                      Imię
                    </label>
                    <br />
                    <input
                      type="text"
                      id="reg-name"
                      name="Name"
                      placeholder="Imię"
                    />
                  </div>
                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-lastname"
                    >
                      Nazwisko
                    </label>
                    <br />
                    <input
                      type="text"
                      id="reg-lastname"
                      name="LastName"
                      placeholder="Nazwisko"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-gender"
                    >
                      Płeć
                    </label>
                    <br />
                    <select
                      className="custom-select mr-sm-2"
                      id="reg-gender"
                      name="Gender"
                      required
                    >
                      <option defaultValue>Wybierz</option>
                      <option value="K">Kobieta</option>
                      <option value="M">Mężczyzna</option>
                      <option value="I">Inne</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{ marginTop: 8, marginBottom: 4 }}
                      htmlFor="reg-birthdate"
                    >
                      Data urodzenia
                    </label>
                    <br />
                    <input
                      type="date"
                      id="reg-birthdate"
                      name="Birthday"
                      placeholder="Data urodzenia"
                    />
                  </div>
                </div>
                <button style={{ marginTop: 20 }} onClick={this.handleRegister}>
                  Rejestruj
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderBody();
  }
}
