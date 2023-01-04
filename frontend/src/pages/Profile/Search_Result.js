import React from 'react'
import './Search_Profile.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Search_Result() {

    const [profiles, setProfiles] = useState([]);
    const query = useLocation().search;
    let navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            const res = await axios.get(`http://localhost:3001/account/search${query}`);
            setProfiles(res.data);
        };
        fetchProfiles();
    }, [query]);

    return (
        <div>
            {profiles.map((value, key) => {
                return (
                    <div className='profile_card_container'>
                        <div className='profile' key={key} onClick={() => navigate(`/profile/${value._id}`)}>
                            <div className='profile_name'> {value.name} </div>
                            <div className='age'> {value.age} </div>
                            <div className='profile_sport'> {value.sport} </div>


                        </div>
                    </div>

                )

            })}
        </div>
    )
}

export default Search_Result