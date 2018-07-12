import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './static.css';
import Game from './Game';
import GameIMG from './GameIMG';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
class NotFound extends React.Component{
  render(){
      return <h2>Ресурс не найден</h2>;
  }
}
ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
    <header>
      <h1>Barley-Break</h1>
      <nav className="nav">
        <NavLink exact className="navLink" activeClassName="navLinkActive" to="/">NUM</NavLink>
        <NavLink className="navLink" activeClassName="navLinkActive" to="/imgMod">IMG</NavLink>
      </nav>
    </header>

    <Switch>
      <Route exact path="/" component={Game}/>
      <Route path="/imgMod" component={GameIMG}/>
      <Route component={NotFound}/>
    </Switch>
    <footer>© 2018 Loyko Artem</footer>
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById('root'));
