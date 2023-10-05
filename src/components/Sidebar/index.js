import './index.css'

const Sidebar = props => {
  const {initialBookshelvesList, changeActiveShelf, getBookShelvesBooks} = props
  const onChangeActiveShelf = shelf => {
    changeActiveShelf(shelf, getBookShelvesBooks)
  }
  return (
    <div className="sidebar-bg-container">
      <div className="sidebar-desktopView">
        <h1 className="sidebar-heading">Bookshelves</h1>
        <ul className="sidebar-menu-unordered-list">
          {initialBookshelvesList.map(item => (
            <li key={item.id}>
              <button
                className="sidebar-menu-button"
                type="button"
                onClick={() => onChangeActiveShelf(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-mobile-view">
        <h1 className="sidebar-mobile-heading">Bookshelves</h1>
        <ul className="mobile-sidebar-menu-unordered-list">
          {initialBookshelvesList.map(item => (
            <li key={item.id}>
              <button
                className="sidebar-menu-mobile-button"
                type="button"
                onClick={() => onChangeActiveShelf(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
