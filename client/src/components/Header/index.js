import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react'

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
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>

      </header>
      <Divider />

    </div>
  );
};

export default Header;
