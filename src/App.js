import logo from './logo.svg';
import './App.css';

import Body from './components/body';
import Header from './components/header/header';
import { useDispatch } from 'react-redux';
import { getRecipes } from './components/service/serviceRecipe';
import { getCategories } from './components/service/serviceCategory';

function App() {

 

  return (
    <div className="App">
      <header className="App-header"  >
        <Header />
          <Body />
      </header>
      
    
    </div>

  );
}

export default App;
