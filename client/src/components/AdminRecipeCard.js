import React from 'react';
import './AdminRecipeCard.css';

const AdminRecipeCard = ({ recipe, onDelete, onViewDetails }) => {
    return (
        <div className="admin-recipe-card">
            <img src={recipe.image_url} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            
            <div className="admin-card-buttons">
                <button onClick={() => onViewDetails(recipe.id)}>View Details</button>
                <button onClick={() => onDelete(recipe.id)}>Delete</button>
            </div>
        </div>
    );
};

export default AdminRecipeCard;
