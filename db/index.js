import Sequelize from 'sequelize'
import DataTypes from 'sequelize/lib/data-types'
import { ObjectID } from 'mongodb'
import config from './config'
import models from './models'


export const Key = () => ObjectID().toHexString()


class Database extends Sequelize {
  constructor() {
    super(config[process.env.NODE_ENV])
  }

  /**
   * Define a new model with pre-defined `ObjectID` as it primary key.
   * 
   * The table columns are defined by the object that is given as the second argument.
   * Each key of the object representas a column.
   * 
   * @param {String} modelName The name of the model. The model will be stored in 
   *                           `sequelize.models` under this name.
   * @param {Object} attributes An object, where each attributes is a column of the table.
   * @param {Object} [options] These options are merged with the default define options provided
   *                           to the `Sequelize` constructor and passed to `Model.init()`.
   * 
   * @return {Model} Newly defined model.
   */
  define(modelName, attributes, options = {}) {
    const fields = Object.assign({}, attributes, {
      id: {
        primaryKey: true,
        type: DataTypes.CHAR(24),
        defaultValue: Key,
      },
    })
    return super.define(modelName, fields, options)
  }

  /**
   *  Setting up all tables & their relationships by:
   *  - import all pre-defined models under folder `models` into `sequelize` global model caches.
   *  - associate models by calling their pre-defined `<Model>.associate` function (if any).
   */
  bootstrap() {
    models.forEach((abspath) => {
      const model = this.import(abspath)
      this[model.name] = model
    })
    // Re-visit registered models to establish relationships.
    Object.keys(this).forEach((modelName) => {
      this[modelName].associate && this[modelName].associate(this)
    })
  }
}

const db = new Database()

db.bootstrap()

export default db
export { DataTypes }