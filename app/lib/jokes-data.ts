// app/lib/jokes-data.ts v6.2.0
import { Joke } from './types'
import { JOKES_BATCH_1 } from './jokes/jokes-batch-1'
import { JOKES_BATCH_2 } from './jokes/jokes-batch-2'
import { JOKES_BATCH_3 } from './jokes/jokes-batch-3'
import { JOKES_BATCH_4 } from './jokes/jokes-batch-4'
import { JOKES_BATCH_5 } from './jokes/jokes-batch-5'
import { JOKES_BATCH_6 } from './jokes/jokes-batch-6'
import { JOKES_BATCH_7 } from './jokes/jokes-batch-7'
import { JOKES_BATCH_8 } from './jokes/jokes-batch-8'
import { JOKES_BATCH_9 } from './jokes/jokes-batch-9'
import { JOKES_BATCH_10 } from './jokes/jokes-batch-10'
import { JOKES_BATCH_11 } from './jokes/jokes-batch-11'
import { JOKES_BATCH_12 } from './jokes/jokes-batch-12'
import { JOKES_BATCH_13 } from './jokes/jokes-batch-13'
import { JOKES_BATCH_14 } from './jokes/jokes-batch-14'
import { JOKES_BATCH_15 } from './jokes/jokes-batch-15'

export const JOKES_DATA: Joke[] = [
  ...JOKES_BATCH_1,
  ...JOKES_BATCH_2,
  ...JOKES_BATCH_3,
  ...JOKES_BATCH_4,
  ...JOKES_BATCH_5,
  ...JOKES_BATCH_6,
  ...JOKES_BATCH_7,
  ...JOKES_BATCH_8,
  ...JOKES_BATCH_9,
  ...JOKES_BATCH_10,
  ...JOKES_BATCH_11,
  ...JOKES_BATCH_12,
  ...JOKES_BATCH_13,
  ...JOKES_BATCH_14,
  ...JOKES_BATCH_15,
]

export const JOKES_DATA_DEDUPED = JOKES_DATA
