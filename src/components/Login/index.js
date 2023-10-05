import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', showErrorMessage: false, errorMsg: ''}

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showErrorMessage: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userData = {username: userName, password: passWord}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({userName: event.target.value})
  }

  changePassword = event => {
    this.setState({passWord: event.target.value})
  }

  renderUsername = () => {
    const {userName} = this.state
    return (
      <div className="username-container">
        <label className="login-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="inputElement"
          value={userName}
          onChange={this.changeUsername}
          placeholder="Username: rahul"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {passWord} = this.state
    return (
      <div className="username-container">
        <label className="login-label" htmlFor="username">
          Password*
        </label>
        <input
          type="password"
          id="username"
          className="inputElement"
          value={passWord}
          onChange={this.changePassword}
          placeholder="Password: rahul@2021"
        />
      </div>
    )
  }

  render() {
    const {showErrorMessage, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-image-container">
          <img
            src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696313808/cq0mj538t3r2gybncnoe.png"
            alt="website login"
            className="login-page-image"
          />
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            <img
              src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696315997/jb89pyuklnxgxcrngry5.png"
              alt="login website logo"
              className="bookHub-login-page-logo"
            />
            {this.renderUsername()}
            {this.renderPassword()}
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrorMessage && <p className="errorMessage">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
