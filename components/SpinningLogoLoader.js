import React from 'react';
import Image from 'next/image';
import styles from './SpinningLogoLoader.module.css';

export default function SpinningLogoLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <Image
        src="/logo1.png"
        alt="Celestial Web Solutions Logo"
        width={120}
        height={120}
        className={styles.spinningLogo}
        priority
      />
    </div>
  );
}
