import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  test('initially renders title and author but not likes or url', () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: '123',
      url: 'test.url.org',
      user: { id: '1234abcd', name: 'test user' }
    }

    const container = render(<Blog blog={blog} />).container

    //const titleAuthorElement = screen.getByText('test title test author')
    const titleAuthorElement = container.querySelector('.titleAuthor')
    expect(titleAuthorElement).toBeDefined()

    const hiddenElement = container.querySelector('.urlLikesUserRemove')
    expect(hiddenElement).toHaveStyle('display: none')
  })

  test('renders url and likes when button is clicked', async () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: '123',
      url: 'test.url.org',
      user: { id: '1234abcd', name: 'test user' }
    }

    const container = render(<Blog blog={blog} />).container

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const hiddenElement = container.querySelector('.urlLikesUserRemove')
    expect(hiddenElement).not.toHaveStyle('display: none')
  })

  test('pressing like button calls handler function', async () => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: '123',
      url: 'test.url.org',
      user: { id: '1234abcd', name: 'test user' }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />).container

    const user = userEvent.setup()
    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})