import React, { useEffect } from 'react'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import {
  faBed,
  faCalendarDays,
  faLocation,
  faPerson,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './Booking.css';
import Item from './Item';
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { new_search } from '../../redux/bookingSlice';
import { useLocation } from "react-router-dom";

function List() {

  const location = useLocation();
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);
  const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState();
  // const [error, setError] = useState();

  const [openDate, setOpenDate] = useState(false)

  const [dates, setDate] = useState(location.state.dates);

  const [openQuantity, setOpenQuantity] = useState(false);
  const [quantity, setQuantity] = useState(location.state.quantity);
  const [store, setStore] = useState("");

  const [item, setItem] = useState(location.state.item);
  //   const [amount, setAmount] = useState(0);
  //   const [cost, setCost] = useState(0);

  const handleQuantity = (operation) => {
    setQuantity(() => {
      return (
        operation === "i" ? quantity + 1 : quantity - 1
      );
    });
  };

  const { data, loading, error, reFetch } = useFetch(
    `/inventory/search?item=${item}`
  );

  const handleClick = () => {
    reFetch();
  };

  //   const handleSearch = () => {
  //     // dispatch({ type: "new_search", payload: { items, dates, store, quantity } });
  //     dispatch(new_search({payload: {items, dates, store, quantity}}));
  //     // navigate("/inventory", { state: { items, dates, store, quantity } });
  //   };

  //   useEffect(() => {

  //     try {
  //       setLoading(true)
  //       axios.get("http://localhost:3001/inventory").then((response) => {
  //         setItems(response.data);
  //       });
  //       setLoading(false)
  //     }
  //     catch (error) {
  //       setError(true)
  //       console.log(error)
  //       setLoading(false)
  //     }
  //   }, [])

  return (
    <div className='Inventory'>

      <div className='SearchItemBar'>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input
            type="text"
            placeholder="What are you searching?"
            className="headerSearchInput"
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className='headerSearchItem'>
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`} </span>
          {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
          />}
        </div>

        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faLocation} className="headerIcon" />
          <input
            type="text"
            placeholder="Where are you booking?"
            className="headerSearchInput"
            onChange={(e) => setStore(e.target.value)}
          />
        </div>

        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span
            onClick={() => setOpenQuantity(!openQuantity)}
            className="headerSearchText"
          >{`Quantity : ${quantity} `}</span>
          {openQuantity && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={quantity <= 1}
                    className="optionCounterButton"
                    onClick={() => handleQuantity("d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {quantity}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleQuantity("i")}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        <button className='btn btn-primary' onClick={handleClick}> Search </button>

      </div>

      <div className='row justify-content-center'>

        {loading ? (<h1>Loading...</h1>)
          : error ? (<h1>Error</h1>)
            : (data.map((item,key) => {
              return <div className='col-md-7 mt-2' key={key}>
                <div className='row bs'  >
                  <div className='col-md-8' >
                    <h2>{item.item_name}</h2>
                    <h5>Store : {item.store}</h5>
                    <span>Quantity available : {item.item_amount}</span>

                    <div className="optionCounter" >
                      <button
                        disabled={quantity <= 0}
                        className="optionCounterButton"
                        onClick={() => handleQuantity("d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {quantity}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleQuantity("i")}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ float: 'right' }}>
                      <button className='btn btn-primary'>Add to booking list</button>
                    </div>

                  </div>
                </div>
              </div>
            }))}

      </div>


    </div>
  )
}

export default List