import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/recipes/${id}/`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error('Error fetching recipe:', err));
  }, [id]);

  const formatTextAsList = (text) => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .map((line, index) => {
        const cleanLine = line.replace(/^[-*•\d.]+\s*/, '');
        return <li key={index} className="mb-1">{cleanLine}</li>;
      });
  };

  if (!recipe) return <div className="mt-5">Loading...</div>;

  return (
    <div className='container mt-5'>
      <div className="card mx-auto shadow" style={{ maxWidth: '700px' }}>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="card-img-top"
            style={{ objectFit: 'cover', height: '300px' }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title mb-3">{recipe.title}</h3>

          {recipe.tags && (
            <p><strong>Tags:</strong> {recipe.tags}</p>
          )}

          <h5 className="mt-4">Ingredients</h5>
          <ul className="ps-3">
            {formatTextAsList(recipe.ingredients)}
          </ul>

          <h5 className="mt-4">Instructions</h5>
          <ul className="ps-3">
            {formatTextAsList(recipe.instructions)}
          </ul>

          <button className="btn btn-secondary mt-4" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
