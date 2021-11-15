import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
<BrowserRouter>
  <Route component={App} />
</BrowserRouter>,     
document.querySelector("#root")
);
serviceWorker.unregister();