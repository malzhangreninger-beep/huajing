'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || password.length < 6) {
      setError('邮箱或密码错误');
      return;
    }

    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('邮箱或密码错误');
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#faf7f2',
        color: '#2c2416',
        fontFamily: 'serif',
        padding: '4rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>画境</h1>
          <p style={{ fontSize: '0.95rem', color: '#8b7355' }}>
            登录,继续你的创作日志
          </p>
        </div>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="邮箱"
          disabled={loading}
          required
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            fontSize: '1rem',
            fontFamily: 'serif',
            border: '1px solid #d4c8b0',
            borderRadius: '4px',
            backgroundColor: '#fffefb',
            color: '#2c2416',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="密码"
          disabled={loading}
          required
          minLength={6}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.85rem 1rem',
            fontSize: '1rem',
            fontFamily: 'serif',
            border: '1px solid #d4c8b0',
            borderRadius: '4px',
            backgroundColor: '#fffefb',
            color: '#2c2416',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.85rem',
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
          {loading ? '正在登录...' : '登录'}
        </button>

        {error && (
          <p
            style={{
              marginTop: '1rem',
              color: '#a0522d',
              fontSize: '0.9rem',
            }}
          >
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
