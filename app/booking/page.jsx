'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PickRoom from '@/components/pickRoom';

function BookingPage() {
  const searchParams = useSearchParams();
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const roomtype = searchParams.get('type');
  const [placeHolder, setPlaceHolder] = useState("Loading rooms...");
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    //fetch rooms
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/available`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({from: checkin, to:checkout, type: roomtype})
    })
    .then(res => {
      if (res.status === 200) return res.json();
      else throw new Error("Failed to fetch rooms");
    })
    .then(data => setRooms(data.rooms))
    .catch(err => {
      setPlaceHolder("No Rooms Found!")
    });
  }, []); 
  return (
    <div style={{width: '80%', margin: '0 auto', marginTop: '40px'}}>
      <PickRoom 
        setRooms={setRooms}
        rooms={rooms}
        checkin={checkin} 
        checkout={checkout} 
        roomtype={roomtype}
        placeHolder={placeHolder}
        setPlaceHolder={setPlaceHolder}/>
    </div>
  )
}

function page(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage />
    </Suspense>
  )
}

export default page