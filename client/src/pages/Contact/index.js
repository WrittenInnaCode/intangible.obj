import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { Button, Message, Segment } from 'semantic-ui-react'

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


			}, (error) => {
				console.log(error.text);
			});
		setFormState({ user_name: "", user_email: "", message: "" })
		setHiddenState(false);
	}

	return (
		<div>
			<h2 style={{ marginTop:"2rem" }}>
				Are you interested in a specific object or do you want to discuss a custom piece?
			</h2>
			<p style={{ fontSize:"1.2rem" }}>
				Please complete the form below or email me directly at <a href='mailto:writteninnacode@gmail.com'>writteninnacode@gmail.com</a>.
			</p>
			<br />

			<Segment>

			<form ref={form} onSubmit={sendEmail} className="contact-form">
				<div className="user-info">
					<input type="text" required value={user_name} name="user_name" className="name-input" id="contact-name" placeholder='Name' onChange={handleChange}></input>
					<input type="email" required value={user_email} name="user_email" className="email-input" id="contact-email" placeholder='Email' onChange={handleChange}></input>
				</div>

				<div className="message-content">
					<textarea required name="message" value={message} className="message-input" id="contact-message" placeholder='Message' onChange={handleChange} rows="4"></textarea>
				</div>
				<br />
				<div className="send-button">
					<Button color='pink' type="submit" value="send" id="send-email">Send</Button>
				</div>

				<br />
				<Message success compact className={hiddenState ? "hidden" : ""}>
					Thank you, your message has been sent!
				</Message>
			</form>
			</Segment>
		</div>
	);
}

export default Contact;