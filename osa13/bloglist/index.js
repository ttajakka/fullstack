require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     const blogs = await Blog.findAll()
//     blogs.map((b) => {
//       console.log(`${b.author}: '${b.title}', ${b.likes} likes`)
//     })
//     sequelize.close()
//   } catch (error) {
//     console.log('Unable to connect to database:', error)
//   }
// }

// main()

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
