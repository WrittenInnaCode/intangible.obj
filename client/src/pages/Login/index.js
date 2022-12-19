import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import { Container, Button, Form, Input, Icon, Divider, Grid, Segment } from 'semantic-ui-react'

import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>

      <Container>

        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <div className='login'>
                
                {data ? (
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (

                  <Form onSubmit={handleFormSubmit} >

                    <Input iconPosition='left'
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    >
                      <Icon name='at' />
                      <input />
                    </Input>

                    <br />
                    <br />

                    <Input iconPosition='left'
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    >
                      <Icon name='lock' />
                      <input />
                    </Input>
                    <br />
                    <br />

                    <Button type="submit" content='Log In' />


                  </Form>
                )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>

            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Link to="/signup"><Button content='Sign up' icon='signup' /></Link>
            </Grid.Column>

          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </Container>

    </main>
  );
};

export default Login;
