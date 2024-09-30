import React from 'react';
import ClientIssuesTable from '@/components/ClientIssuesTable/ClientIssuesTable';

export default async function Home() {
  return (
    <>
      <h1>Issues Table</h1>
      <ClientIssuesTable />
    </>
  );
}
