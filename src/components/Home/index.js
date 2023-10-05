import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiResponseStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiResponseStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = fetchedData.books.map(item => ({
        id: item.id,
        authorName: item.author_name,
        coverPic: item.cover_pic,
        title: item.title,
      }))
      console.log(data)
      this.setState({
        topRatedBooks: data,
        apiStatus: apiResponseStatus.success,
      })
    } else {
      this.setState({apiStatus: apiResponseStatus.failure})
    }
  }

  renderSlider = () => {
    const {topRatedBooks} = this.state
    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, coverPic, title, authorName} = eachBook
          return (
            <Link to={`/books/${id}`} className="link">
              <li className="slick-item" key={id}>
                <img className="book-image" src={coverPic} alt="Top Book" />
                <h1 className="top-rated-book-title">{title}</h1>
                <p className="top-rated-book-author-name">{authorName}</p>
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  onTryAgain = () => {
    this.getTopRatedBooks()
  }

  renderTopRatedBooks = () => (
    <ul className="slick-container">{this.renderSlider()}</ul>
  )

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

  renderTopRatedBooksView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponseStatus.inProgress:
        return this.renderLoaderView()
      case apiResponseStatus.success:
        return this.renderTopRatedBooks()
      case apiResponseStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-main-container">
          <div className="home-content-container">
            <h1 className="home-main-heading">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button className="find-button" type="button">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slider-bg-container">
            <div className="slider-content-container">
              <h1 className="slider-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button className="find-button-slider" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="view-container">
              {this.renderTopRatedBooksView()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
