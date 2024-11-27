'use client'
import style from '@/styles/rooms-section.module.css';
import Image from 'next/image';
import Link from 'next/link';
import single from '@/public/single01.jpg';
import double from '@/public/double01.jpg';

function Rooms() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format dates for the input
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <section className={style.container} id='rooms'>
      <h3 className='section-title'>Our rooms</h3>
      <div className={style.cardsContainer}>
        <div className={style.card}>
            <Image
              src={single}
              alt="single bed rooms"
              className={style.cardImg}
            />
          <h3>Single bed rooms</h3>
          <p>Starting from 500 birr</p>
          <Link href={`/booking?checkin=${formatDate(today)}&checkout=${formatDate(tomorrow)}&type=single`}>
            <button className={style.bookBtn}>Book</button>
          </Link>
        </div>
        <div className={style.card}>
            <Image
              src={double}
              alt="double bed rooms"
              className={style.cardImg}
            />
          <h3>Double bed rooms</h3>
          <p>Starting from 800 birr</p>
          <Link href={`/booking?checkin=${formatDate(today)}&checkout=${formatDate(tomorrow)}&type=double`}>
            <button className={style.bookBtn}>Book</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Rooms;