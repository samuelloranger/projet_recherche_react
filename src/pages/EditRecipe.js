import React, { Component, Fragment } from 'react';
import { Header, Button, ElemForm } from '../components/parts';

//Router
import { Link, Redirect } from 'react-router-dom';

//Firebase
import base from '../firebase';

class EditRecipe extends Component {
	state = {
		slug: this.props.match.params.username,
		user: {},
		nom: '',
		image: '',
		ingredients: '',
		instructions: '',
		key: '',
		edit: false,
		done: false
	};

	componentDidMount() {
		base.syncState(`/${this.state.slug}/`, {
			context: this,
			state: 'user'
		});
	}

	componentDidUpdate() {
		const key = this.props.match.params.key;
		const { edit, user } = this.state;

		if (key !== undefined && !edit) {
			const recipe = user.recipes[key];

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
		});
	};

	/**
     * Method handleAddRecipe
     * @description Adds a recipe to the recipe list of the chef
     */
	handleAddRecipe = () => {
		const { user, nom, image, ingredients, instructions } = this.state;

		const recipe = {
			nom: nom,
			image: image,
			ingredients: ingredients,
			instructions: instructions
		};

		user.recipes[`recipe-${Date.now()}`] = recipe;

		this.setState({
			user: user,
			nom: '',
			image: '',
			ingredients: '',
			instructions: '',
			done: true
		});
	};

	/**
     * Method handleEdit
     * @description Edit a recipe
     */
	handleEdit = () => {
		const { user, nom, image, ingredients, instructions, key } = this.state;

		const recipe = {
			nom: nom,
			image: image,
			ingredients: ingredients,
			instructions: instructions
		};

		user.recipes[key] = recipe;

		this.setState({
			user: user,
			done: true
		});
	};

	render() {
		const { user, slug, nom, image, ingredients, instructions, edit, done } = this.state;

		if (done) {
			return <Redirect push to={`/${slug}/`} />;
		}

		return (
			<Fragment>
				<Header username={user.fullName} />

				<main className="container">
					<Link to={`/${slug}/`}>{'< '}Recipes list</Link>

					<ElemForm
						label="Nom de la recette:"
						type="text"
						name="nom"
						action={this.handleChange}
						value={nom}
					/>
					<ElemForm label="Image:" type="text" name="image" action={this.handleChange} value={image} />
					<ElemForm
						label="Ingredients:"
						type="text"
						name="ingredients"
						action={this.handleChange}
						value={ingredients}
					/>
					<ElemForm
						label="Instructions:"
						type="textarea"
						name="instructions"
						action={this.handleChange}
						value={instructions}
					/>

					{!edit ? (
						<Button action={this.handleAddRecipe}>Ajouter</Button>
					) : (
							<Button action={this.handleEdit}>Modifier</Button>
						)}
				</main>
			</Fragment>
		);
	}
}

export default EditRecipe;
