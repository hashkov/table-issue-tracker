import React from 'react';
import styles from '@/components/ui/Table/Table.module.css';

interface TableSkeletonProps {
  rowCount: number;
  columnCount: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowCount,
  columnCount,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={`${styles.table} ${styles.skeleton}`}>
        <thead>
          <tr>
            {[...Array(columnCount)].map((_, index) => (
              <th key={index} className={styles.th}>
                <div className={styles.columnHeader}>
                  <div
                    className={`${styles.columnTitle} ${styles.skeletonText}`}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {[...Array(columnCount)].map((_, colIndex) => (
                <td key={colIndex} className={styles.td}>
                  <div className={styles.skeletonText}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
