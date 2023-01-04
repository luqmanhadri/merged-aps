import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Search_Profile.css'
import useFetch from '../../hooks/useFetch';
import { Grid } from '@mui/material';

function Search_Profile() {

  const [listofProfiles, setListofProfiles] = useState([]);
  // const [name, setName] = useState("");
  // const [sport, setSport] = useState("");
  const [q, setQ] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/account/random").then((response) => {
      setListofProfiles(response.data);
    });
  }, []);

  // const [fetchProfiles, setfetchProfiles] = useState([]);

  return (
    <div>
      <div className='Athlete_Search_Bar'>
        {/* <label>Name :</label> */}
        <input
          className='profile_searchbar'
          placeholder='Enter athlete name or sport...'
          type={'text'}
          onChange={(e) => setQ(e.target.value)}
          />
          

        {/* <input
          className='profile_searchbar'
          placeholder='Enter sport...'
          type={'text'}></input> */}

          <button className='btn btn-primary' onClick={()=>navigate(`/search?q=${q}`)}>Search Profile</button>
      </div>

      <Grid container spacing={3}>
      {listofProfiles.map((value, key) => {
        return (
          <Grid item xs={12} sm={4} key={key}>
          <div className='profile_card_container'>
          <div className='profile' key={key} onClick={() => navigate(`/profile/${value._id}`)}>
            <div className='name'> {value.name} </div>
            <div className='age'> {value.age} </div>
            <div className='sport'> {value.sport} </div>


          </div>
          </div>
          </Grid>
        )

      })}
      </Grid>
    </div>
  )
}

export default Search_Profile