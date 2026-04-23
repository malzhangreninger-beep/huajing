export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'serif',
      backgroundColor: '#faf7f2',
      color: '#2c2416',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        你好,画境
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#8b7355' }}>
        一个为艺术创作者而生的 AI 工作室
      </p>
    </main>
  );
}