import React from 'react';
import Table from '@/components/Table/Table';
import { mockIssues } from '@/mock';
import { Issue, Column } from '@/types';

const columns: Column[] = [
  { key: 'id', label: 'No.', filterable: true },
  { key: 'issueType', label: 'Issue Type', filterable: true },
  { key: 'severity', label: 'Severity', filterable: true },
  { key: 'component', label: 'Component', filterable: true },
  { key: 'selector', label: 'Selector', filterable: true },
  { key: 'url', label: 'URL', filterable: true },
];

async function getIssues(): Promise<Issue[]> {
  // In a real app, this would be an API call
  // For now, we'll return mock data
  return mockIssues;
}

export default async function Home() {
  const issues = await getIssues();
  return (
    <>
      <h1>Issues Table</h1>
      <Table data={issues} columns={columns} />
    </>
  );
}
