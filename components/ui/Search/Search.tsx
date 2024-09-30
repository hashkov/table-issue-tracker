import React, { useState, useRef, useEffect } from 'react';
import styles from './Search.module.css';
import Image from 'next/image';

interface SearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Search',
  label,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm('');
    } else if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchTerm('');
      onSearch('');
      inputRef.current?.blur();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <button
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Close ${label}` : `Open ${label}`}
        className={styles.searchButton}
      >
        <Image src={'/assets/icons/search.svg'} width={14} height={14} alt="" />
      </button>
      <div
        className={`${styles.inputContainer} ${
          isExpanded ? styles.expanded : ''
        }`}
      >
        <label htmlFor={id} className={styles.srOnly}>
          {label}
        </label>
        <input
          type="text"
          id={id}
          ref={inputRef}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label={label}
          tabIndex={isExpanded ? 0 : -1}
          aria-hidden={!isExpanded}
        />
      </div>
    </div>
  );
};

export default Search;
