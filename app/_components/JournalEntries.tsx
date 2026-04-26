import { createClient } from '@/lib/supabase/server';

type JournalEntry = {
  id: string;
  content: string;
  created_at: string;
  journal_feedbacks?: JournalFeedback[];
};

type JournalFeedback = {
  id: string;
  content: string;
  type: string;
  created_at: string;
};

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getDateLabel(dateKey: string) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (dateKey === formatDateKey(today)) {
    return '今天';
  }

  if (dateKey === formatDateKey(yesterday)) {
    return '昨天';
  }

  return dateKey;
}

export default async function JournalEntries() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: entries } = await supabase
    .from('journals')
    .select('*, journal_feedbacks(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const journals = (entries ?? []) as JournalEntry[];

  if (journals.length === 0) {
    return (
      <p
        style={{
          color: '#8b7355',
          fontFamily: 'serif',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        还没有记录。今天看到了什么?写下来。
      </p>
    );
  }

  const groupedEntries = journals.reduce<Map<string, JournalEntry[]>>(
    (groups, entry) => {
      const dateKey = formatDateKey(new Date(entry.created_at));
      const group = groups.get(dateKey) ?? [];
      group.push(entry);
      groups.set(dateKey, group);
      return groups;
    },
    new Map()
  );

  return (
    <section
      style={{
        width: '100%',
        marginTop: '2.5rem',
        fontFamily: 'serif',
      }}
    >
      {Array.from(groupedEntries.entries()).map(([dateKey, group]) => (
        <div key={dateKey} style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              color: '#8b7355',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            {getDateLabel(dateKey)}
          </h2>

          {group.map((entry, index) => {
            const createdAt = new Date(entry.created_at);

            return (
              <article
                key={entry.id}
                style={{
                  padding: index === 0 ? '0 0 1rem' : '1rem 0',
                  borderBottom: '1px solid #e8dfd0',
                }}
              >
                <time
                  dateTime={entry.created_at}
                  style={{
                    display: 'block',
                    color: '#a0937a',
                    fontSize: '0.8rem',
                    marginBottom: '0.35rem',
                  }}
                >
                  {formatTime(createdAt)}
                </time>
                <p
                  style={{
                    color: '#2c2416',
                    fontSize: '0.95rem',
                    lineHeight: 1.8,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {entry.content}
                </p>
                {entry.journal_feedbacks?.map((feedback) => (
                  <p
                    key={feedback.id}
                    style={{
                      color: '#a09173',
                      fontFamily: 'serif',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      margin: '0.5rem 0 0',
                      paddingLeft: '1rem',
                      borderLeft: '2px solid #e8dfd0',
                    }}
                  >
                    ✦ {feedback.content}
                  </p>
                ))}
              </article>
            );
          })}
        </div>
      ))}
    </section>
  );
}
