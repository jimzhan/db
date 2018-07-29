const Sequelize = require('sequelize')
const { ObjectID } = require('mongodb')


class Database extends Sequelize {
  /**
   * Merge given fields with default/pre-defined common fields.
   * @return merged fields in map.
   */
  define(name, fields, options = {}) {
    const attrs = Object.assign({
      id: {
        primaryKey: true,
        type: Sequelize.CHAR(24),
        defaultValue: ObjectID().toHexString(),
      }
    }, fields || {})
    return super.define(name, attrs, options)
  }
}

module.exports = Database
