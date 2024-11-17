// modal component the  displays its children in a modal
import styles from '@/styles/modal.module.css'

function Modal({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default Modal;