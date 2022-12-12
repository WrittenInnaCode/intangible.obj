import React, { useState } from 'react';
import Object from '../../components/Object';
import { Container, Grid } from 'semantic-ui-react'

function Home() {
    const [objects] = useState([
        {
            name: "Name of object 1",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object 2",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object 3",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object 4",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object 5",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
        {
            name: "Name of object 6",
            description: "Description",
            deployedLink: " ",
            image: "image.png"
        },
    ])


    return (
        <div>
        
            <Container fluid>
                <Grid>
                    <Grid columns={3} stackable>
                            {objects.map((object, i) => (
                                <Grid.Column className="homeGrid">
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