import React, { useState } from 'react';
import Object from '../../components/Object';
import { Container, Row, Column, Grid, Image } from 'semantic-ui-react'

function Home() {
	const [objects] = useState([
        {
            name: "Courier App",
            description: "Javascript, Express, Sequelize, Handlebars",
            deployedLink: "https://courier-share.herokuapp.com/info",
            githubLink: "https://github.com/joejhansen/courier-app",
            image: "octocatInna.png"
        }
    ])


	return (
		<div>
			<h1>
				This is the homepage.
			</h1>

			<Container>
                <div>
                    {objects.map((object, i) => (
                        <div>
                            <Object object={object} key={"object" + i} />
                        </div>
                    ))}
                </div>
            </Container>
		

		</div>
	);
}

export default Home;