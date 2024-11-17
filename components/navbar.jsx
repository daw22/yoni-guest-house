import style from '@/styles/navbar.module.css'
import BookBtn from './bookbtn'

function Navbar() {
  return (
    <div className={style.container}>
      <h1 className={style.logo}>Yoni</h1>
      <ul className={style.nav}>
        <li><a href='#rooms'>Rooms</a></li>
        <li><a href='#address'>Address</a></li>
        <li><a href='#gallery'>Gallery</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
      <BookBtn /> 
    </div>
  )
}

export default Navbar