import React from 'react'
import {useState} from 'react';
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'

function Inventory() {

  const [openDate, setOpenDate] = useState(false)

    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
  ]);

    const [item, setItem] = useState("");
    const [amount, setAmount] = useState(0);

  return (
    <div className='Inventory'>
      <div className = 'HeaderSearchItem'>
      <span onClick={() => setOpenDate(!openDate)} className = "headerSearchText">{`${format(date[0].startDate,"dd/MM/yyyy")} to ${format(date[0].endDate,"dd/MM/yyyy")}`} </span>
      {openDate && <DateRange
        editableDateInputs={true}
        onChange={item => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        className = "date"
        />}
      </div>
      
        <div className='NewItemInformation'>
            <label>Item :</label>
            <input type={'text'} onChange = {(event) => {setItem(event.target.value)} }/>
            <label>Amount :</label>
            <input type={'text'} onChange = {(event) => {setAmount(event.target.value)} }/>
        </div>
        </div>
  )
}

export default Inventory