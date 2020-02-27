import React, { Component, Fragment } from 'react'
import { Header, Button, ElemForm } from "../components/parts"

//Router
import { Link } from 'react-router-dom';

//Firebase
import base from '../firebase';

class EditRecipe extends Component {
    state = {
        username: this.props.match.params.username,
        recipes: {},
        nom: "",
        image: "",
        ingredients: "",
        instructions: "",
        key: "",
        edit: false
    }

    componentDidMount() {
		base.syncState(`/${this.state.username}/recipes/`, {
			context: this,
			state: 'recipes'
        });
    }

    componentDidUpdate() {
        const key = this.props.match.params.key;
        const { edit, recipes } = this.state;

        if(key !== undefined && !edit){
            const recipe = recipes[key];

            this.setState({
                nom: recipe.nom,
                image: recipe.image,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                key: key,
                edit: true
            });
        }
    }

    handleChange = (event) => {
        const elem = event.currentTarget;

        this.setState({
            [elem.name]: elem.value 
        })
    };

    /**
     * Method handleAddRecipe
     * @description Adds a recipe to the recipe list of the chef
     */
    handleAddRecipe = () => {
        const { recipes, nom, image, ingredients, instructions } = this.state;

        const recipe = {
            nom: nom,
            image: image,
            ingredients: ingredients,
            instructions: instructions
        }

        recipes[`recipe-${Date.now()}`] = recipe;

        this.setState({
            recipes: recipes,
            nom: "",
            image: "",
            ingredients: "",
            instructions: ""
        })
    };

    /**
     * Method handleEdit
     * @description Edit a recipe
     */
    handleEdit = () => {
        const { recipes, nom, image, ingredients, instructions, key } = this.state;

        const recipe = {
            nom: nom,
            image: image,
            ingredients: ingredients,
            instructions: instructions
        }

        recipes[key] = recipe;

        this.setState({
            recipes: recipes
        })
    }
    
    render() {
        const { username, nom, image, ingredients, instructions, edit } = this.state;

        return (
            <Fragment>
            <Header username={username}/>

            <main className="container">
                <Link to={`/username/${username}/`}>{ "< "}Recipes list</Link>
                
                <ElemForm label="Nom de la recette:" type="text" name="nom" action={ this.handleChange } value={ nom }/>
                <ElemForm label="Image:" type="text" name="image" action={ this.handleChange } value={ image }/>
                <ElemForm label="Ingredients:" type="text" name="ingredients" action={ this.handleChange } value={ ingredients }/>
                <ElemForm label="Instructions:" type="textarea" name="instructions" action={ this.handleChange } value={ instructions }/>

                { !edit ? <Button action={ this.handleAddRecipe }>Ajouter</Button> : <Button action={ this.handleEdit }>Modifier</Button> }
                             
            </main>
            
        </Fragment>
        )
    }
}

export default EditRecipe