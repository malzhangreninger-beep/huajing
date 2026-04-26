'use client';

import { ReactNode, useState } from 'react';
import JournalForm from './JournalForm';
import JournalInput from './JournalInput';

type HomeTabsProps = {
  entries: ReactNode;
};

type Tab = 'today' | 'chat';

export default function HomeTabs({ entries }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('today');

  const getTabStyle = (tab: Tab) => ({
    color: activeTab === tab ? '#2c2416' : '#8b7355',
    borderBottom: activeTab === tab ? '2px solid #8b7355' : '2px solid transparent',
  });

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#faf7f2',
        color: '#2c2416',
        fontFamily: 'serif',
        padding: '4rem 1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          画境
        </h1>

        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('today')}
            style={{
              ...getTabStyle('today'),
              backgroundColor: 'transparent',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              padding: '0 0 0.5rem',
              fontFamily: 'serif',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            今天
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            style={{
              ...getTabStyle('chat'),
              backgroundColor: 'transparent',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              padding: '0 0 0.5rem',
              fontFamily: 'serif',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            对话
          </button>
        </nav>

        {activeTab === 'today' ? (
          <>
            <JournalInput />
            {entries}
          </>
        ) : (
          <JournalForm />
        )}
      </div>
    </main>
  );
}
