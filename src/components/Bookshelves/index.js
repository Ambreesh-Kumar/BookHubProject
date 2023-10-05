import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import Sidebar from '../Sidebar'
import BookshelvesCard from '../BookshelvesCard'
import './index.css'

const apiResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    bookshelvesBooksList: [],
    searchInput: '',
    apiStatus: apiResponseStatus.initial,
    searchValue: '',
  }

  componentDidMount() {
    this.getBookShelvesBooks()
  }

  getBookShelvesBooks = async () => {
    this.setState({apiStatus: apiResponseStatus.inProgress})
    const {initialBookshelvesList, activeShelf} = this.props
    const {searchValue} = this.state
    const activeSelfItem = initialBookshelvesList.find(
      item => item.value === activeShelf,
    )
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeSelfItem.value}&search=${searchValue}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.books.map(item => ({
        id: item.id,
        authorName: item.author_name,
        coverPic: item.cover_pic,
        rating: item.rating,
        readStatus: item.read_status,
        title: item.title,
      }))
      this.setState({
        bookshelvesBooksList: data,
        apiStatus: apiResponseStatus.success,
      })
    } else {
      this.setState({apiStatus: apiResponseStatus.failure})
    }
  }

  renderBookshelvesBooks = () => {
    const {bookshelvesBooksList, searchValue} = this.state
    const bookListLength = bookshelvesBooksList.length
    return (
      <div>
        {bookListLength > 0 ? (
          <ul className="bookshelves-unordered-list">
            {bookshelvesBooksList.map(item => (
              <BookshelvesCard bookItem={item} key={item.id} />
            ))}
          </ul>
        ) : (
          <div className="no-search-container">
            <img
              src="https://res.cloudinary.com/dsd24aeen/image/upload/v1696488367/irv7gysxkf6gow4wqqgc.png"
              alt="no books"
              className="no-search-image"
            />
            <p className="no-search-description">
              Your search for {searchValue} did not find any matches.
            </p>
          </div>
        )}
      </div>
    )
  }

  onTryAgain = () => {
    this.getBookShelvesBooks()
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchInputValue = () => {
    const {searchInput} = this.state
    this.setState({searchValue: searchInput}, this.getBookShelvesBooks)
  }

  renderBookshelvesBooksView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponseStatus.inProgress:
        return this.renderLoaderView()
      case apiResponseStatus.success:
        return this.renderBookshelvesBooks()
      case apiResponseStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {initialBookshelvesList, activeShelf, changeActiveShelf} = this.props
    const {searchInput} = this.state
    const activeSelfItem = initialBookshelvesList.find(
      item => item.value === activeShelf,
    )
    return (
      <div className="bookshelves-bg-container">
        <Header />
        <div className="bookshelves-main-container">
          <div className="desktop-sidebar-container">
            <Sidebar
              changeActiveShelf={changeActiveShelf}
              initialBookshelvesList={initialBookshelvesList}
              getBookShelvesBooks={this.getBookShelvesBooks}
            />
          </div>
          <div className="bookshelves-input-and-books-container">
            <div className="bookshelves-input-container">
              <h1 className="bookshelves-input-container-heading">{`${activeSelfItem.label} Books`}</h1>
              <div className="input-container-with-search-botton">
                <input
                  type="search"
                  placeholder="Search"
                  className="inputEl"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  className="search-button"
                  testid="searchButton"
                  onClick={this.onSearchInputValue}
                  type="button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="mobile-sidebar-container">
              <Sidebar
                changeActiveShelf={changeActiveShelf}
                initialBookshelvesList={initialBookshelvesList}
                getBookShelvesBooks={this.getBookShelvesBooks}
              />
            </div>
            <div className="bookshelvesViewContainer">
              {this.renderBookshelvesBooksView()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Bookshelves
