import { redirect } from 'next/navigation';
import HomeTabs from './_components/HomeTabs';
import JournalEntries from './_components/JournalEntries';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <HomeTabs entries={<JournalEntries />} />;
}
