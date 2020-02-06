import React from "react";
import Button from "./Button";



const Membre = ({ id, nom, age, handleAge }) => {
    return(
        <div className="membre">
            <h2>{ nom }</h2>
            <p><strong>Age: </strong> { age }</p>
            
            <Button action={ () => handleAge(id, "incrementer") } label="+"/>
            <Button action={ () => handleAge(id, "decrementer") } label="-"/>
        </div>
    )
};

export default Membre;