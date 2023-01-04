import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Landing.css';
import {Container} from "react-bootstrap"
import Slider from './Slider';
import Search_Profile from '../Profile/Search_Profile';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { userRequest } from '../../requestMethod';
import { publicRequest } from '../../requestMethod';


function Landing() {
  
    let navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);

    const [listofProfiles, setListofProfiles] = useState([]);

    // useEffect( () => {
    //     axios.get("http://localhost:3001/announcement").then((response) => {
    //         setAnnouncements(response.data);
    //       });

    //       axios.get("http://localhost:3001/account/random").then((response) => {
    //         setListofProfiles(response.data);
    // });
    // }, []);

    useEffect(() => {
      const getAnnouncement = async () => {
        try {
          const res = await publicRequest.get("/announcement");
          setAnnouncements(res.data);
        } catch {}
      };
      getAnnouncement();
    }, []);

  return (
    <div>

      <Slider/>
      
      <div>
      
        {listofProfiles.map((value, key) => {
        return (
          <div className='profile' key = {key} onClick={() => navigate(`/profile/${value._id}`)}> 
          <div className='name'> {value.name} </div>
          <div className='age'> {value.age} </div>
          <div className='sport'> {value.sport} </div>
          </div>
        )
        })}
        </div>

      <h1 className='announcement_title'> Latest Announcements </h1>
      {/* <div classname="name">{announcements.announcementBody}
      </div> */}

      <div>
      
        {announcements.map((value, key) => {
        return (
          
          <div className = 'announcement' key = {key}>
          <div className='name' > {value.announcementBody} </div>
          </div>
  
        )
        
        })}
        </div>

        </div>
        
  )
}

export default Landing