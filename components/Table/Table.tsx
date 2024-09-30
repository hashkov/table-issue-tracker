'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Column, Issue, SortOrder } from '@/types';
import styles from '@/components/Table/Table.module.css';
import Search from '@/components/ui/Search/Search';

interface TableProps {
  data: Issue[];
  columns: Column[];
}

const LAST_CLICKED_ROW_INDEX_SESSION_KEY = 'lastClickedRowIndex';

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<SortOrder>(SortOrder.Asc);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        String(item[key]).toLowerCase().includes(value.toLowerCase())
      )
    );

    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === SortOrder.Asc ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === SortOrder.Asc ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  }, [data, sortColumn, sortDirection, filters]);

  useEffect(() => {
    const lastClickedRowIndex = sessionStorage.getItem(
      LAST_CLICKED_ROW_INDEX_SESSION_KEY
    );
    if (lastClickedRowIndex === null) {
      return;
    }
    const rowIndex = parseInt(lastClickedRowIndex, 10);
    if (rowRefs.current[rowIndex]) {
      rowRefs.current[rowIndex]?.focus();
      sessionStorage.removeItem(LAST_CLICKED_ROW_INDEX_SESSION_KEY);
    }
  }, []);

  const handleSort = (column: string) => {
    setSortDirection((prev) =>
      sortColumn === column && prev === SortOrder.Asc
        ? SortOrder.Desc
        : SortOrder.Asc
    );
    setSortColumn(column);
  };

  const handleFilter = (column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const storeLastClickedRowIndex = (rowIndex: number) => {
    sessionStorage.setItem(
      LAST_CLICKED_ROW_INDEX_SESSION_KEY,
      String(rowIndex)
    );
  };

  const handleRowClick = (
    e: React.MouseEvent,
    issue: Issue,
    rowIndex: number
  ) => {
    if (e.target.tagName === 'A') {
      return;
    }

    e.preventDefault();
    storeLastClickedRowIndex(rowIndex);
    router.push(`/issues/${issue.id}`);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent,
    issue: Issue,
    rowIndex: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      storeLastClickedRowIndex(rowIndex);
      router.push(`/issues/${issue.id}`);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${styles.th} ${
                  column.key === sortColumn ? styles.sorted : ''
                }`}
              >
                <div className={styles.columnHeader}>
                  <button
                    className={styles.columnTitle}
                    aria-label={`sort by ${column.key} in ${
                      sortDirection !== SortOrder.Asc
                        ? SortOrder.Asc
                        : SortOrder.Desc
                    } order`}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}

                    {sortColumn === column.key && sortDirection ? (
                      <Image
                        src={`/assets/icons/sort-${sortDirection}.svg`}
                        width={14}
                        height={14}
                        alt=""
                      />
                    ) : (
                      <Image
                        src={`/assets/icons/sort.svg`}
                        width={14}
                        height={14}
                        alt=""
                      />
                    )}
                  </button>
                  {column.filterable && (
                    <Search
                      id={column.key}
                      label={`Search for ${column.label}`}
                      placeholder={`Search for ${column.label}`}
                      onSearch={(value) => handleFilter(column.key, value)}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((issue, rowIndex) => (
            <tr
              key={issue.id}
              className={styles.tr}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              onClick={(e) => handleRowClick(e, issue, rowIndex)}
              onKeyDown={(e) => handleKeyDown(e, issue, rowIndex)}
              aria-label={`Move to the details page of issue #${issue.id} about ${issue.description}`}
              tabIndex={0}
              role="link"
            >
              {columns.map((column) => (
                <td key={`${issue.id}-${column.key}`} className={styles.td}>
                  {column.key === 'url' ? (
                    <a href={issue[column.key]}>{issue[column.key]}</a>
                  ) : (
                    issue[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
