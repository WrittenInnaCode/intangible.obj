import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Grid, Container } from 'semantic-ui-react'

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleBlog from './pages/SingleBlog';
import EditBlog from './pages/EditBlog';
import Profile from './pages/Profile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <Header />

          <Grid stackable className='mainGrid'>

            <Grid.Column width={2}>
              <Navbar />
            </Grid.Column>


            <Grid.Column width={10} className="noPadding">
              
              <Container >
                <Routes>
                  <Route
                    path="/"
                    element={<Home />}
                  />
                  <Route
                    path="/blog"
                    element={<Blog />}
                  />
                  <Route
                    path="/login"
                    element={<Login />}
                  />
                  <Route
                    path="/signup"
                    element={<Signup />}
                  />
                  <Route
                    path="/me"
                    element={<Profile />}
                  />
                  <Route
                    path="/profiles/:username"
                    element={<Profile />}
                  />
                  <Route
                    path="/blog/:blogId"
                    element={<SingleBlog />}
                  />
                  <Route
                    path="/blog/:blogId/editblog"
                    element={<EditBlog />}
                  />
                  <Route
                    path="/about"
                    element={<About />}
                  />
                  <Route
                    path="/contact"
                    element={<Contact />}
                  />
                  <Route
                    path='*'
                    element={<h1>Wrong page!</h1>}
                  />
                </Routes>

              </Container>
            </Grid.Column>


          </Grid>

          <Footer />
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
