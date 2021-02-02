import React,{useEffect,useState} from 'react'
import './App.css'
import Recipe from './Recipe';

const App = () => {
  const APP_ID = '72c371b0';
  const APP_KEY="9852f391c7ca4a236eb09197ca1e3abb";
  const [recipes,setRecipes] = useState([]);
 const [search, setSearch] = useState('');
 const [query, setQuery]=useState('chicken');
  useEffect(()=>{
   getRecipe();
  },[query]);

const getRecipe = async ()=>{
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  // console.log(data.hits);
  setRecipes(data.hits);
}
const item = e =>{
  e.preventDefault();
  setQuery(search);
}

    return (
    <div className="App">
      <form onSubmit={item} className="search-form">
        <input value={search} onChange={e=>{setSearch(e.target.value)}} className="search-bar" type="text"/>
        <button  className="search-button" type="submit">Search</button>
      </form>
     <div className='recipes'>
     {recipes.map(x=>(
         <Recipe key={x.recipe.label} title={x.recipe.label} calories={x.recipe.calories}
         img = {x.recipe.image} ingredients = {x.recipe.ingredients}/>
      ))}
     </div>
     
    </div>
  )
}

export default App
