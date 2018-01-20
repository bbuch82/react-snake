import React from "react";
import ReactDOM from "react-dom";
// main app
import Snake from "./containers/snake";


function run() {
    ReactDOM.render(<Snake />, document.getElementById('app'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}