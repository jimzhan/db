import path from 'path'
import globby from 'globby'

const here = path.resolve(__dirname)

const models = globby.sync([
  `${here}/**/*.js`,
  `!${here}/**/index.js`,
  `!${here}/**/*.spec.js`,
])

export default models