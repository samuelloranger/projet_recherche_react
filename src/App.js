import React, { Component, Fragment } from 'react';
import './App.scss';
import Membre from "./components/Membre";
import Button from "./components/Button";
import ElemFormulaire from "./components/ElemFormulaire";

const famille = [
  {
    nom: "Samuel",
    age: 21
  },
  {
    nom: "Olivier",
    age: 20
  },
  {
    nom: "Barley",
    age: 5
  },
  {
    nom: "Patate",
    age: 19
  }
]

class App extends Component {
  state = {
    famille
  };

  // Évènement qui ajoute le membre à la liste
  handleSubmit = () => {
    const famille = [ ...this.state.famille ];

    const newMembre = {
      nom: this.state.nomMembre,
      age: this.state.ageMembre
    };

    // On ajoute le membre au tableau
    famille.push(newMembre);
    
    // On modifie le state
    this.setState({ 
      famille 
    });
  };

  // Évènement qui change le state de la classe lorsque le formulaire est modifié
  handleChangeInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  // Affichage de la page
  render () {
    //On transforme le state en props
    const { famille } = this.state;

    //Affichage
    return (
      <Fragment>
        <div className="App">
            <h1>Membres de la famille</h1>
            
            {/* Affichage du formulaire d'ajout */}
            <form className="formAjoutUtilisateur">
              <p><strong>Formulaire d'ajout de membre de la famille</strong></p>

              <ElemFormulaire id="nomMembre" label="Nom du membre" type="text" handleChangeInput={ this.handleChangeInput }/>
              <ElemFormulaire id="ageMembre" label="Age du membre" type="number" handleChangeInput={ this.handleChangeInput }/>  
            
              <Button ajouter={ () => this.handleSubmit() }/>
            </form>

            {/* On loop sur le tableau des membres de la famille pour construire la liste */}
            { famille.map(function(membre, key){
                return <Membre key={ key } nom={ membre.nom } age={ membre.age }/>;
              })
            }
        </div>
      </Fragment>
    )
  };
}

export default App;