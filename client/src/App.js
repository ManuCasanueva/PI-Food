import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Formulario from './components/Formulario/Formulario';
import RecipeDetail from "./components/RecipesDetails/RecipeDetails"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* <Route path="/home" component={NavBar} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/newrecipe" component={Formulario} />
          <Route exact path="/home/recipes/:id" component={RecipeDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
