import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CgMenu} from 'react-icons/cg'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isActive: false}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeActiveStatus = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  onCloseMenuList = () => {
    this.setState({isActive: false})
  }

  render() {
    const {isActive} = this.state
    console.log(isActive)
    const activeClass = isActive === false ? 'shouldDisplay' : ''
    return (
      <div>
        <nav className="header">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696315997/jb89pyuklnxgxcrngry5.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <button
            className="menu-button"
            type="button"
            onClick={this.onChangeActiveStatus}
          >
            <CgMenu className="menu-icon" />
          </button>

          <ul className="header-desktop-view-unordered-list">
            <li>
              <Link to="/" className="link">
                <p className="header-home">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/shelf" className="link">
                <p className="header-home">Bookshelves</p>
              </Link>
            </li>
            <li>
              <button
                className="logout-button"
                onClick={this.onLogout}
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className={activeClass}>
          <ul className="header-mobile-view-unordered-list">
            <li>
              <Link to="/" className="link">
                <p className="header-menu">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/shelf" className="link">
                <p className="header-menu">Bookshelves</p>
              </Link>
            </li>
            <li>
              <button
                className="logout-button"
                onClick={this.onLogout}
                type="button"
              >
                Logout
              </button>
            </li>
            <li>
              <button
                className="close-button"
                onClick={this.onCloseMenuList}
                type="button"
              >
                <AiFillCloseCircle />
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
