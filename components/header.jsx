import style from '@/styles/header.module.css';
import Navbar from './navbar';
import Image from 'next/image';
import RoomSearch from './roomSearch';
import ActionBtn from './actionBtn';
import coridor from '@/public/coridor01.jpg';
import { addDate } from '@/utils/date';
function Header() {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.heroSection}>
        <div className={style.heroContent}>
          <h3>Yoni</h3>
          <h1>Guest House</h1>
          <p>Book your stay with the best guest house in Debre Brihan. Enjoy our hospitality and have a peacefull and comfortable time with us.</p>
          <div className={style.iconsContianer}>
            <div className={style.icon}>
              <Image
                src="/wifi.svg"
                alt="wfi"
                width={32}
                height={32}
                />
               <h6>wifi</h6>
            </div>
            <div className={style.icon}>
              <Image
                src="/dstv.svg"
                alt='dstv'
                width={32}
                height={32}
                />
               <h6>dstv</h6>
            </div>
            <div className={style.icon}>
              <Image
                src="/parking.svg"
                alt='parking'
                width={32}
                height={32}
                />
               <h6>parking</h6>
            </div>
            <div className={style.icon}>
              <Image
                src="/room-service.svg"
                alt='room service'
                width={32}
                height={32}
                />
               <h6>room service</h6>
            </div>
          </div>
        </div>
      </div>
      <div className={style.rightHeroPic}>
          <Image 
            src={coridor}
            alt="" 
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
        </div>
        <div className={style.roomSearchContainer}>
          <RoomSearch 
            inForm={false} 
            checkIn={addDate(new Date(), 0)} 
            checkOut={addDate(new Date(), 1)} 
            roomType='single'/>
        </div>
        <ActionBtn />
      </div>
  )
}

export default Header