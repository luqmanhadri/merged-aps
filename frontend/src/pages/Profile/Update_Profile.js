import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { update_user, update_profile } from "../../redux/userSlice"
import app from '../../firebase/firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Cookies from 'js-cookie';

const Update_Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imgPerc, setImgPerc] = useState(0);

  const [name, setName] = useState(profileDetails.name);
  const [age, setAge] = useState(profileDetails.age);
  const [birthday, setBirthday] = useState(profileDetails.birthday);
  const [height, setHeight] = useState(profileDetails.height);
  const [sport, setSport] = useState(profileDetails.sport);
  const [contact, setContact] = useState(profileDetails.contact);
  const [weight, setWeight] = useState(profileDetails.weight);

  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(profileDetails.imgUrl);

  const path = useLocation().pathname.split("/")[2];

  const token = Cookies.get('access_token');
  if (token) {
    const data = JSON.parse(token);
    // console.log(data);
  } else {
    console.log("Failed")
  }

  let datatoken
  
  if (token && typeof token !== 'undefined') {
    datatoken = JSON.parse(token);
    // use datatoken here
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
      const accountRes = await axios.get(`http://localhost:3001/account/find/${datatoken._id}`);
      

      setProfileDetails(accountRes.data);
      
      
    } catch (err) { }
  }
  fetchData();
})

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : console.log("Something wrong");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL)

          
        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:3001/account/${currentUser._id}`,
      {
        name: name,
        age: age,
        birthday: birthday,
        height: height,
        weight: weight,
        sport: sport,
        contact: contact,

        imgUrl: imageUrl
      }
    )
    navigate(`/profile/${datatoken._id}`)
  };



  return (
    <div className="main">

      {/* <div className="container" id="container"> */}
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
              onChange={(event) => setImage(event.target.files[0])}

            />
            <Avatar
              src={profileDetails.imgUrl}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>

          <h3>Name : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your full name..."
            defaultValue={profileDetails.name}
            onChange={(event) => setName(event.target.value)}
          
          />

          <h3>Age : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your age..."
            defaultValue={profileDetails.age}
            onChange={(event) => setAge(event.target.value)}
          />

          <h3>Birthday : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your birthday..."
            defaultValue={profileDetails.birthday}
            onChange={(event) => setBirthday(event.target.value)}
          />

          <h3>Height : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your height..."
            defaultValue={profileDetails.height}
            onChange={(event) => setHeight(event.target.value)}
          />

          <h3>Weight : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your weight..."
            defaultValue={profileDetails.weight}
            onChange={(event) => setWeight(event.target.value)}
          />

          <h3>Sport : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your sport..."
            defaultValue={profileDetails.sport}
            onChange={(event) => setSport(event.target.value)}
          />

          <h3>Contact : </h3>
          <input className='auth_input'
            type="text"
            placeholder="Enter your contact..."
            defaultValue={profileDetails.contact}
            onChange={(event) => setContact(event.target.value)}
          />

          <button className='btn btn-primary' onClick={handleSubmit}>Update Profile</button>
          {/* {error && <span>{error.message}</span>} */}
        </form>
      </div>


    </div>

  )
}

export default Update_Profile