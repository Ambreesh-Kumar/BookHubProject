import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class BookDetail extends Component {
  state = {bookData: {}, apiStatus: apiResponseStatus.initial}

  componentDidMount() {
    this.getBookData()
  }

  getBookData = async () => {
    this.setState({apiStatus: apiResponseStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = fetchedData.book_details
      const newData = {
        id: data.id,
        aboutAuthor: data.about_author,
        aboutBook: data.about_book,
        authorName: data.author_name,
        coverPic: data.cover_pic,
        rating: data.rating,
        readStatus: data.read_status,
        title: data.title,
      }
      this.setState({
        bookData: newData,
        apiStatus: apiResponseStatus.success,
      })
    } else {
      this.setState({apiStatus: apiResponseStatus.failure})
    }
  }

  onTryAgain = () => {
    this.getBookData()
  }

  renderBooData = () => {
    const {bookData} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookData
    return (
      <div className="book-data-container">
        <div className="book-data-image-card">
          <img src={coverPic} alt={title} className="book-data-book-image" />
          <div className="book-data-contact-container">
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
        </div>
        <hr className="horizontal-line" />
        <div className="about-author-container">
          <h1 className="about-heading">About Author</h1>
          <p className="about-description">{aboutAuthor}</p>
        </div>
        <div className="about-author-container">
          <h1 className="about-heading">About Book</h1>
          <p className="about-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={40} width={40} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696405637/mbvtoyqdwyweyyir1met.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-button"
        onClick={this.onTryAgain}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBooDataView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponseStatus.inProgress:
        return this.renderLoaderView()
      case apiResponseStatus.success:
        return this.renderBooData()
      case apiResponseStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {bookData} = this.state
    console.log(bookData)
    return (
      <div className="book-data-bg-container">
        <Header />
        <div className="view-container">{this.renderBooDataView()}</div>
        <Footer />
      </div>
    )
  }
}
export default BookDetail
