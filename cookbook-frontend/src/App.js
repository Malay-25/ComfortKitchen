import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm';
import axios from 'axios';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/recipes/');
      setRecipes(response.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleEdit = (recipe) => {
    navigate('/add', { state: { recipeToEdit: recipe } });
  };

  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light my-3">
        <Link className="navbar-brand" to="/">CookBook</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/add">Add Recipe</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <RecipeList
              recipes={recipes}
              onEdit={handleEdit}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddRecipeForm
              oneRecipeAdded={() => {
                fetchRecipes();
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default AppWrapper;
