import './index.scss'

const Header = () => {
  return (
    
    <header className='header'>
        <div className='header-location-nav'>
          <a href='https://maps.app.goo.gl/GS8h12gHueLTvLwv8'>
          <img
            src='/assets/location.png'
            alt='Location'
            className='header-location'
          />
          </a>
          <ul className='nav-links'>
            <li>
              <a href='#' className='nav-link'>
                Auction
              </a>
            </li>
            <li>
              <a href='#' className='nav-link'>
                Jewelry
              </a>
            </li>
            <li>
              <a href='#' className='nav-link'>
                Sell
              </a>
            </li>
            <li>
              <a href='#' className='nav-link'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <h1 className='logo'>AURORA</h1>
        <div className='search-and-icons'>
          <div className='search'>
            <input type='text' placeholder='Search' className='search-input' />
            <img
              src='/assets/search.png'
              alt='Search'
              className='search-icon'
            />
          </div>
          <a href='#'>
            <img
              src='/assets/heart.png'
              alt='Favorite'
              className='favorite-icon'
            />
          </a>
          <a href='#'>
            <img src='/assets/cart.png' alt='Cart' className='cart-icon' />
          </a>
          <a href='#'>
            <img
              src='/assets/user.png'
              alt='Profile'
              className='profile-icon'
            />
          </a>
        </div>
      </header>
  )
}

export default Header