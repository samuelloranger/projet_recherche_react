import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

import Button from "../components/parts/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
 
function Connexion() {
    const [ username, setUsername ] = useState("");
    const [ usernameValid, setUsernameValid ] = useState(true);
    const [ connected, setConnected ] = useState(false);
    const patternName = new RegExp("[A-Za-z-]{1,}");

    useEffect(() => {
        if(username !== ""){
            username.search(patternName) !== 0 ? setUsernameValid(false) : setUsernameValid(true);
        }
    }, [username, patternName])

    /**
     * Method handleSubmit
     * @param {EventTarget} e Event that calls the function
     * @description Tests a last time if the username is valid and connects to the app
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(username.search(patternName) === 0){
            setConnected(true);
        }
        else{
            setUsernameValid(false);
        }

    };

    if(connected){
        return <Redirect push to={`/pseudo/${username}`}/>
    }
    return (
        <div className="container containerForm mt-5">
            <form className="formConnexion" onSubmit={handleSubmit}>
                <h1 className="text-center">Ma boîte à recettes</h1>

                
                <label htmlFor="chefname">Nom du chef</label>
                { !usernameValid && <p className="error"><FontAwesomeIcon icon={faExclamation}/>Nom d'utilisateur incorrect</p> }
                <input 
                    type="text" 
                    id="chefname"
                    name="chefname"
                    value={ username } 
                    onChange={ (e) => setUsername(e.currentTarget.value) }
                    // pattern="[A-Za-z-]{1,}"
                    required
                />

                <Button type="submit">Se connecter</Button>
            </form>
        </div>
    )
}

export default Connexion
