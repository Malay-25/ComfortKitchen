import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecipeList({ recipes, onEdit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/recipes/${id}/`);
                window.location.reload();
            } catch (err) {
                console.error("Error deleting recipe:", err);
                alert("Failed to delete recipe.");
            }
        }
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.tags && recipe.tags.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Recipes</h2>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search recipes by title or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className='row'>
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div className='col-md-4 mb-4' key={recipe.id}>
                            <div className='card h-100 shadow-sm'>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                                >
                                    {recipe.image && (
                                        <img
                                            src={recipe.image}
                                            className='card-img-top'
                                            alt={recipe.title}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div className='card-body d-flex flex-column'>
                                    <h5
                                        className='card-title'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                                    >
                                        {recipe.title}
                                    </h5>
                                    {recipe.tags && (
                                        <p className="card-text text-muted mb-2">
                                            <strong>Tags:</strong> {recipe.tags}
                                        </p>
                                    )}
                                    <div className="mt-auto">
                                        <button className='btn btn-primary btn-sm me-2' onClick={() => onEdit(recipe)}>
                                            Edit
                                        </button>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(recipe.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

export default RecipeList;
