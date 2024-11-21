'use client';
import style from '@/styles/order.summary.module.css';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

function OrderSummary({checkin, checkout, singles, doubles, totalPrice, setShowOrderSummary, formData, rooms}) {

  const [disableBtn, setDisableBtn] = useState(false);

  const handleConfirm = () => {
    setDisableBtn(true);
    const bookingData = {
      ...formData,
      rooms: rooms,
      from: checkin,
      to: checkout,
    }
    // send data to backend
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    }).then(res => {
      if (!res.ok) {
        console.log('Booking response:', res.status);
        throw new Error('Failed to book');
      }
      return res.json();
    })
    .then(data => {
      // console.log('data.payment_url', data.payment_url);
      window.location.href = data.payment_url;
    })
    .catch(error => {
      alert("Failed to book, Try again later");
      setDisableBtn(false);
    });
  }
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.closeButton} onClick={() => setShowOrderSummary(false)}>
          <FaTimes />
        </div>
        <h3>Order Summary</h3>
        <div className={style.orderDetails}>
          <p>Check-in Date: {new Date(checkin).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}, after 10:30 am EAT</p>
          <p>Check-out Date: {new Date(checkout).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} before10am EAT</p>
          <br />
          <p>Single bed rooms: {singles.length}</p>
          <p>Double bed rooms: {doubles.length}</p>
          <br />
          <p className={style.total}>Total Price: {totalPrice}</p>
        </div>
        <div className={style.rules}>
          <h4>Our Terms</h4>
          <ul className={style.rulesList}>
            <li>Sing bed rooms can only be occupied by maximum of 2 people(couple)</li>
            <li>If you are with childern, we recommend booking a double bed room</li>
            <li>Check-in time is 10am EAT</li>
            <li>Check-out time is 10am EAT</li>
            <li>No refund for early check-out</li>
          </ul>
        </div>
        <div className={style.buttonContainer}>
          <button className={style.cancelButton} onClick={() => setShowOrderSummary(false)}>Cancel</button>
          <button className={style.confirmButton} disabled={disableBtn} onClick={handleConfirm}>Confirm and pay</button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;