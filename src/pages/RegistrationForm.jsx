import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'username':
        errorMessage = value.trim() === '' ? 'Username is required' : /^[a-zA-Z0-9]+$/.test(value) ? '' : 'Username should only contain alphanumeric characters';
        break;
      case 'email':
        errorMessage = value.trim() === '' ? 'Email is required' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'password':
        errorMessage = value.length < 8 ? 'Password must be at least 8 characters' : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value) ? '' : 'Password must contain at least one uppercase letter, one lowercase letter, and one special character';
        break;
      case 'country':
        errorMessage = value.trim() === '' ? 'Country is required' : '';
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    for (const key in formData) {
      validateField(key, formData[key]);
    }

    
    if (Object.values(errors).every((error) => error === '')) {
      console.log('Submitted:', formData);
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        {errors.username && <div>{errors.username}</div>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          onChange={handleChange}
          value={formData.country}
        >
          <option value="">Select Country</option>
          <option value="Us">United States</option>
          <option value="Sl">Sri Lanka</option>
          <option value="In">India</option>
          <option value="Uk">United kindom</option>
          <option value="Ca">Canada</option>
          
        </select>
        {errors.country && <div>{errors.country}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
