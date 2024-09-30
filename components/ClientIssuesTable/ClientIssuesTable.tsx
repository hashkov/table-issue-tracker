'use client';

import React from 'react';
import Table from '@/components/ui/Table/Table';
import { Issue, Column } from '@/types';

interface ClientIssuesTableProps {
  issues: Issue[];
}

const columns: Column<Issue>[] = [
  { key: 'id', label: 'No.', filterable: true, sortable: true },
  { key: 'issueType', label: 'Issue Type', filterable: true, sortable: true },
  { key: 'severity', label: 'Severity', filterable: true, sortable: true },
  { key: 'component', label: 'Component', filterable: true, sortable: true },
  { key: 'selector', label: 'Selector', filterable: true, sortable: true },
  { key: 'url', label: 'URL', filterable: true, sortable: true },
];

const ClientIssuesTable: React.FC<ClientIssuesTableProps> = ({ issues }) => {
  return <Table data={issues} columns={columns} />;
};

export default ClientIssuesTable;
