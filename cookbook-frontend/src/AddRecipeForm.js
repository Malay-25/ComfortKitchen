import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function AddRecipeForm({ oneRecipeAdded }) {
    const location = useLocation();
    const recipeToEdit = location.state?.recipeToEdit;

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (recipeToEdit) {
            setTitle(recipeToEdit.title || '');
            setIngredients(recipeToEdit.ingredients || '');
            setInstructions(recipeToEdit.instructions || '');
            setTags(recipeToEdit.tags || '');
        } else {
            // Reset the form when not editing
            setTitle('');
            setIngredients('');
            setInstructions('');
            setImage(null);
            setTags('');
        }
    }, [recipeToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('ingredients', ingredients);
        formdata.append('instructions', instructions);
        formdata.append('tags', tags);
        if (image) {
            formdata.append('image', image);
        }

        try {
            if (recipeToEdit) {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/recipes/${recipeToEdit.id}/`,
                    formdata,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                console.log('Recipe updated:', response.data);
            } else {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/recipes/',
                    formdata,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                console.log('Recipe added:', response.data);
            }

            alert('Recipe saved!');
            oneRecipeAdded();  // Refresh recipe list
        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>{recipeToEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients:</label>
                    <textarea
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Enter one ingredient per line"
                        required
                    />
                    <small className="text-muted">
                        Example: Use Enter/Return to separate each step onto a new line.
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label">Instructions:</label>
                    <textarea
                        className="form-control"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Enter one step per line"
                        rows={6}
                        required
                    />
                    <small className="text-muted">
                        Example: Use Enter/Return to separate each step onto a new line.
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tags (comma-separated):</label>
                    <input
                        className="form-control"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <button className="btn btn-success" type="submit">
                    {recipeToEdit ? 'Update Recipe' : 'Add Recipe'}
                </button>
            </form>
        </div>
    );
}

export default AddRecipeForm;
