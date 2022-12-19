import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Grid, Segment } from 'semantic-ui-react'

export default class MenuVerticalSecondary extends Component {
	state = { activeItem: 'home' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
<div>
			<Menu pointing secondary vertical >

				<Link to="/">
					<Menu.Item
						name='home'
						active={activeItem === 'home'}
						onClick={this.handleItemClick}
					/>
				</Link>

				<Link to="/blog">
					<Menu.Item
						name='blog'
						active={activeItem === 'blog'}
						onClick={this.handleItemClick}
					/>
				</Link>

				<Link to="/about">
					<Menu.Item
						name='about'
						active={activeItem === 'about'}
						onClick={this.handleItemClick}
					/>
				</Link>

				<Link to="/contact">
					<Menu.Item
						name='contact'
						active={activeItem === 'contact'}
						onClick={this.handleItemClick}
					/>
				</Link>

			</Menu>

</div>
		)
	}
}