import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookshelvesCard = props => {
  const {bookItem} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookItem

  return (
    <Link to={`/books/${id}`} className="link">
      <li className="bookshelves-item-list-card">
        <img src={coverPic} alt={title} className="bookshelves-book-image" />
        <div className="list-card-contact-container">
          <h1 className="list-card-contact-title">{title}</h1>
          <p className="list-card-contact-author-name">{authorName}</p>
          <div className="list-card-contact-rating-container">
            <p className="rating">Avg Rating</p>
            <BsFillStarFill className="start-icon" />
            <p className="rating">{rating}</p>
          </div>
          <div className="list-card-contact-status-container">
            <p className="status">Status:</p>
            <p className="read-status">{readStatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookshelvesCard
