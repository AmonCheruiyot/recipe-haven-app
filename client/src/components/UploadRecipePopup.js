import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust this path based on your project structure
import './UploadRecipePopup.css'; // Optional: Include any additional styles

const UploadRecipePopup = ({ onClose, onRecipeAdded }) => {
  const { authData } = useContext(AuthContext); // Access the authData from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    main_photo: '', // Initialize as an empty string
  });
  const [error, setError] = useState(null); // To handle errors

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file input or URL input
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Create FormData instance
    const data = new FormData();
    
    // Handle main_photo as a URL or file
    if (typeof formData.main_photo === 'string') {
      data.append('main_photo', formData.main_photo); // Append URL directly
    } else if (formData.main_photo) {
      data.append('main_photo', formData.main_photo); // Append file
    } else {
      setError('Main photo is required.');
      return;
    }

    // Append other fields
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('ingredients', formData.ingredients);
    data.append('instructions', formData.instructions);

    try {
      const token = authData.token; // Get the token from authData
      const response = await axios.post('https://recipe-app-0i3m.onrender.com/recipes', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from authData. Do NOT set Content-Type.
        },
      });

      // Check for successful response
      if (response.status === 200 || response.status === 201) {
        alert('Recipe uploaded successfully');
        onRecipeAdded(); // Notify parent about the new recipe
        setFormData({
          name: '',
          description: '',
          ingredients: '',
          instructions: '',
          main_photo: '',
        }); // Clear form
        onClose(); // Close the popup
      } else {
        setError('Failed to upload recipe. Please try again.');
      }
    } catch (error) {
      console.error("Error uploading recipe:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to upload recipe. Please try again.");
    }
  };

  return (
    <div className="upload-recipe-popup">
      <button onClick={onClose}>Close</button>
      <h2>Upload New Recipe</h2>
      {error && <p className="error">{error}</p>} {/* Show error message if exists */}
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="main_photo"
          placeholder="Photo URL (or select a file)"
          value={typeof formData.main_photo === 'string' ? formData.main_photo : ''}
          onChange={handleChange}
        />
        <input
          type="file"
          name="main_photo"
          accept="image/*"
          onChange={handleChange}
        />
        
        <button type="submit">Upload Recipe</button>
      </form>
    </div>
  );
};

export default UploadRecipePopup;
