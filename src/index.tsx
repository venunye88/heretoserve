import React from 'reactn';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { AppLoader } from 'sibaui';
import Config from "./App/Config"
import { GlobalState } from './App/GlobalState';
import { BusySpinner } from './Shared/Components/BusySpinner';

/**
 * Route Imports
 */
import "./RouteImports";

/**
 * Css imports
 */
import "./Css/Main.css";
import './Css/Template.css';

/**
 * Libraries imports
 */
import "jquery/src/jquery";
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "react-toastify/dist/ReactToastify.css"


BusySpinner.init("Loading please wait...");

React.setGlobal(GlobalState.init());
ReactDOM.render(
<HashRouter>
   <AppLoader 
      globalState={GlobalState.init()} 
      appConfig={Config}
      fallBackUi={<div className="animated fadeIn pt-1 text-center">Loading...</div>} />
</HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
