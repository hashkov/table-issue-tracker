import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Issue } from '@/types';
import styles from './page.module.css';
import { mockIssues } from '@/mock';

async function getIssue(id: number): Promise<Issue | null> {
  const issue = mockIssues.find((issue) => issue.id === id);
  return new Promise((resolve) => {
    resolve(issue || null);
  });
}

export default async function IssuePage({
  params,
}: {
  params: { id: number };
}) {
  const issue = await getIssue(Number(params.id));

  if (!issue) notFound();

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
}
