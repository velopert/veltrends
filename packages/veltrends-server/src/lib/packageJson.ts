import { readFile } from 'fs/promises'
const packageJson = JSON.parse(
  await readFile(new URL('../../package.json', import.meta.url), 'utf8'),
)

export default packageJson
