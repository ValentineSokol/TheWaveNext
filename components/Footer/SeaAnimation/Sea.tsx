import React from 'react';
import styles from './Sea.module.scss';

function Sea() {
  return (
    <div className={styles.sea}>
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
    </div>
  );
}

export default Sea;
