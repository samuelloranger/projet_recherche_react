import React, { Component, Fragment } from 'react'
import { Header, Card, FontAwesomeIcon } from "../components/parts";

//Router
import { Link } from 'react-router-dom';

//Firebase
import base from '../firebase';

//Font Awesome Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    state = {
        username: this.props.match.params.username,
        recipes: {}
    }

	componentDidMount() {
		this.refFirebase = base.syncState(`/${this.state.username}/recipes/`, {
			context: this,
			state: 'recipes'
        });
    }

    componentWillUnmount () {
        base.removeBinding(this.refFirebase);
    }

    render() {
        const { username, recipes } = this.state;

        const cards = Object.entries(recipes).map((recipe) => {
            return <Card key={ recipe[0] } recipe={ recipe } username={ username }/>
        });
    
        return (
            <Fragment>
                <Header username={ this.state.username }/>

                <main className="recipes container">
                    <span className="recipes__addBtn"><Link to={`/username/${username}/add/`}><FontAwesomeIcon icon={faPlus}/></Link></span>
                
                    <h2 className="recipes__title">Recipes</h2>
                    <div className="recipes__content">
                        { cards.length > 1 ? cards : <p>Aucune recette...</p> }
                    </div>
                </main>

            </Fragment>
        )
    }
}

export default App