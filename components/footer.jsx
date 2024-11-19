import style from '@/styles/footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={style.container}>
        <div className={style.left} id='contact'>
          <h3>Contacts</h3>
	        <div>
	          <img src='/phone.svg' alt='phone icon' />
	  				<span>+251 913487932</span>
					</div>
					<div>
	  				<img src='/phone.svg' alt='phone icon' />
	  				<span>+251 911728635</span>
					</div>
					<div className={style.socialMediaIconsContainer}>
	  				<a href="">
							<img className={style.socialMediaIcon} src='/telegram.svg' alt='telegram' />	
	  				</a>
	  				<a href="">
							<img className={style.socialMediaIcon} src='/facebook.svg' alt='facebook' />
	  				</a>
	  				<a href="">
							<img className={style.socialMediaIcon} src='/twitterx.svg' alt='x' />
	  				</a>
	  				<a href="">
							<img className={style.socialMediaIcon} src='/insta.svg' alt='instagram' />
	  				</a>
					</div>
  				
    	</div>
			<div >
					<p>Ethiopia, Debre Brihan</p>
      		<p>copyright @2024</p> 
      </div>
		</div>
  </footer>
  )
}

export default Footer;