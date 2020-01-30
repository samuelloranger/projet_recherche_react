import React, { Component, Fragment } from 'react';
import './App.scss';
import Membre from "./components/Membre";
import Button from "./components/Button";
import ElemFormulaire from "./components/ElemFormulaire";

const famille = {
  membre1: {
    nom: "Samuel",
    age: 21
  },
  membre2: {
    nom: "Olivier",
    age: 20
  },
  membre3: {
    nom: "Barley",
    age: 5
  },
  membre4: {
    nom: "Patate",
    age: 19
  }
}

class App extends Component {
  state = {
    famille
  };

  // Évènement qui ajoute le membre à la liste
  handleSubmit = () => {
    const famille = { ...this.state.famille };
    
    const newMembre = {
      nom: this.state.nomMembre,
      age: this.state.ageMembre
    };

    // On créer l'identifiant
    const identifiantNewMembre = "membre" + (Object.keys(this.state.famille).length+1);

    // On ajoute le membre au tableau
    famille[identifiantNewMembre] = newMembre;
    
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

    //On loop sur le tableau des membres de la famille pour construire la liste
    const listeMembres = Object.keys(famille).map((membre, key) => (
        <Membre key={ key } nom={ famille[membre].nom } age={ famille[membre].age }/>
    ));

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

            {/* Affichage de la liste des membres */}
            { listeMembres }
        </div>
      </Fragment>
    )
  };
}

export default App;