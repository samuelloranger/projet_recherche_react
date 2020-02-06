import React, { Component } from 'react';
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
    nom: "Patricia",
    age: 25
  },
  membre3: {
    nom: "Gabrielle",
    age: 22
  },
  membre4: {
    nom: "Sylvain",
    age: 56
  },
  membre5: {
    nom: "Chantal",
    age: 54
  }
};

class App extends Component {
  state = {
    famille: famille,
    ageTotal: 0
  };

  // Évènement qui ajoute le membre à la liste
  handleSubmit = () => {
    const famille = { ...this.state.famille };

    const newMembre = {
      nom: this.state.nomMembre,
      age: parseInt(this.state.ageMembre)
    };

    // On ajoute le membre au tableau
    famille[newMembre] = newMembre;
    
    // On modifie le state
    this.setState({ 
      famille: famille
    }, 
      console.log(this.state.famille)
    );
  };

  // Évènement qui change le state de la classe lorsque le formulaire est modifié
  handleChangeInput = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  };

  // Changement de l'âge total des membres de la famile
  handleAge = (id, action) => {
    const famille = { ...this.state.famille };

    action === "incrementer" ? famille[id].age++ : famille[id].age--;

    this.setState({
      famille: famille
    });
  };

  // Calcul total de l'âge des membres de la famille
  calculerAgeTotal = () => {
    const famille = this.state.famille;

    let ageTotal = 0;
     Object.keys(famille)
      .map(membre => {
        ageTotal += famille[membre].age
        return null;
      });

    return ageTotal;
  };

  // Affichage de la page
  render () {
    //On transforme le state en props
    const famille = this.state.famille;
    const ageTotal = this.calculerAgeTotal();

    //Affichage
    return (
        <div className="App">
            <h1>Membres de la famille</h1>
            
            {/* Affichage du formulaire d'ajout */}
            <form className="formAjoutUtilisateur">
              <p><strong>Formulaire d'ajout de membre de la famille</strong></p>

              <ElemFormulaire id="nomMembre" label="Nom du membre" type="text" handleChangeInput={ this.handleChangeInput } />
              <ElemFormulaire id="ageMembre" label="Age du membre" type="number" handleChangeInput={ this.handleChangeInput }/>  
            
              <Button action={ () => this.handleSubmit() } label="Ajouter"/>
            </form>

            <p><strong>Âge total des membres de la famille: </strong>{ ageTotal } ans</p>

            <div className="grilleMembres">
              {/* On loop sur le tableau des membres de la famille pour construire la liste */}
              { 
                Object.keys(famille)
                  .map(membre => (
                    <Membre 
                      id={ membre }
                      key={ membre }
                      nom={ famille[membre].nom } 
                      age={ famille[membre].age } 
                      handleAge={ this.handleAge }
                    />
                  ))
              }
            </div>

        </div>
    )
  };
}

export default App;