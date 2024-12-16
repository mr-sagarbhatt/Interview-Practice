import { render, screen, fireEvent } from '@testing-library/react'
import { CommentList } from '../components'

describe(`Comments list tests`, () => {
  const allComments = [
    { id: 1, text: 'Comment 1' },
    { id: 2, text: 'Comment 2' },
    { id: 3, text: 'Comment 3' },
  ]

  test('Comments are not available', () => {
    // * allComments props will be empty array when comments are not available
    render(<CommentList allComments={[]}></CommentList>)

    // TODO: We can use getByText to query <p />, <h1 /> or <li /> elements.
    const h2Element = screen.getByText(/no comments/i)
    expect(h2Element).toBeInTheDocument()
  })
  test('Comments are available', () => {
    render(<CommentList allComments={allComments}></CommentList>)

    // TODO: Here we have used .queryByText() in palace of .getByText() because h2Element will not be available on screen so .getByText() will throw an error and .queryByText() will not throw any error.
    const h2Element = screen.queryByText(/no comments/i)
    expect(h2Element).not.toBeInTheDocument()

    // TODO: Here either we can check whether all comments are present in the DOM or not, either individually or all at once

    // ? Check individually
    for (let i of allComments) {
      expect(screen.getByText(i.text, { exact: false })).toBeInTheDocument()
    }

    // ? Check all at once
    const commentLi = screen.getAllByRole('listitem')
    // expect(commentLi).toHaveLength(allComments.length)
    // * or
    // expect(commentLi.length).toBe(allComments.length) // TODO: .toBe() is used for primitive values like, numbers, strings or booleans

    // TODO: .toEqual() is used for objects, or arrays (which store reference as a value)
    expect(allComments).toEqual(allComments)
  })
})
