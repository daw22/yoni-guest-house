'use client';

import RoomSearch from './roomSearch';
import { useState } from 'react';
import styles from '@/styles/pick.room.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function PickRoom({ setRooms, rooms, checkin, checkout, roomtype, placeHolder, setPlaceHolder }) {
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [from, setFrom] = useState(checkin);
  const [to, setTo] = useState(checkout);

  const roomsTotalPrice = () => {
    let total = 0;
    const numberOfDays = (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24);
    for (let i = 0; i < selectedRooms.length; i++) {
      total += parseInt(selectedRooms[i].price_per_night) * numberOfDays;
    }
    return total;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pick Your Room/s</h2>
      <div className={styles.searchContainer}>
        <RoomSearch 
          setRooms={setRooms} 
          checkIn={checkin} 
          checkOut={checkout} 
          roomType={roomtype} 
          inForm={true} 
          setPlaceHolder={setPlaceHolder}
          setFrom={setFrom}
          setTo={setTo}
          setSelectedRooms={setSelectedRooms}
        />
      </div>
      <div className={styles.roomsListContainer}>
        {rooms && rooms.map((room) => (
        <div className={styles.roomCard} key={room.room_number}>
          <input 
          type="checkbox"
          checked={selectedRooms.some(selectedRoom => selectedRoom.room_number === room.room_number)}
          onChange={(e) => {
            if(e.target.checked){
              setSelectedRooms(prev => [...prev, room]);
            } else {
              setSelectedRooms(prev => prev.filter(room => room.room_number !== room.room_number));
            }
          }}
          />
          <Image src={room.images[0]} alt="Room 1" width={100} height={100} />
          <h3>R.N {room.room_number}</h3>
          <p>Price: {room.price_per_night} per night</p>
          <button 
          className={styles.roomDetailsButton}
          onClick={() => {
            const encodedRoomData = encodeURIComponent(JSON.stringify(room));
              router.push(`/booking/room-detail/${room.room_number}?roomData=${encodedRoomData}`);
          }}
          >Room Details</button>
          </div>
        ))}
      </div>
      {rooms && rooms.length === 0 && <p className={styles.noRooms}>{placeHolder}</p>}
      <button 
      className={styles.checkoutButton} 
      disabled={selectedRooms.length === 0}
      onClick={() => {
        const roomsString = selectedRooms.map(room => room.room_number).join(',');
        router.push(`/booking/checkout?rooms=${roomsString}&from=${from}&to=${to}&totalPrice=${roomsTotalPrice()}`);
      }}
      >
        Check out
      </button>
    </div>
  )
}

export default PickRoom;