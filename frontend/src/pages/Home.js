import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {

const [listofProfiles, setListofProfiles] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/profile").then((response) => {
      setListofProfiles(response.data);
    });
  }, []);

  return (
    <div>
        {listofProfiles.map((value, key) => {
        return (
          <div className='profile' onClick={() => navigate(`/profile/${value.id}`)}> 
          <div className='name'> {value.name} </div>
          <div className='age'> {value.age} </div>
          <div className='sport'> {value.sport} </div>
          
          </div>
  
        )
        
        })}
        </div>
  )
}

export default Home