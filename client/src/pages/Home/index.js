import React, { useState } from 'react';
import Object from '../../components/Object';
import { Container, Row, Column, Grid, Image } from 'semantic-ui-react'

function Home() {
    const [objects] = useState([
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
    ])


    return (
        <div>
            <h1>
                This is the homepage.
            </h1>

            <Container fluid>
                <Grid>
                    <Grid columns={3} stackable>
                            {objects.map((object, i) => (
                                <Grid.Column>
                                    <Object object={object} key={"object" + i} />
                                </Grid.Column>
                            ))}
                    </Grid>
                </Grid>
            </Container>


        </div>
    );
}

export default Home;