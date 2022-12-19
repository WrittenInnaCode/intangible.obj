import React, { useState } from 'react';
import Object from '../../components/Object';
import { Grid} from 'semantic-ui-react'

function Home() {
    const [objects] = useState([
        {
            name: "Starry Box",
            description: "Resin, mica powders, glitter",
            image: "box.JPG",
            image1: "box1.JPG",
            image2: "box2.jpg",
            image3: "box3.jpg",
            image4: "box4.jpg"
        },
        {
            name: "Yellow",
            description: "Resin, pigments",
            image: "yellow.png",
            image1: "yellow1.png",
            image2: "yellow2.png",
            image3: "yellow3.jpeg",
            image4: "yellow4.jpeg",
        },
        {
            name: "Tarantula Eyes Vase",
            description: "Hand-dyed sand, resin, pigments",
            image: "tarantula_eyes.jpeg",
            image1: "tarantula_eyes1.jpeg",
            image2: "tarantula_eyes2.jpeg",
            image3: "tarantula_eyes3.jpeg",
            image4: "invisible_img.png"
        },
        {
            name: "Drip Tray",
            description: "Resin, cardboard",
            image: "driptray.jpeg",
            image1: "driptray1.jpeg",
            image2: "driptray2.jpeg",
            image3: "driptray3.jpeg",
            image4: "driptray4.jpeg",
        },
        {
            name: "Fine Sand",
            description: "Sand, resin",
            image: "fine_sand.png",
            image1: "fine_sand1.png",
            image2: "fine_sand2.jpeg",
            image3: "fine_sand3.jpeg",
            image4: "fine_sand4.jpeg",
        },
        {
            name: "Rainforest Jungle",
            description: "Red dirt, gold leaf, resin",
            image: "rainforest.png",
            image1: "rainforest1.png",
            image2: "rainforest2.jpeg",
            image3: "rainforest3.jpeg",
            image4: "rainforest4.jpeg",
        },
        {
            name: "Glass Drip",
            description: "Crushed glass, mica powder, resin",
            image: "glassdrip.png",
            image1: "glassdrip1.png",
            image2: "glassdrip2.png",
            image3: "glassdrip3.jpeg",
            image4: "glassdrip4.jpeg",
        },
        {
            name: "Lava",
            description: "Volcanic sand, gold leaf, resin",
            image: "lava.png",
            image1: "lava1.png",
            image2: "lava2.png",
            image3: "invisible_img.png",
            image4: "invisible_img.png"
        },
        {
            name: "Ocean",
            description: "Sand, resin, glitter",
            image: "ocean.png",
            image1: "ocean1.png",
            image2: "ocean2.png",
            image3: "ocean3.jpeg",
            image4: "invisible_img.png"
        },
        {
            name: "Ice Cube",
            description: "Resin",
            image: "ice.jpeg",
            image1: "ice1.jpeg",
            image2: "ice2.jpeg",
            image3: "invisible_img.png",
            image4: "invisible_img.png"
        },
        {
            name: "Coffee Lover",
            description: "Resin, glitter, pigment",
            image: "coffee.png",
            image1: "coffee1.png",
            image2: "coffee2.jpeg",
            image3: "coffee3.jpeg",
            image4: "invisible_img.png"
        },
    ])


    return (
        <div>
        
            
                <Grid>
                    <Grid columns={3} stackable>
                            {objects.map((object, i) => (
                                <Grid.Column className="homeGrid">
                                    <Object object={object} key={"object" + i} />
                                </Grid.Column>
                            ))}
                    </Grid>
                </Grid>
           


        </div>
    );
}

export default Home;