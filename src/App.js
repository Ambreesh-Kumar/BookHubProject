import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Bookshelves from './components/Bookshelves'
import BookDetail from './components/BookDetail'
import NotFound from './components/NotFound'
// import BookContext from './Context/BookContext'
import BookProtected from './components/ProtectedRoute'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route
// HexCode:  #F8FAFC

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class App extends Component {
  state = {
    initialBookshelvesList: bookshelvesList,
    activeShelf: bookshelvesList[0].value,
  }

  changeActiveShelf = (shelf, getBookShelvesBooks) => {
    this.setState({activeShelf: shelf}, getBookShelvesBooks)
  }

  render() {
    const {initialBookshelvesList, activeShelf} = this.state

    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <BookProtected exact path="/" component={Home} />
        <BookProtected
          exact
          path="/shelf"
          render={props => (
            <Bookshelves
              initialBookshelvesList={initialBookshelvesList}
              activeShelf={activeShelf}
              changeActiveShelf={this.changeActiveShelf}
              {...props} // You can spread the rest of the route props
            />
          )}
        />
        <BookProtected exact path="/books/:id" component={BookDetail} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
