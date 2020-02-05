import React from "react";
import Button from "./Button";

const Membre = ({ idMembre, nom, age, handleAge }) => {
    
    return(
        <div className="membre">
            <h2>{ nom }</h2>
            <p><strong>Age: </strong> { age }</p>
            
            <Button action={ () => handleAge(idMembre, "incrementer") } label="+"/>
            <Button action={ () => handleAge(idMembre, "decrementer") } label="-"/>
        </div>
    )
};

export default Membre;