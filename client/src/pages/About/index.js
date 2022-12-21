import React from 'react';
import { Container, Image, Grid } from 'semantic-ui-react'

function About() {

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


		</div>
	);
}

export default About;