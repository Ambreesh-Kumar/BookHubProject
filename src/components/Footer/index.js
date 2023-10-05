import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer">
    <ul className="footer-icon-unordered-list">
      <li>
        <FaGoogle className="footer-icon" />
      </li>
      <li>
        <FaTwitter className="footer-icon" />
      </li>
      <li>
        <FaInstagram className="footer-icon" />
      </li>
      <li>
        <FaYoutube className="footer-icon" />
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </footer>
)

export default Footer
