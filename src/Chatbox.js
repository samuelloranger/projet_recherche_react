import React, { Component, Fragment } from 'react';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import iconLogOut from './assets/log_out.svg';

//Firebase
import base from './firebase';

class Chatbox extends Component {
	state = {
		messages: {},
		pseudo: this.props.match.params.pseudo
	};

	/**
   * Lorsque le component vient de se mount, on synchronise la bd firebase
   * et notre state messages
   */
	componentDidMount() {
		base.syncState('/', {
			context: this,
			state: 'messages'
		});
	}

	/** 
   * Création de la référence de la zone des message pour que le conteneur 
   * messages descende au bas de la page lors d'un nouveau message
   */
	messagesRef = React.createRef();

	/**
   * À l'update du component, on scroll le conteneur messages au bas de la page
   */
	componentDidUpdate() {
		const ref = this.messagesRef.current;
		ref.scrollTop = ref.scrollHeight;
	}

	/**
   * Ajout de messages au state
   */
	addMessage = (message) => {
		const messages = { ...this.state.messages };

		messages[`message-${Date.now()}`] = message;

		//Fonctionnalite qui empeche de d'avoir plus que 10 messages dans le chat
		// Object.keys(messages)
		//   .slice(0, -10)
		//   .forEach(key => {
		//     messages[key] = null;
		//   });

		this.setState({
			messages: messages
		});
	};

	/**
   * Fonction qui retourne si le pseudo testé est le pseudo de l'utilateur connecté
   */
	isUser = (pseudo) => pseudo === this.state.pseudo;

	// Affichage de la page
	render() {
		const messages = Object.keys(this.state.messages).map((message) => (
			<Message
				pseudo={this.state.messages[message].pseudo}
				message={this.state.messages[message].message}
				isUser={this.isUser}
			/>
		));

		//Affichage
		return (
			<Fragment>
				<div className="chatBox">
					<div className="chatBox__header">
						<h1 className="chatBox__header__title">Chatbox React</h1>
						<a href="/" className="chatBox__header__disconnect">
							<img src={iconLogOut} alt="Disconnect" />
						</a>
					</div>
					<div className="chatBox__container">
						<div className="messages" ref={this.messagesRef}>
							<div className="messages__container">
								{
									/* Loop sur le array des messages*/
									messages
								}
							</div>
						</div>

						<Formulaire addMessage={this.addMessage} length={140} pseudo={this.state.pseudo} />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Chatbox;
