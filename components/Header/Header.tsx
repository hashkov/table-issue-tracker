import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.container}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>
                Issues Tracker
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
