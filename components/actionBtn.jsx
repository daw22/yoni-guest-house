'use client'
import style from '@/styles/action.btn.module.css';
import Link from 'next/link';

function ActionBtn() {
  const addDate = (wh) => {
    const today = new Date();
    return new Date(today.getTime() + wh * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }
  const today = addDate(0);
  const tomorrow = addDate(1);
  const url = `/booking?checkin=${today}&checkout=${tomorrow}&type=single`;
  return (
    <Link href={url}>
      <button className={style.button}>Book Now</button>
    </Link>
  )
}

export default ActionBtn;