import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

//Pages
import Accueil from './components/Accueil';
import MovieList from './MoviesList';

//404
import NotFound from './components/NotFound';

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={withRouter(Accueil)} />
			<Route exact path="/movielist/" component={withRouter(MovieList)} />
			<Route exact path="/movielist/page/:page" component={withRouter(MovieList)} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
