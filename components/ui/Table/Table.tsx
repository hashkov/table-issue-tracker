import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Column, SortOrder } from '@/types';
import styles from '@/components/ui/Table/Table.module.css';
import Search from '@/components/ui/Search/Search';
import TableSkeleton from '@/components/ui/Table/TableSkeleton/TableSkeleton';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  isLoading: boolean;
}

const LAST_CLICKED_ROW_INDEX_SESSION_KEY = 'lastClickedRowIndex';

const Table = <T extends { id: string | number }>({
  data = [],
  columns,
  caption,
  isLoading,
}: TableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | ''>('');
  const [sortDirection, setSortDirection] = useState<SortOrder>(SortOrder.Asc);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const router = useRouter();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        String(item[key as keyof T])
          ?.toLowerCase()
          .includes(value?.toLowerCase() ?? '')
      )
    );
  }, [data, filters]);

  const sortedDataMemo = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortColumn === '') return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === SortOrder.Asc ? -1 : 1;
      if (aValue > bValue) return sortDirection === SortOrder.Asc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

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
  }, [data]);

  const handleSort = useCallback(
    (column: keyof T) => {
      setSortDirection((prev) =>
        sortColumn === column && prev === SortOrder.Asc
          ? SortOrder.Desc
          : SortOrder.Asc
      );
      setSortColumn(column);
    },
    [sortColumn]
  );

  const handleFilter = useCallback((column: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  }, []);

  const storeLastClickedRowIndex = (rowIndex: number) => {
    sessionStorage.setItem(
      LAST_CLICKED_ROW_INDEX_SESSION_KEY,
      String(rowIndex)
    );
  };

  const handleRowClick = (
    e: React.MouseEvent,
    rowData: T,
    rowIndex: number
  ) => {
    if (e.target instanceof HTMLAnchorElement) {
      return;
    }

    e.preventDefault();
    storeLastClickedRowIndex(rowIndex);
    router.push(`/issues/${rowData.id}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowData: T,
    rowIndex: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      storeLastClickedRowIndex(rowIndex);
      router.push(`/issues/${rowData.id}`);
    }
  };

  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      if (e.key === 'ArrowDown' && currentIndex < sortedDataMemo.length - 1) {
        e.preventDefault();
        rowRefs.current[currentIndex + 1]?.focus();
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        rowRefs.current[currentIndex - 1]?.focus();
      }
    },
    [sortedDataMemo.length]
  );

  const renderCellContent = useCallback((content: unknown): React.ReactNode => {
    if (
      typeof content === 'string' ||
      typeof content === 'number' ||
      typeof content === 'boolean'
    ) {
      return content as React.ReactNode;
    }
    if (React.isValidElement(content)) {
      return content;
    }
    return String(content);
  }, []);

  if (data.length === 0 || isLoading) {
    return <TableSkeleton rowCount={6} columnCount={columns.length} />;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`${styles.th} ${
                  column.key === sortColumn ? styles.sorted : ''
                }`}
                aria-sort={
                  column.key === sortColumn
                    ? sortDirection === SortOrder.Asc
                      ? SortOrder.Asc
                      : SortOrder.Desc
                    : 'none'
                }
              >
                <div className={styles.columnHeader}>
                  {column.sortable ? (
                    <button
                      className={styles.columnTitle}
                      aria-label={`sort by ${String(column.key)} in ${
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
                          src="/assets/icons/sort.svg"
                          width={14}
                          height={14}
                          alt=""
                        />
                      )}
                    </button>
                  ) : (
                    <span className={styles.columnTitle}>{column.label}</span>
                  )}
                  {column.filterable && (
                    <Search
                      id={String(column.key)}
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
          {sortedDataMemo.map((rowData, rowIndex) => (
            <tr
              key={rowData.id}
              className={styles.tr}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              onClick={(e) => handleRowClick(e, rowData, rowIndex)}
              onKeyDown={(e) => {
                handleKeyDown(e, rowData, rowIndex);
                handleKeyNavigation(e, rowIndex);
              }}
              aria-label={`Go to details page for row ${rowIndex + 1}`}
              tabIndex={0}
              role="link"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className={styles.td}>
                  {column.key === 'url' ? (
                    <a
                      href={rowData[column.key] as string}
                      className={styles.a}
                    >
                      {rowData[column.key] as React.ReactNode}
                    </a>
                  ) : (
                    renderCellContent(rowData[column.key])
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
