import React, { useState } from 'react';
import axios from 'axios';

function RecipeList({ recipes, onEdit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleInstructions, setVisibleInstructions] = useState({});

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

    const toggleInstructions = (id) => {
        setVisibleInstructions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatInstructions = (text) => {
        return text
            .split(/\r?\n/)
            .map(step => step.replace(/^[-•\d.]+\s*/, '').trim())  // remove 1., -, etc.
            .filter(step => step.length > 0)
            .map((step, index) => <li key={index}>{step}</li>);
    };

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Recipes</h2>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className='row'>
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div className='col-md-4 mb-4' key={recipe.id}>
                            <div className='card h-100 d-flex flex-column'>
                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        className='card-img-top'
                                        alt={recipe.title}
                                        style={{ height: '300px', objectFit: 'cover' }} // increased image size
                                    />
                                )}
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title'>{recipe.title}</h5>

                                    {recipe.tags && (
                                        <p className="card-text mb-2">
                                            <strong>Tags:</strong> {recipe.tags}
                                        </p>
                                    )}

                                    <button
                                        className='btn btn-outline-secondary btn-sm mb-2'
                                        onClick={() => toggleInstructions(recipe.id)}
                                    >
                                        {visibleInstructions[recipe.id] ? 'Hide Instructions' : 'Show Instructions'}
                                    </button>

                                    {visibleInstructions[recipe.id] && (
                                        <ul
                                            className='card-text mb-3'
                                            style={{
                                                fontSize: '0.95rem',
                                                lineHeight: '1.5',
                                                paddingLeft: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {formatInstructions(recipe.instructions)}
                                        </ul>
                                    )}

                                    <div className="mt-auto d-flex justify-content-between">
                                        <button className='btn btn-primary btn-sm' onClick={() => onEdit(recipe)}>
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
