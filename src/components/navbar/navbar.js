import React from 'react';
import { Link } from 'react-router-dom';

function navbar() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
        <Link className='navbar-brand px-3' to='/'> <img src="https://www.computerhope.com/issues/pictures/users.png" alt="nav-brand" width={50}/> </Link>
        <ul className='navbar-nav ms-auto px-5'>
          <li className='nav-item'>  
            <Link className='nav-link' to='/'>Add Users</Link>
            </li>
            <li className='nav-item'>  
            <Link className='nav-link' to='/users'>Users</Link>
            </li>
            <li className='nav-item'>  
            <Link className='nav-link' to='/removed-users'> Removed Users</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default navbar

