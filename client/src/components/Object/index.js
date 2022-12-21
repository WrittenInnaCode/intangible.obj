import React from 'react';
import { Image, Modal, Segment } from 'semantic-ui-react'

function Object({ object }) {

    const { name, description, image, image1, image2, image3, image4 } = object;

    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <div className='media-portfolio-1'>
                <div className="portfolio-box" key={name}>

                    <Modal closeIcon
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size='large'
                        trigger={<Image
                            src={require(`../../assets/images/${image}`)}
                            alt={name}
                            className="img-fluid" />} >

                        <Modal.Header>{name}</Modal.Header>

                        <Modal.Content image>

                            <Segment>
                                <h3 style={{textAlign: 'center'}}>{description}</h3>

                                <Modal.Description wrapped>
                                    <Image fluid
                                        src={require(`../../assets/images/${image}`)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Image fluid
                                        src={require(`../../assets/images/${image1}`)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Image fluid
                                        src={require(`../../assets/images/${image2}`)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Image
                                        src={require(`../../assets/images/${image3}`)}
                                        style={{ marginBottom: 10 }}
                                    />
                                    <Image
                                        src={require(`../../assets/images/${image4}`)}
                                        style={{ marginBottom: 10 }}
                                    />


                                </Modal.Description>
                            </Segment>



                        </Modal.Content>

                    </Modal>


                </div>
            </div>

        </div>
    )
}

export default Object;