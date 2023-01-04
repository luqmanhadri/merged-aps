import React from 'react'
import './Admin.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Admin() {

  let navigate = useNavigate();
  const [listofProfiles, setListofProfiles] = useState([]);
  const [approval, setApproval] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/account/coach").then((response) => {
      setListofProfiles(response.data);
    });
  }, []);

  const patchProfile = async(id,data) => {
    try {
      const res = await axios.patch(`http://localhost:3001/account/${id}`, data);
      return res.data
    } catch (err) {
      console.log("Failed to accept")
    }
  }

  const deleteProfile = async(id,data) => {
    try {
      const res = await axios.delete(`http://localhost:3001/account/${id}`, data);
      return res.data
    } catch (err) {
      console.log("Failed to delete")
    }
  }

  return (
    <div>
    <div className='admin_buttons'>
      <button className='btn btn-primary'>Coaches</button>
      <button className='btn btn-primary'>Managers</button>
      <button className='btn btn-primary'>Storekeepers</button>
    </div>

    <div>
    {listofProfiles.map((value, key) => {
        return (
          <Grid item xs={12} sm={4} key={key}>
          <div className='profile_card_container'>
          <div className='profile' key={key} 
          // onClick={() => navigate(`/profile/${value._id}`)}
          >
            <div className='name'> {value.name} </div>
            <div className='age'> {value.age} </div>
            <div className='sport'> {value.sport} </div>
            <button className='btn btn-primary' 
            onClick={() => patchProfile(value._id, { approved: true })}
            >Approve</button>
            <button className='btn btn-primary'
            onClick={() => deleteProfile(value._id, { approved: false })}
            >Reject</button>

          </div>
          </div>
          </Grid>
        )

      })}

    </div>
    </div>
  )
}

export default Admin