import React from 'react';
import ReactDOM from 'react-dom';
import './chatbox.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieList from "./MoviesList";
import NotFound from './components/NotFound';

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ MovieList }></Route>
            {/* <Route path="/movie/:movie" component={ Chatbox }></Route> */}
            <Route component={ NotFound }></Route>
        </Switch>
    </BrowserRouter>
); 

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();