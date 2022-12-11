import React from 'react';

function Object({ object }) {

    const { name, description, deployedLink, githubLink, image } = object;

    return (
        <div>
            <div className='media-portfolio-1'>
                <div className="portfolio-box" key={name}>
                    <img
                        src={require(`../../assets/images/${image}`)}
                        alt={name}
                        className="img-fluid"
                    />
                    <div className="portfolio-caps">
                        <div className="portfolio-content gradient-text text-center">

                            <a href={deployedLink} target="_blank" rel="noreferrer">{name}</a>
                            <a href={githubLink} target="_blank" rel="noreferrer"><i className='fab fa-github'></i></a>
                            <p className="fs-6">{description}</p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Object;