import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

function Profilepage() {
    let {id} = useParams();
    const [profileDetails, setProfileDetails] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/byId/${id}`).then((response) => {
            setProfileDetails(response.data);
          });
    }, []);

  return (
    <div classname="name">{profileDetails.name}
    <div classname="age">{profileDetails.age}</div>
    <div classname="sport">{profileDetails.sport}</div>
    <div classname="birthday">{profileDetails.birthday}</div>
    <div classname="height">{profileDetails.height}</div>
    <div classname="contact">{profileDetails.contact}</div>
    </div>
  )
}

export default Profilepage