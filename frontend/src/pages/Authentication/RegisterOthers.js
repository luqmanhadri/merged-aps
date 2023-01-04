import React, { useState, useContext, useEffect }from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {
    Avatar
  } from '@mui/material';

function RegisterOthers() {
    const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imgPerc, setImgPerc] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState("");
  const [sport, setSport] = useState("");
  const [contact, setContact] = useState("");
  // const [image, setImage] = useState(null);
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
//   const [imgUrl, setImageUrl] = useState(currentUser.imgURL);

const [selectedRole, setSelectedRole] = useState('Manager');

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/account", 
      { username, password, role : selectedRole });
      
      navigate("/home")
    } catch (err) {
      console.log("Unable to register")
    }
  };

  return (
    <div>
        <div className="form-container">
        <form className='loginForm'
        //</div>action="#"
        >
          <label>
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              // onChange={handleImage}
              onChange={(event) => setImage(event.target.files[0])}

            />
            <Avatar
            //   src={currentUser.imgURL}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>

          <h3>Name : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your full name..."
            
            onChange={(event) => setName(event.target.value)}
          />

          <h3>Age : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your age..."
            
            onChange={(event) => setAge(event.target.value)}
          />

          <h3>Birthday : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your birthday..."
            
            onChange={(event) => setBirthday(event.target.value)}
          />

          <h3>Height : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your height..."
            
            onChange={(event) => setHeight(event.target.value)}
          />

          <h3>Weight : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your weight..."
           
            onChange={(event) => setWeight(event.target.value)}
          />

          <h3>Sport : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your sport..."
            
            onChange={(event) => setSport(event.target.value)}
          />

          <h3>Contact : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your contact..."
            
            onChange={(event) => setContact(event.target.value)}
          />

           <label htmlFor="select_role">Select a role:</label>
        <select className='auth_role' id="select_role" value={selectedRole} onChange={handleChange}>
          <option value="Manager">Manager</option>
          <option value="Coach">Coach</option>
          <option value="Storekeeper">Storekeeper</option>
        </select>

          <button className='btn btn-primary' onClick={handleSubmit}>Sign Up</button>
          {/* {error && <span>{error.message}</span>} */}
        </form>
      </div>
    </div>
  )
}

export default RegisterOthers