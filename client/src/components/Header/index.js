import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button } from 'semantic-ui-react'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <header className='header'>

        <div>
          <Link to="/">
            <h1>in_tangible.obj</h1>
          </Link>

        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                {Auth.getProfile().data.username}'s profile {' '}
              </Link>
              <Button onClick={logout} icon='log out' inverted color='pink' circular />
              
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              {/* <Link to="/signup">
                Signup
              </Link> */}
            </>
          )}
        </div>

      </header>
      {/* <Divider /> */}

    </div>
  );
};

export default Header;
