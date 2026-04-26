'use client';

import { useState, useTransition } from 'react';
import { createJournal } from '@/app/actions/journal';

export default function JournalInput() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setError('');

    startTransition(async () => {
      try {
        await createJournal(content);
        setContent('');
      } catch (err) {
        setError(err instanceof Error ? err.message : '保存失败');
      }
    });
  };

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="今天看到了什么?想到了什么?"
        disabled={isPending}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '1rem',
          border: '1px solid #d4c8b0',
          borderRadius: '4px',
          backgroundColor: '#fffefb',
          color: '#2c2416',
          fontFamily: 'serif',
          fontSize: '1rem',
          lineHeight: 1.8,
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 2rem',
          backgroundColor: isPending ? '#c5b299' : '#8b7355',
          color: '#faf7f2',
          border: 'none',
          borderRadius: '4px',
          fontFamily: 'serif',
          fontSize: '1rem',
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? '正在保存...' : '记下'}
      </button>

      {error && (
        <p style={{ marginTop: '1rem', color: '#a0522d', fontSize: '0.9rem' }}>
          {error}
        </p>
      )}
    </section>
  );
}
