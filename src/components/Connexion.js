import React, { Component } from 'react'
import Button from "./Button";
import { Redirect }  from "react-router-dom";

class Connexion extends Component {
    state = {
        pseudo: "",
        goToChat: false
    };

    handleChange = (event) => {
        const pseudo = event.target.value;
        this.setState({
            pseudo: pseudo
        })
    };

    handleSubmit = (event) => { 
        event.preventDefault();

        this.setState({
            goToChat: true
        })
    }

    render() {
        if(this.state.goToChat){
            return <Redirect push to={ `/pseudo/${ this.state.pseudo }` }></Redirect>
        }

        return (
            <div className="connexionBox">
                <form className="formConnexion" onSubmit={ this.handleSubmit }>
                    <label htmlFor="pseudo">Pseudo:</label>
                    <input 
                        id="pseudo"
                        name="pseudo"
                        type="text"
                        onChange={ this.handleChange }
                        required
                    />
                    <Button>Connexion</Button>
                </form>
            </div>
        )
    }
}

export default Connexion
