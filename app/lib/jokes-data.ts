// app/lib/jokes-data.ts v6.2.0
import { Joke } from './types'
import { JOKES_BATCH_1 } from './jokes/jokes-batch-1'
import { JOKES_BATCH_2 } from './jokes/jokes-batch-2'
import { JOKES_BATCH_3 } from './jokes/jokes-batch-3'
import { JOKES_BATCH_4 } from './jokes/jokes-batch-4'
import { JOKES_BATCH_5 } from './jokes/jokes-batch-5'

export const JOKES_DATA: Joke[] = [
  ...JOKES_BATCH_1,
  ...JOKES_BATCH_2,
  ...JOKES_BATCH_3,
  ...JOKES_BATCH_4,
  ...JOKES_BATCH_5,
]

export const JOKES_DATA_DEDUPED = JOKES_DATA
