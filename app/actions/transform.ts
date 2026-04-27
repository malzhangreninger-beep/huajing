'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// 保存一条消息到数据库
export async function saveMessage(
  role: 'user' | 'assistant',
  content: string,
  inputType?: string
) {
  try {
    const supabase = await createClient()
    await supabase.from('transform_conversations').insert({
      role,
      content,
      input_type: inputType || null
    })
  } catch (error) {
    console.error('保存消息失败:', error)
  }
}

// 读取所有对话记录
export async function getConversations() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('transform_conversations')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('读取对话失败:', error)
    return []
  }
}

// 清空所有对话记录
export async function clearConversations() {
  try {
    const supabase = await createClient()
    await supabase
      .from('transform_conversations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
  } catch (error) {
    console.error('清空对话失败:', error)
  }
}
