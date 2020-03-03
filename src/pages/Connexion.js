import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

//Librairies
import passwordHash from 'password-hash';

//Components
import { FontAwesomeIcon, Button, ElemForm } from '../components/parts/';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

//Firebase
import base from '../firebase';

function Connexion() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailValid, setEmailValid] = useState(true);

	const [slug, setSlug] = useState('');

	const [connected, setConnected] = useState(false);

	const [emailNotFound, setEmailNotFound] = useState(false);
	const [wrongPassword, setWrongPassword] = useState(false);

	const patternName = new RegExp('[A-Za-z-]{1,}');

	useEffect(
		() => {
			if (email !== '') {
				email.search(patternName) !== 0 ? setEmailValid(false) : setEmailValid(true);
			}
		},
		[email, password, patternName]
	);

	/**
     * Method handleSubmit
     * @param {EventTarget} e Event that calls the function
     * @description Tests a last time if the email is valid and connects to the app
     */
	const handleSubmit = (e) => {
		e.preventDefault();
		let users = {};

		base
			.fetch('/', {
				context: this
			})
			.then((data) => {
				users = data;
			})
			.then(() => {
				if (email !== '') {
					verifyUser();
				}
			})
			.catch((error) => {
				//handle error
			});

		const verifyUser = () => {
			Object.entries(users).forEach((user) => {
				if (email === user[1].email) {
					if (passwordHash.verify(password, user[1].password)) {
						setSlug(user[1].slug);
						setConnected(true);
					} else {
						setWrongPassword(true);
						console.log('Wrong password');
					}
				} else {
					setEmailNotFound(false);
				}
			});
		};
	};

	if (connected) {
		return <Redirect to={`/${slug}`} />;
	}
	return (
		<div className="container containerForm mt-5">
			<form className="formConnexion" onSubmit={handleSubmit}>
				<h1 className="text-center">Recipe box</h1>

				{emailNotFound && <p className="error">This account does not exist</p>}

				{!emailValid && (
					<p className="error">
						<FontAwesomeIcon icon={faExclamation} />Email incorrect
					</p>
				)}
				<ElemForm
					label="Email"
					input="text"
					name="email"
					action={(e) => setEmail(e.currentTarget.value)}
					value={email}
				/>

				<ElemForm
					label="Password"
					type="password"
					name="password"
					action={(e) => setPassword(e.currentTarget.value)}
					value={password}
				/>

				{wrongPassword && <p className="error">Password incorrect</p>}

				<div className="formConnexion__btns">
					<Button type="submit">Connect</Button>

					<Link to="/register" className="btn btn--register">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Connexion;
