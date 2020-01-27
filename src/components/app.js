import React, { Component } from 'react';
import { Route, Switch, NavLink,BrowserRouter } from "react-router-dom";
import Demo1 from "./demo1";
import Demo2 from "./demo2";
import Demo3 from "./demo3";
import Demo4 from "./demo4";
import NavBar from "./NavBar";

export default class App extends Component {
  render() {
    return (
		<div>
		   <NavBar/>

			<Switch>
			  <Route exact path='/demo1' component={Demo1} />
			  <Route exact path='/demo2' component={Demo2} />
			  <Route exact path='/demo3' component={Demo3} />
			  <Route exact path='/demo4' component={Demo4} />
			</Switch>

		</div>
    );
  }
}
