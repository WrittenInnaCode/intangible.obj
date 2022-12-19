import React from 'react';
import { Icon, Divider } from 'semantic-ui-react'



function Footer() {

    return (
        <footer className='footer' style={{ paddingTop: '3rem' }}>

            <Divider />

            <div>
                <ul style={{ listStyleType: 'none', textAlign:'center' }}>
                    <li style={{ padding: '0.5rem' }}>
                        <a href='https://www.instagram.com/in_tangible.obj/' target="_blank" rel="noopener noreferrer" style={{ paddingRight: '0.5rem'}}><Icon name='instagram' size='big' />in_tangible</a> {' '}
                        <a href='mailto:writteninnacode@gmail.com' target="_blank" rel="noopener noreferrer"><Icon name='mail outline' size='big' />writteninnacode@gmail.com</a>
                    </li>
                    <li style={{ padding: '0.5rem', paddingBottom:'1rem' }}>
                        &copy; Inna Sherstnyova {new Date().getFullYear()} All Rights Reserved
                    </li>
                </ul>
            </div>

        </footer>
    );
}

export default Footer;