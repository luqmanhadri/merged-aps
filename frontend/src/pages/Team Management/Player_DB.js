import React from 'react'
import { Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Player_DB() {

    const path = useLocation().pathname.split("/")[2];
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const players = await axios.get(`http://localhost:3001/account/sport/${path}`);
            setPlayers(players.data);
          } catch (err) {}
        };
        fetchData();
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
                              <button className='header_button'  ><span className="text">Player Database</span></button>
                              </Link>
                          <Link to="/team_sheet">
                              <button className='header_button' ><span className="text">Team Sheet</span></button>
                          </Link>
  
                      </header>
                  </Grid>
              </Grid>

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Position</th>
                        <th>Age</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>21</td>
                        <td>@mdo</td>
                    </tr>
                   
                </tbody>
            </Table> */}


<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Username</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="right">{player.position}</TableCell>
              <TableCell align="right">{player.age}</TableCell>
              <TableCell align="right">{player.username}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
        </div>
    )
}

export default Player_DB