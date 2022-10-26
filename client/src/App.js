import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Formulario from './components/Formulario/Formulario';
import RecipeDetail from "./components/RecipesDetails/RecipeDetails"


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/newrecipe" component={Formulario} />
      <Route exact path="/home/recipes/:id" component={RecipeDetail} />
    </div>
  );
}

export default App;
