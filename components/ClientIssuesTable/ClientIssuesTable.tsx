'use client';

import React from 'react';
import Table from '@/components/ui/Table/Table';
import { Issue, Column } from '@/types';
import useFetch from '@/hooks/useFetch';

interface ClientIssuesTableProps {
  issues?: Issue[];
}

const columns: Column<Issue>[] = [
  { key: 'id', label: 'No.', filterable: true, sortable: true },
  { key: 'issueType', label: 'Issue Type', filterable: true, sortable: true },
  { key: 'severity', label: 'Severity', filterable: true, sortable: true },
  { key: 'component', label: 'Component', filterable: true, sortable: true },
  { key: 'selector', label: 'Selector', filterable: true, sortable: true },
  { key: 'url', label: 'URL', filterable: true, sortable: true },
];

const ClientIssuesTable: React.FC<ClientIssuesTableProps> = ({
  issues = [],
}) => {
  const { data, loading, error } = useFetch<Issue[]>(
    'http://localhost:1337/issues'
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <Table data={data || issues} columns={columns} isLoading={loading} />;
};

export default ClientIssuesTable;
