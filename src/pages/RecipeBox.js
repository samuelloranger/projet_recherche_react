import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Header, Card, FontAwesomeIcon } from '../components/parts';

//Router
import { Link } from 'react-router-dom';

//Font Awesome Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//Firebase
import base from '../firebase';

//Recipes base
import recipebase from '../assets/recettes';

function App(props) {
	const slug = props.match.params.username;
	const [ username, setUsername ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ recipes, setRecipes ] = useState({});
	const [ loaded, setLoaded ] = useState(false);

	if (!loaded) {
		base
			.fetch(`/${slug}`, {
				context: this
			})
			.then((data) => {
				setUsername(data.username);
				setFullName(data.fullName);
				setRecipes(data.recipes);
				setLoaded(true);
			})
			.catch((error) => {
				//handle error
			});
	}

	const addAllRecipes = () => {
		base.post(`${slug}/recipes`, {
			data: recipebase
		});
	};

	const cards = () => {
		return Object.entries(recipes).map((recipe) => {
			return <Card key={recipe[0]} recipe={recipe} slug={slug} />;
		});
	};

	return (
		<Fragment>
			<Header username={fullName} />

			<main className="recipes container">
				<span className="recipes__addBtn">
					<Link to={`/${slug}/add/`}>
						<FontAwesomeIcon icon={faPlus} />
					</Link>
				</span>
				<h2 className="recipes__title">Recipes</h2>
				<div className="recipes__content">
					{Object.entries(recipes).length > 1 ? cards() : <p>Aucune recette...</p>}
				</div>
				{/* <p onClick={addAllRecipes}>Ajouter toutes les recettes</p> */}
			</main>
		</Fragment>
	);
}

export default App;
