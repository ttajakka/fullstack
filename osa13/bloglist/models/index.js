const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: 'markedBlog' })
Blog.belongsToMany(User, { through: Reading, as: 'usersMarked' })

module.exports = {
  Blog, User, Reading
}