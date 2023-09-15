const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: 'markedBlog' })
Blog.belongsToMany(User, { through: Reading, as: 'usersMarked' })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, Reading, Session
}