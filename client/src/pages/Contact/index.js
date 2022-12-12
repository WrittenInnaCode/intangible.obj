import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { Container, Button, Form, Input, Icon, Divider, Grid, Segment } from 'semantic-ui-react'

function Contact() {


	const [formState, setFormState] = useState({
		user_name: "",
		user_email: "",
		message: "",
	});

	const [hiddenState, setHiddenState] = useState(true);

	const { user_name, user_email, message } = formState;

	function handleChange(e) {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	}

	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_a450rd2', 'template_yp6q3cw', form.current, 'NgPjSMCh3eb4HB0WL')
			.then((result) => {
				console.log(result.text);

				// e.target.reset(); ???????

			}, (error) => {
				console.log(error.text);
			});
		setFormState({ user_name: "", user_email: "", subject: "", message: "" })
		setHiddenState(false);
	}

	return (
		<div>
			<h2>
				Are you interested in a specific artwork or do you want to discuss a custom piece?
			</h2>
			<p>
				Please complete the form below
			</p>
			<br />

			<Form ref={form} onSubmit={sendEmail} className="contact-form">
				<div className="user-info">
					<div><input type="text" value={user_name} name="user_name" className="name-input" id="contact-name" placeholder='Name' onChange={handleChange}></input></div>
					<br />
					<input type="email" value={user_email} name="user_email" className="email-input" id="contact-email" placeholder='Email' onChange={handleChange}></input>
				</div>
				<br />
				<div className="message-content">
					{/* <input name="subject" value={subject} className="subject-input" id="contact-subject" placeholder='subject' onChange={handleChange}></input> */}
					<textarea name="message" value={message} className="message-input" id="contact-message" placeholder='Message' onChange={handleChange}></textarea>
				</div>
				<br />
				<div className="send-button">
					<input type="submit" value="send" id="send-email" />
				</div>
				<br />
				<div className={hiddenState ? "hidden-toast" : ""}>
					Your Message Has Been Sent!
				</div>
			</Form>

		</div>
	);
}

export default Contact;