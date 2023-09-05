require('dotenv').config()
const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()
    blogs.map((b) => {
      console.log(`${b.author}: '${b.title}', ${b.likes} likes`)
    })
    sequelize.close()
  } catch (error) {
    console.log('Unable to connect to database:', error)
  }
}

main()
