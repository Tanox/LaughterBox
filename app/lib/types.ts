export type JokeCategory = 
  | 'humor' 
  | 'cold' 
  | 'programmer' 
  | 'life' 
  | 'animal' 
  | 'food' 
  | 'relationship' 
  | 'work' 
  | 'school' 
  | 'family' 
  | 'other'

export interface Joke {
  id: string
  content: string
  category: JokeCategory
  tags: string[]
  source?: string
  rating?: number
}

export interface CategoryInfo {
  id: JokeCategory
  name: string
  description: string
  emoji: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'humor', name: '幽默', description: '经典幽默笑话', emoji: '😄' },
  { id: 'cold', name: '冷笑话', description: '冷到发抖的笑话', emoji: '🥶' },
  { id: 'programmer', name: '程序员', description: '程序员专属笑话', emoji: '💻' },
  { id: 'life', name: '生活', description: '生活趣事', emoji: '🏠' },
  { id: 'animal', name: '动物', description: '动物相关笑话', emoji: '🐶' },
  { id: 'food', name: '美食', description: '吃货专属笑话', emoji: '🍔' },
  { id: 'relationship', name: '情感', description: '爱情与友情', emoji: '❤️' },
  { id: 'work', name: '职场', description: '职场趣事', emoji: '💼' },
  { id: 'school', name: '校园', description: '校园生活', emoji: '📚' },
  { id: 'family', name: '家庭', description: '家庭趣事', emoji: '👨👩👧👦' },
  { id: 'other', name: '其他', description: '其他类型', emoji: '📖' },
]