import React from 'react';
import { Container, Image, Grid } from 'semantic-ui-react'

// these queries are here for example ONLY
// import { QUERY_USERS } from '../../utils/queries';
// import { useQuery } from '@apollo/client';


function About() {
	// const { loading, data } = useQuery(QUERY_USERS);

	// const users = data?.users || [];

	return (
		<div>


			<Container>
				<h1 style={{ paddingBottom: '2rem' }}>About Me</h1>


				<Grid divided='vertically'>
					<Grid.Row columns={2}>
						<Grid.Column>
							<Image src={require(`../../assets/images/IMG_2915.jpeg`)} size='large' rounded />
						</Grid.Column>
						<Grid.Column>
							<h3>Hey, I'm Inna</h3>
							<p></p>
						</Grid.Column>
					</Grid.Row>
				</Grid>


			</Container>





			{/* <h1>
			This is the about page.

			{loading ? (
				<div>Loading ...</div>
			) : (
					<div>
						{users.map(user => {
							return <p key={user._id}>{user.email}</p>
						})}
					</div>
			)}
		</h1> */}

		</div>
	);
}

export default About;