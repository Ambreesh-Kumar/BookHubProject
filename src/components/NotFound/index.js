import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696492953/bqgxlfjnylv2bk1pylmb.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-button " type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
