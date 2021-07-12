import React from 'react';
import styles from './Banner.module.css';

export interface BannerProps {
  userName?: string;
}

export function Banner(props: BannerProps) {
  return (
    <div className={styles.Banner}>
      <div className={styles.BannerName}>
        <div className={styles.Title}>Web 2.0</div>
        <div className={styles.UserName}>{props.userName}</div>
      </div>
    </div>
  );
}
