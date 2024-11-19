'use client';
import styles from '@/styles/room.page.module.css';
import { FaTimes, FaWifi, FaShower, FaTv, FaSuitcaseRolling} from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getBlurData } from '@/utils/blurGenerator';


function RoomDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [room, setRoom] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const getRoomData = async () => {
    const roomData = searchParams.get('roomData');
    if (!roomData) {
      return;
    }
    try {
      const parsedRoom = JSON.parse(decodeURIComponent(roomData));
      setRoom(parsedRoom);
    } catch (error) {
      console.error('Error parsing room data:', error);
    }
  }

  useEffect(() => {
    getRoomData();
  }, []);

  useEffect(() => {
    const loadBlurData = async () => {
      if (room?.images[imageIndex]) {
        getBlurData(room.images[imageIndex])
          .then(blur => setBlurDataURL(blur))
          .catch(err => console.error('Error getting blur data:', err));
      }
    }
    loadBlurData();
  }, [imageIndex, room]);

  const handleClose = () => {
    router.back();
  }
  
  return (
    room && (
      showImage ? (
        <div className={styles.imageContainer}>
          <div className={styles.closeButton} onClick={() => setShowImage(false)}>
            <FaTimes/>
          </div>
          {room.images[imageIndex] && 
            <Image
            src={room.images[imageIndex]} 
            alt={`Room picture`}
            fill
            placeholder='blur'
            blurDataURL={blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRg=='}
            />
          }
        </div>
      ) : (
      <div className={styles.container}>
        <div className={styles.close_btn} onClick={handleClose}>
          <FaTimes color='red'/>
        </div>
        <h1>Room {room.room_number}</h1>
        <p className={styles.type}>{room.type} Bed</p>
        <p className={styles.price}>{room.price_per_night} Birr Per Night</p>
        <p className={styles.description}>{room.discription}</p>
        <h4>Amenities</h4>
        <div className={styles.amenities}>
          {room.aminities.map((amenity, index) => (
            <div key={index} className={styles.amenity}>
              {amenity === 'Free Wifi' && (<div className={styles.amenity_icon}><FaWifi /><span>Wifi</span></div>)}
              {amenity === 'Hot Shower' && (<div className={styles.amenity_icon}><FaShower /><span>Shower</span></div>)}
              {amenity === 'TV' && (<div className={styles.amenity_icon}><FaTv /><span>Dstv</span></div>)}
              {amenity === 'Closet' && (<div className={styles.amenity_icon}><FaSuitcaseRolling /><span>Closet</span></div>)}
            </div>
          ))}
        </div>
        <div className={styles.thumbnailsContainer}>
          {room.images.map((image, index) => (
            <Image 
            key={index} 
            src={image} 
            alt={`Room ${room.room_number}`} 
            width={100} 
            height={50}
            onClick={() => {
              setShowImage(true);
              setImageIndex(index);
            }}
            />
          ))}
        </div>
      </div>
      )
    )
  )
}

export default RoomDetail;