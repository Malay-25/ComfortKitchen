import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm';
import axios from 'axios';
import RecipeDetail from './RecipeDetail';
import './custom.css'

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
    <div className="container text-center">
      <img
        src="ComfortKitchen.png"
        alt="Comfort Kitchen Logo"
        style={{ height: '200px', marginTop: '3px'}}
      />

      <div style={{
        //backgroundColor: '#FFE0CC',
        //padding: '10px 0',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '1.1rem',
        marginBottom: '20px'
      }}>
        <Link to="/" style={{ margin: '0 20px', color: '#3B2F2F', textDecoration: 'none' }}>Home</Link>
        <Link to="/add" style={{ margin: '0 20px', color: '#3B2F2F', textDecoration: 'none' }}>Add Recipe</Link>
      </div>

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
              oneRecipeAdded={fetchRecipes}
            />
          }
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetail />}
        />
      </Routes>
    </div>
  );
}

export default AppWrapper;
