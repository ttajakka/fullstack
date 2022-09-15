const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('of an empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toEqual(undefined)
  })

  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const answer = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    expect(result).toEqual(answer)
  })

  test('of a bigger list is found correctly', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const answer = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(answer)
  })

  test('when two blogs have the same maximum likes is the first one', () => {
    const twoMaxes = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d1711',
        title: 'Go To',
        author: 'E. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const answer = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    const result = listHelper.favoriteBlog(twoMaxes)
    expect(result).toEqual(answer)
  })

  describe('most blogs', () => {

    test('is undefined if blog list is empty', () => {
      expect(listHelper.mostBlogs([])).toEqual(undefined)
    })

    test('returns the only author when list has only one blog', () => {

      const result = listHelper.mostBlogs(listWithOneBlog)

      const answer = {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
      expect(result).toEqual(answer)
    })

    test('returns correct author for bigger list', () => {

      const result = listHelper.mostBlogs(listWithManyBlogs)

      const answer = {
        author: 'Robert C. Martin',
        blogs: 3
      }
      expect(result).toEqual(answer)
    })
  })

  describe('most likes', () => {

    test.only('is undefined if blog list is empty', () => {
      expect(listHelper.mostLikes([])).toEqual(undefined)
    })

    test.only('returns the only author when list has only one blog', () => {

      const result = listHelper.mostLikes(listWithOneBlog)

      const answer = {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
      expect(result).toEqual(answer)
    })

    test.only('returns correct author and likes for bigger list', () => {

      const result = listHelper.mostLikes(listWithManyBlogs)

      const answer = {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
      expect(result).toEqual(answer)
    })
  })
})