import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Upload from './Upload';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import './Spesific_Profile.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Card from '../Videos/Card';
import Add_Achievement from './Add_Achievement';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';

function Spesific_Profile() {

  const [profileDetails, setProfileDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAchievement, setOpenAchievement] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const path = useLocation().pathname.split("/")[2];
  const token = Cookies.get('access_token');

  if (token) {
    const data = JSON.parse(token);
    // console.log(data);
  } else {
    console.log("Failed")
  }

  const datatoken = JSON.parse(token)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://localhost:3001/account/find/${path}`);
        // const profileRes = await axios.get(`/profile/${accountRes.data._id}`);
        const videoRes = await axios.get(`http://localhost:3001/videos/${path}`);

        // const channelRes = await axios.get(
        //   `/users/find/${videoRes.data.userId}`
        // );
        setProfileDetails(accountRes.data);
        setAchievements(accountRes.data.achievement)
        setVideos(videoRes.data);
        // dispatch(loginSuccess(accountRes.data));
      } catch (err) { }
    };
    fetchData();
  }, []);


  const deleteAchievement = async (achievementId) => {
    await axios.delete(`http://localhost:3001/account/achievement/${path}/${achievementId}`)
  }

  
  // }, []);

  // const addComment = () => {
  //     axios.post("http://localhost:3001/comment",
  //         {commentBody: newComment, ProfileId: id },

  //       )
  //       .then((response) => {
  //         if (response.data.error) {
  //           console.log(response.data.error);
  //         } else {
  //           const commentToAdd = {
  //             commentBody: newComment,
  //             // username: response.data.username,
  //           };
  //           setComments([...comments, commentToAdd]);
  //           setNewComment("");
  //         }
  //       });
  //   };

  return (
    <div>


      <div className="profile_container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={profileDetails.imgUrl} alt="Admin" className="rounded-circle p-1 bg-primary" width="140" height="140" />
                    <div className="mt-3">
                      <h4>{profileDetails.name}</h4>
                      <p className="text-secondary mb-1">{profileDetails.sport} player</p>
                      <p className="text-muted font-size-sm">Faculty of Computer Science</p>
                      {datatoken._id === path ? (
                        <button className='btn btn-primary update_button' onClick={() => navigate("/update_profile")}> Edit Profile </button>
                      ) : (
                        <div></div>
                      )}

                      {/* <button className="btn btn-outline-primary">Message</button> */}
                    </div>
                  </div>
                  <hr className="my-4" />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Name</h5>
                      <h6 className="text-secondary">{profileDetails.name}</h6>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Role</h5>
                      <h6 className="text-secondary">{profileDetails.role}</h6>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Age</h5>
                      <h6 className="text-secondary">{profileDetails.age}</h6>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Height</h5>
                      <h6 className="text-secondary">{profileDetails.height}</h6>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Weight</h5>
                      <h6 className="text-secondary">{profileDetails.weight}</h6>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">Contact</h5>
                      <h6 className="text-secondary">{profileDetails.contact}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <p>Achievements</p>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h5 className="mb-0"></h5>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      {achievements.map((achievement) => {
                        return (
                          <li key={achievement._id}>
                            {achievement.year}: {achievement.achievement}
                            
                            <IconButton><EditIcon/></IconButton>
                            <IconButton onClick={() => deleteAchievement(achievement._id)}><DeleteIcon/></IconButton>
                          </li>

                        );
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">

                    </div>
                  </div>

                  {datatoken._id === path ? (
                    <button className='btn btn-primary update_button' onClick={() => setOpenAchievement(true)}> Add Achievements </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <p>Player Ratings</p>

                      <div className="listOfComments">
                        {comments.map((comment, key) => {
                          return (
                            <div key={key} className="comment">
                              {comment.commentBody}
                              <label> By: {comment.username}</label>

                            </div>
                          );
                        })}
                      </div>

                      <div className="addCommentContainer">
                        <input type="text" placeholder="Comment..." autoComplete="off" value={newComment}
                          onChange={(event) => {
                            setNewComment(event.target.value);
                          }}
                        />

                      </div>
                      {currentUser ? (
                        <button className='btn btn-primary upload_button mt-2'
                        // onClick={() => setOpen(true)}
                        > Upload Comment </button>
                      ) : (
                        <div></div>
                      )}


                      {/* {open && <Upload setOpen={setOpen} />} */}

                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <p>Player Videos</p>
                      {videos.map((video) => (
                        <Card key={video._id} video={video} />
                      ))}
                      {datatoken._id === path ? (
                        <button className='btn btn-primary upload_button' onClick={() => setOpen(true)}> Upload </button>
                      ) : (
                        <div></div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






      {open && <Upload setOpen={setOpen} />}
      {openAchievement && <Add_Achievement setOpenAchievement={setOpenAchievement} />}

      {/* <div className='Container'>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </div> */}


    </div>
  )
}

export default Spesific_Profile