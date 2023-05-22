import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../static/form.css';
const UserForm = () => {
  const navigate= useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setphone_number] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
     if (!name || !dob || !email || !phone_number) {
      alert('Please fill in all the fields');
      navigate('/user-form')
      return;
    }
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const ageDiff = currentDate - selectedDate;
    const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));
    
    if (ageInYears < 18) {
      alert('You must be at least 18 years old');
      navigate('/user-form')
      return;
    }

    const userdata = {
      name,
      dob,
      email,
      phone_number
    };
  
    try {
      // POST request to the Django backend API
      const resp = await axios.post('https://ravi777345.pythonanywhere.com/api/user-form/', userdata);
      console.log(resp.data);

      window.alert('Success. We send you a mail for becoming a part of our precious family. ')
      navigate('/submitted-form')


    } catch (error) {
      console.error(error);
      // Handle the error response, display error message, etc.
    }
  
    // Reset form fields
    setName('');
    setDob('');
    setEmail('');
    setphone_number('');
  };
  

  return (
    <div className="container">
      <span className="form__title">User Forms</span>
      <form className="form" onSubmit={handleSubmit}>
      <div class="form__group">
					<input type="text" placeholder="Name" required className="form__input"  value={name} onChange={(event) => setName(event.target.value)} />
					<span class="form__bar"></span>
				</div>
      <div class="form__group">
					<input type="date" placeholder="Date of Birth" required className="form__input"  value={dob} onChange={(event) => setDob(event.target.value)} />
					<span class="form__bar"></span>
				</div>
      <div class="form__group">
					<input type="text" placeholder="Email" required className="form__input" value={email} onChange={(event) => setEmail(event.target.value)} />
					<span class="form__bar"></span>
				</div>
      <div class="form__group">
					<input type="tel" placeholder="Phone" required className="form__input" value={phone_number} onChange={(event) => setphone_number(event.target.value)} />
					<span class="form__bar"></span>
				</div>
        <button type="submit" class="form__button">Sign up</button>
      </form>
    </div>
  );
};

export default UserForm;
