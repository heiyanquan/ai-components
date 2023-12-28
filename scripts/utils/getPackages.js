import { readdirSync } from 'fs'
import { join } from 'path'

function getPackages() {
  return readdirSync(join(__dirname, '../../packages')).filter((pkg) => pkg.charAt(0) !== '.')
}

export default getPackages
