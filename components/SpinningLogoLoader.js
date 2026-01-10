import React from 'react';
import styles from './SpinningLogoLoader.module.css';

export default function SpinningLogoLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.logoContainer}>
        <img
          src="/logo.png"
          alt="Loading"
          className={styles.spinningLogo}
          loading="eager"
        />
      </div>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
}
