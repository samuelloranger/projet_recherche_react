import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

//Pages
import * as Pages from "./pages";

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={ withRouter(Pages.Connexion) } />
			<Route exact path="/username/:username" component={ withRouter(Pages.App) } />
			<Route exact path="/username/:username/add" component={ withRouter(Pages.EditRecipe) } />
			<Route exact path="/username/:username/edit/:key" component={ withRouter(Pages.EditRecipe) } />
			<Route component={ withRouter(Pages.NotFound) } />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
