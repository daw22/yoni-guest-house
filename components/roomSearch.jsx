'use client'
import style from '@/styles/search.module.css';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

function RoomSearch({ setRooms, checkIn, checkOut, roomType, inForm, setPlaceHolder, setFrom, setTo, setSelectedRooms}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState(checkIn);
  const [checkout, setCheckout] = useState(checkOut);
  const [roomtype, setRoomtype] = useState(roomType);
  const checkoutRef = useRef(null);

  const addDate = (date, wh) => {
    if(!date.getTime()){
      return new Date(new Date().getTime() + wh * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    return new Date(date.getTime() + wh * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }

  const onSearchClicked = () => {
    if (inForm) {
      //make api requset and fetch rooms and set rooms
      setPlaceHolder("Loading available rooms...");
      setRooms([]);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({from: checkin, to: checkout, type: roomtype})
      })
      .then(res => res.json())
      .then(data => {
        if (data.rooms.length === 0){
          setPlaceHolder("No Rooms Found");
        }
        setRooms(data.rooms);
        // setFrom(checkin);
        // setTo(checkout);
        // console.log('rooms data', data.rooms);
      })
      .catch(err => {
        setPlaceHolder("No Rooms Found");
      });
    } else {
      //just navigate to booking page
      router.push(`/booking?checkin=${checkin}&checkout=${checkout}&type=${roomtype}`);
    }
  };
  
  useEffect(() => {
    if(inForm){
      onSearchClicked();
    }
  }, [checkin, checkout, roomtype]);

  return (
    <div className={style.container}>
      <div className={style.inputsContainer}>
      <div className={style.section}>
        <span>Check in</span>
        <input 
        type='date'
        min={addDate(new Date(), 0)} 
        max={addDate(new Date(), 30)}
        defaultValue={checkin || addDate(new Date(checkin), 0)}
        onInput={(e)=>{
          if(e.target.value === ""){
            console.log("invalid date");
            e.target.value = addDate(new Date(), 0);
            e.preventDefault();
            return;
          }
        }}
        onChange={(e) => {
          setCheckin(e.target.value);
          setFrom && setFrom(e.target.value);
          checkoutRef.current.min = addDate(new Date(e.target.value), 1);
          checkoutRef.current.value = addDate(new Date(e.target.value), 1);
          checkoutRef.current.max = addDate(new Date(e.target.value), 30);
          setCheckout(addDate(new Date(e.target.value), 1));
          setTo && setTo(addDate(new Date(e.target.value), 1));
          setSelectedRooms && setSelectedRooms([]);
          }}/>
      </div>
      <div className={style.section}>
        <span>Check out</span>
        <input 
        type='date'
        min={addDate(new Date(checkin), 1)} 
        max={addDate(new Date(checkout), 30)} 
        defaultValue={checkout || addDate(new Date(checkout), 0)}
        onInput={(e)=>{
          if(e.target.value === ""){
            console.log("invalid date");
            e.target.value = addDate(new Date(checkin), 1);
            e.preventDefault();
            return;
          }
        }}
        onChange={(e) => {
          setCheckout(e.target.value);
          setTo && setTo(e.target.value);
          setSelectedRooms && setSelectedRooms([]);
        }}
        ref={checkoutRef}
        />
      </div>
      <div className={style.section}>
        <span>Room Type</span>
        <select 
        defaultValue={roomtype}
        onChange={(e) => {
          setRoomtype(e.target.value);
        }}>
          <option value="single">single bed</option>
          <option value="double">double bed</option>
        </select>
      </div>
      </div>
      <div className={style.searchBtn} onClick={onSearchClicked}>
        <FaSearch size={16} />
        <span>Search</span>
      </div>
    </div>
  )
}

export default RoomSearch;