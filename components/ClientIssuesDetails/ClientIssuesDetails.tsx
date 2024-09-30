'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ClientIssuesDetails = () => {
  const { data, loading, error } = useFetch('http://localhost:1337/issues');

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Issue Details</h1>
      <p className={styles.detail}>
        <span className={styles.label}>ID:</span> {issue.id}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Type:</span> {issue.issueType}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Severity:</span> {issue.severity}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Component:</span> {issue.component}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Selector:</span> {issue.selector}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>URL:</span>
        <a href={issue.url}>{issue.url}</a>
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Description:</span> {issue.description}
      </p>
      <div className={styles.detail}>
        <span className={styles.label}>Code Snippet:</span>
        <pre className={styles.codeSnippet}>
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>
      <div className={styles.detail}>
        <span className={styles.label}>Screenshot:</span>
        <Image
          src={issue.screenshot}
          alt={`Issue screenshot ${issue.description}`}
          width={200}
          height={300}
          className={styles.screenshot}
        />
      </div>
      <Link href="/" className={styles.backLink}>
        Back to Table
      </Link>
    </div>
  );
};

export default ClientIssuesDetails;
