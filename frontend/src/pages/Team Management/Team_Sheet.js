import React from 'react'
import "./Team_Sheet.css"
import axios from 'axios';
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Team_Sheet() {

  const [listofProfiles, setListofProfiles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/account/random").then((response) => {
      setListofProfiles(response.data);
    });
  }, []);

  let navigate = useNavigate();

    const token = Cookies.get('access_token');
    const datatoken = JSON.parse(token)
    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <header className="header">
                        <Link to="/team_dashboard">
                            <button className='header_button' ><span className="text">Dashboard</span></button>
                        </Link>
                        <Link to={`/player_database/${datatoken.sport}`}>
                            <button className='header_button' ><span className="text">Player Database</span></button>
                            </Link>
                        <Link to="/team_sheet">
                            <button className='header_button'><span className="text">Team Sheet</span></button>
                        </Link>

                    </header>
                </Grid>
            </Grid>

      <div className='team-table'>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

        <button className='team_button'> Make new team sheet </button>
      </div>
      {listofProfiles.map((profile) => {
        return (
          <div className='profile'>
            <div className='name'>{profile.name} </div>
            <div className='age'>{profile.age} </div>

          </div>


          // <tr>
          //     <td> {profile.name} </td>
          //     <td> {profile.age} </td>
          // </tr>
        )
      })}

    </div>
  )
}

export default Team_Sheet