'use client'
import style from '@/styles/action.btn.module.css';
import Link from 'next/link';
import { addDate } from '@/utils/date';

function ActionBtn() {
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