import React from 'react';

//Router
import { Link } from 'react-router-dom';

//Icons
import { FontAwesomeIcon } from './';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function Card({ recipe, slug }) {
	const key = recipe[0];
	const details = recipe[1];

	const requireImage = (path) => {
		try {
			return require(`../../assets/img/${[ path ]}`);
		} catch (err) {
			return require(`../../assets/img/default.jpeg`);
		}
	};

	return (
		<div className="recipes__content__card">
			<h3 className="title">{details.nom}</h3>

			<div className="content">
				<Link className="content__editLink" to={`/${slug}/edit/${key}`}>
					<FontAwesomeIcon icon={faEdit} />Modifier
				</Link>

				<img className="content__image" src={requireImage(details.image)} alt={`${details.nom}`} />

				<div className="content__infos">
					<h4>Ingrédients</h4>

					<ul>
						{details.ingredients.split(',').map((ingredient, key) => {
							return <li key={key}>{ingredient}</li>;
						})}
					</ul>

					<h4>Instructions</h4>
					<ol>
						{details.instructions.split('\n').map((instruction, key) => {
							return <li key={key}>{instruction}</li>;
						})}
					</ol>
				</div>
			</div>
		</div>
	);
}

export default Card;
