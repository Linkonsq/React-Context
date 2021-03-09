import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./NewLogin.css";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import LoginHeader from "./loginHeader/LoginHeader";
import Logo from "../../images/icons/uwc-icon-circuit-cloud.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      redirect: false,
      loading: false,
      isAuthenticated: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  errorToast = (notifyText) =>
    toast.error(<div>{notifyText}</div>, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });

  checkAuthentication() {
    let data = localStorage.getItem("data");
    if (data != null) {
      this.setState({ isAuthenticated: true });
    }
  }

  login(event) {
    this.setState({ loading: true });
    if (this.state.email.length < 1 && this.state.password.length < 1) {
      this.setState({ loading: false });
      this.setState({
        emailError: "Email can not be empty",
        passwordError: "Password can not be empty",
      });
      event.preventDefault();
      return;
    }
    if (this.state.email.length < 1) {
      this.setState({ loading: false });
      this.setState({
        emailError: "Email can not be empty",
        passwordError: "",
      });
      event.preventDefault();
      return;
    }
    if (this.state.password.length < 1) {
      this.setState({ loading: false });
      this.setState({
        passwordError: "Password can not be empty",
        emailError: "",
      });
      event.preventDefault();
      return;
    }
    if (!this.state.email.includes("@")) {
      this.setState({ loading: false });
      this.setState({
        emailError: "Please enter a valid email",
        passwordError: "",
      });
      event.preventDefault();
      return;
    }
    const url = "https://api.urbanwater.cloud/authentication";
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        strategy: "local",
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("data", JSON.stringify(response));
          this.setState({ redirect: true, loading: false });
        }
      })
      .catch((error) => {
        this.setState({
          emailError: "",
          passwordError: "",
          email: "",
          password: "",
        });
        this.setState({ loading: false });
        this.errorToast("Invalid email or password. Please try again");
      });
  }

  onChange(el) {
    this.setState({ [el.target.name]: el.target.value });
  }

  render() {
    this.checkAuthentication();
    if (this.state.redirect || this.state.isAuthenticated) {
      // return <Redirect to="/map" />;
      alert("Login Successful");
    }

    let form = (
      <form className="login__container">
        <img className="login__logo" src={Logo} />
        <input
          className="login__input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={this.onChange}
        />
        <p className="login__errorMsg">{this.state.emailError}</p>
        <br></br>
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.onChange}
        />
        <p className="login__errorMsg">{this.state.passwordError}</p>
        <br></br>
        <Link className="login__frgtPass" to="/resetPassword">
          Forgot Your Password?
        </Link>
        <div className="login__btnContainer">
          <button className="login__button" onClick={this.login}>
            Login
          </button>
        </div>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <Fragment>
        <LoginHeader />
        <section className="login">
          {form}
          <ToastContainer />
        </section>
      </Fragment>
    );
  }
}

export default Login;