import React from 'react';
import { mockIssues } from '@/mock';
import { Issue } from '@/types';
import ClientIssuesTable from '@/components/ClientIssuesTable/ClientIssuesTable';

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
      <ClientIssuesTable issues={issues} />
    </>
  );
}
