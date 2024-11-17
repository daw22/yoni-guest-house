import style from '@/styles/map.section.module.css';

function Map() {
  return (
    <section className={style .container} id='address'>
      <h3 className='section-title'>Where Are We?</h3>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d584.6622969250155!2d39.52640179981076!3d9.670486201091942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1649bdb9fef867f5%3A0x927df77ff3182fff!2sYoni%20Guest%20House!5e0!3m2!1sen!2set!4v1730561314620!5m2!1sen!2set" 
        width="600" 
        height="450" 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    </section>
  )
}

export default Map