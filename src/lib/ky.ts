import ky from 'ky'

import { env } from './env'

const kyInstance = ky.create({ prefixUrl: env.NEXT_PUBLIC_API_BASE_URL, credentials: 'include' })

export default kyInstance
