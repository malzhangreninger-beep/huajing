'use client';

import { useState } from 'react';

export default function JournalForm() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('请先写点什么');
      return;
    }

    setError('');
    setReply('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setReply(data.reply);
      }
    } catch {
      setError('网络异常,请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ width: '100%', fontFamily: 'serif' }}>
      <p
        style={{
          color: '#8b7355',
          fontSize: '1rem',
          margin: '0 0 1rem',
          textAlign: 'center',
        }}
      >
        分享一段诗、一个瞬间,让它成为一张画的起点
      </p>

      <div style={{ width: '100%' }}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例如:窗外的黄昏,有一种难以言说的重量..."
          style={{
            width: '100%',
            minHeight: '140px',
            padding: '1rem',
            fontSize: '1rem',
            fontFamily: 'serif',
            lineHeight: '1.8',
            border: '1px solid #d4c8b0',
            borderRadius: '4px',
            backgroundColor: '#fffefb',
            color: '#2c2416',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontFamily: 'serif',
            backgroundColor: loading ? '#c5b299' : '#8b7355',
            color: '#faf7f2',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? '正在思考...' : '寻找灵感'}
        </button>

        {error && (
          <p style={{ marginTop: '1rem', color: '#a0522d', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}

        {reply && (
          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              backgroundColor: '#fffefb',
              borderLeft: '3px solid #8b7355',
              lineHeight: '2',
              fontSize: '1.05rem',
              whiteSpace: 'pre-wrap',
            }}
          >
            {reply}
          </div>
        )}
      </div>
    </section>
  );
}
