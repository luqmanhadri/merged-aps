import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
// import Upload from './Upload';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { loginSuccess } from '../../redux/userSlice';
import './Home.css'
import { useNavigate } from "react-router-dom";
// import { useValue } from '../../context/ContextProvider';
// import useCheckToken from '../../hooks/useCheckToken';
import { Grid } from '@mui/material';
import { async } from '@firebase/util';
import { setLogLevel } from 'firebase/app';
import Cookies from 'js-cookie';


function Home() {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({});
  const [announcementDetails, setAnnouncementDetails] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [announcement, setAnnouncement] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [message, setMessage] = useState("");

  const token = Cookies.get('access_token');

  if (token) {
    const data = JSON.parse(token);
    console.log(data);
  } else {
    console.log("Failed")
  }

  useEffect(() => {
    // axios.get(`http://localhost:3001/account/${id}`).then((response) => {
    //       setProfileDetails(response.data);
    //     });

    axios.post("http://localhost:3001/announcement").then((response) => {
      setAnnouncementDetails(response.data);
    });

  }, []);

  // if(token) {
  //   console.log(token)
  // } else {
  //   console.log("No token")
  // }


  const addAnnouncement = async () => {
    await axios.post("http://localhost:3001/announcement",
      {
        announcementBody: newAnnouncement
        // , ProfileId: _id
      }
      , { withCredentials: true }

    )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const announcementToAdd = {
            announcementBody: newAnnouncement,
            // username: response.data.username,
          };
          setAnnouncement([...announcement, announcementToAdd]);
          setNewAnnouncement("");
        }
      });
  };


  return (
    <div>

      <Grid container justify="center" alignItems="center" marginTop={15}>
        <Grid item xs={12} xl={6} sm={6} >
          <div className="card">
            <div className="card-header">
              <img src={currentUser.imgUrl} alt="Profile Image" className="profile-img" />
            </div>
            <div className="card-body">
              <p className="name" onClick={() => navigate(`/profile/${currentUser._id}`)}>{currentUser.username}</p>

              <p className="job">{currentUser.name}</p>
              <p className="job">{currentUser.sport}</p>
              <p className="job">{currentUser.age}</p>
              <p className="job">{currentUser.height}</p>
              <p className="job">{currentUser.contact}</p>
              <p className="job">{currentUser.birthday}</p>
            </div>



          </div>
        </Grid>

        <Grid item xs={12} xl={6} sm={6}>
          <div className="card">
            <div className="card-header">
              <h1>Bookings</h1>
            </div>
            <div className="card-body">
              <p className="name" >No Bookings As Of Now</p>

            </div>


          </div>
        </Grid>

        <Grid item xs={12} xl={6} sm={6}>
          <div className="card">
            <div className="card-header">
              <h1>Wellness Record</h1>
            </div>
            <div className="card-body">
              <p className="name" >Your Wellness Status is </p>

            </div>


          </div>
        </Grid>

        <Grid item xs={12} xl={6} sm={6}>
          <div className="card">
            <div className="card-header">
              <h1>Fitness Record</h1>
            </div>
            <div className="card-body">
              <p className="name" >Your Recent Fitness Record :  </p>

            </div>


          </div>
        </Grid>


      </Grid>
    </div>
  )
}

export default Home