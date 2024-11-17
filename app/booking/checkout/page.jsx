'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styles from '@/styles/checkout.module.css';
import { Suspense, useState } from 'react';
import OrderSummary from '@/components/orderSummary';

function Checkout() {
  const searchParams = useSearchParams();
  const roomsString = searchParams.get('rooms');
  const rooms = roomsString.split(',');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const totalPrice = searchParams.get('totalPrice');
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [btnText, setBtnText] = useState('Proceed to Payment');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    setBtnText('Processing...');
    setFormData(data);
    setShowOrderSummary(true);
    //  send data to backend
    // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/book`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(bookingData),
    // }).then(res => {
    //   if (!res.ok) {
    //     console.log('Booking response:', res.status);
    //     throw new Error('Failed to book');
    //   }
    //   console.log('Booking response:', res);
    //   return res.json();
    // })
    // .then(data => {
    //   console.log('Booking successful:', data);
    //   // router.push(data.payment_url);//
    //   console.log('data.payment_url', data.payment_url);
    //   window.location.href = data.payment_url;
    // })
    // .catch(error => {
    //   console.error('Error booking:', error);
    // });
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
    {!showOrderSummary &&
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p>Full Name: should match the name on your ID</p>
      <input {...register('firstName', { required: true })} placeholder="First Name" />
      <input {...register('lastName', { required: true })} placeholder="Last Name" />
      {(errors.lastName || errors.firstName) && <p className={styles.error}>Last Name and First Name are required</p>}
      <input {...register('email', { required: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} placeholder="Email -optional-" />
      {errors.email && <p className={styles.error}>Please enter a valid email</p>}
      <p>phone number will be used to request payment for your booking</p>
      <input type="tel" {...register('phoneNumber', { required: true, pattern: /^(09|07)\d{8}$/ })} placeholder="Phone Number 09-- or 07--" />
      {errors.phoneNumber && <p className={styles.error}>Please enter a valid phone number</p>}
      <p>Special Requests</p>
      <textarea {...register('specialRequests', { required: false })} placeholder="eg: reserve a parking space for me" className={styles.textarea}/>
      <div className={styles.buttonContainer}>
        {/* <button type="button" onClick={()=>setShowOrderSummary(true)}>order summary</button> */}
        <button type="submit" >Proceed to Payment</button>
        </div>
      </form>}
      {showOrderSummary && <OrderSummary 
        checkin={from} 
        checkout={to} 
        singles={rooms.filter(room => parseInt(room) % 10 !== 1)} 
        doubles={rooms.filter(room => parseInt(room) % 10 === 1)} 
        totalPrice={totalPrice}
        setShowOrderSummary={setShowOrderSummary}
        rooms={rooms}
        formData={formData}
        />}
    </div> 
  )
}

function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Checkout />
    </Suspense>
  )
}
export default CheckoutPage;