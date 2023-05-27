import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../static/form.css';

const UserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !dob || !email || !phone_number) {
      setError('Please fill in all the fields');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const ageDiff = currentDate - selectedDate;
    const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

    if (ageInYears < 18) {
      setError('You must be at least 18 years old');
      
      return;
    }

    if (!validatePhoneNumber(phone_number)) {
      setError('Please enter a valid phone number (Without 0 or country code)');
      
      return;
    }

    const userdata = {
      name,
      dob,
      email,
      phone_number
    };

    try {
      const resp = await axios.post(
        'https://ravi777345.pythonanywhere.com/api/user-form/',
        userdata
      );
      console.log(resp.data);

      window.alert('Success. We sent you an email for becoming a part of our precious family.');
      navigate('/submitted-form');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Phone number already exists');
        window.alert('Phone number already exists')
        setPhoneNumber('');
        console.clear()
      } else {
        console.error(error);
        setError('An error occurred. Please try again later.');
      }
    }

    // Reset form fields and error message
    setName('');
    setDob('');
    setEmail('');
    setPhoneNumber('');
    setError('');
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for validating phone number format
    const phoneRegex = /^\+91\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  

  return (
    <div className="container">
      <span className="form__title">User Forms</span>
      {error && <div className="form__worning">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            type="text"
            placeholder="Name"
            required
            className="form__input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <span className="form__bar"></span>
        </div>
        <div className="form__group">
          <input
            type="date"
            placeholder="Date of Birth"
            required
            className="form__input"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
          <span className="form__bar"></span>
        </div>
        <div className="form__group">
          <input
            type="email"
            placeholder="Email"
            required
            className="form__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <span className="form__bar"></span>
        </div>
        <div className="form__group">
          <input
            type="tel"
            placeholder="Phone"
            required
            className="form__input"
            value={phone_number}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <span className="form__bar"></span>
        </div>
        <button type="submit" className="form__button">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default UserForm;

