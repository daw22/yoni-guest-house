import style from '@/styles/rooms-section.module.css';
import Image from 'next/image';
import Link from 'next/link';
import single from '@/public/single01.jpg';
import double from '@/public/double01.jpg';

function Rooms() {
  const today = new Date(new Date().getTime() + 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];;
  const tomorrow = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];;
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
          <Link href={`/booking?checkin=${today}&checkout=${tomorrow}&type=single`}>
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
          <Link href={`/booking?checkin=${today}&checkout=${tomorrow}&type=double`}>
            <button className={style.bookBtn}>Book</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Rooms;