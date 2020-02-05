import React, { Component, Fragment } from 'react';
import './App.scss';
import Membre from "./components/Membre";
import Button from "./components/Button";
import ElemFormulaire from "./components/ElemFormulaire";

const famille = [
  {
    id: 0,
    nom: "Samuel",
    age: 21
  },
  {
    id: 1,
    nom: "Patricia",
    age: 25
  },
  {
    id: 2,
    nom: "Gabrielle",
    age: 22
  },
  {
    id: 3,
    nom: "Sylvain",
    age: 56
  },
  {
    id: 4,
    nom: "Chantal",
    age: 54
  }
];

class App extends Component {
  state = {
    loaded: false,
    famille: famille,
    ageTotal: 0
  };

  // Évènement qui ajoute le membre à la liste
  handleSubmit = () => {
    const famille = [ ...this.state.famille ];

    const newMembre = {
      id: Object.entries(this.state.famille).length,
      nom: this.state.nomMembre,
      age: parseInt(this.state.ageMembre)
    };

    // On ajoute le membre au tableau
    famille.push(newMembre);
    
    // On modifie le state
    this.setState({ 
      famille: famille
    });
  };

  // Évènement qui change le state de la classe lorsque le formulaire est modifié
  handleChangeInput = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  };

  // Changement de l'âge total des membres de la famile
  handleAge = (idMembre, action) => {
    const famille = [  ...this.state.famille ];
    console.log(famille);

    action === "incrementer" ? famille[idMembre].age++ : famille[idMembre].age--;

    this.setState({
      famille: famille
    });
  };

  // Calcul total de l'âge des membres de la famille
  calculerAgeTotal = () => {
    let ageTotal = 0;
    this.state.famille.map((membre) => {
      return ageTotal += membre.age;
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
      <Fragment>
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
              { famille.map((membre, key) => {
                return <Membre key={ key } idMembre={ membre.id } nom={ membre.nom } age={ membre.age } handleAge={ this.handleAge }/>;
              })}
            </div>
        </div>
      </Fragment>
    )
  };
}

export default App;