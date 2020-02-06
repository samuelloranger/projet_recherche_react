import React, { Component } from 'react'
import Button from "./Button";

class Formulaire extends Component {
    state = {
        maxChar: this.props.length,
        message: ""
    }

    //Stock le message tappé dans le state
    handleChange = (event) => {
        const message = event.target.value;
        
        this.setState({
            message: message
        });
    };

    // Créer un nouvel objet message par la fonction addMessage
    createMessage = () => {
        const { addMessage, pseudo } = this.props;

        const message = {
            pseudo: pseudo,
            message: this.state.message
        };

        addMessage(message);
        this.setState({
            message: ""
        })
    };

    //Submit le formulaire et créer un nouveau message
    handleSubmit = (event) => {
        event.preventDefault();
        this.createMessage();
    };

    //Submit du message lorsqu'on appuie sur la touche Enter
    handleKeyUp = (event) => {
        if(event.key === "Enter"){
            this.createMessage();
        }
    }

    render() {
        const charLeft = this.state.maxChar - this.state.message.length;
        
        return (
            <form className="formMessage" onSubmit={ this.handleSubmit }>
                <textarea 
                    required 
                    maxLength={ this.state.maxChar }
                    onKeyUp={ this.handleKeyUp }
                    value={ this.state.message }
                    onChange={ this.handleChange }
                />
                
                <div className="charRestants">{ charLeft }</div>
                
                <Button>Envoyer!</Button>
            </form>
        )
    }
}

export default Formulaire;