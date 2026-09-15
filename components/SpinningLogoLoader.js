import React from 'react';
import styles from './SpinningLogoLoader.module.css';

export default function SpinningLogoLoader() {
  return (
    <div className={styles.loaderWrapper} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.logoStage}>
        <span className={styles.orbit} aria-hidden />
        <span className={styles.orbitGlow} aria-hidden />
        <div className={styles.logoPulse}>
          <img
            src="/logo-mark.png"
            alt=""
            className={styles.logoMark}
            width={88}
            height={88}
            decoding="async"
          />
        </div>
      </div>
      <div className={styles.loadingText}>Loading</div>
      <span className={styles.srOnly}>Please wait</span>
    </div>
  );
}
