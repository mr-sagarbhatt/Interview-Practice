import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe(`Integration testing - testing of comments functionality - CommentForm and CommentList Components`, () => {
  test(`Comments gets displayed after submitting`, async () => {
    render(<App></App>)

    const comment = screen.getByPlaceholderText(/Write your comment here/i)
    const checkBox = screen.getByLabelText(/I agree to terms and conditions/i)
    const submitButton = screen.getByRole('button', { name: 'comment', exact: false })

    await userEvent.type(comment, 'Comment 1')
    await userEvent.click(checkBox)
    await userEvent.click(submitButton)
    // await userEvent.clear(comment)

    // TODO: Before Mock APIs elements are appeared synchronously so we are using screen.getByText()
    // const commentLi = screen.getByText(/Comment 1/i)
    // TODO: After Mock APIs elements are appeared asynchronously so we are using screen.findByText()
    const commentLi = await screen.findByText(/Comment 1/i, {}, { interval: 500, timeout: 2000 })

    // TODO: To debug - it will print the document in console.
    expect(commentLi).toBeInTheDocument()
    screen.debug()
  })
  test(`2 Comments gets displayed after submitting`, async () => {
    render(<App></App>)

    const comment = screen.getByPlaceholderText(/Write your comment here/i)
    const checkBox = screen.getByLabelText(/I agree to terms and conditions/i)
    const submitButton = screen.getByRole('button', { name: 'comment', exact: false })

    await userEvent.type(comment, 'Comment 1')
    await userEvent.click(checkBox)
    await userEvent.click(submitButton)
    await userEvent.clear(comment)

    await userEvent.type(comment, 'Comment 2')
    await userEvent.click(submitButton)

    // const commentLi = screen.getByText(/Comment 1/i)
    // expect(commentLi).toBeInTheDocument()
    // TODO: Before Mock APIs elements are appeared synchronously so we are using screen.getByText()
    // const commentLi = screen.getAllByRole('listitem')
    // TODO: After Mock APIs elements are appeared asynchronously so we are using screen.findByText() or we can use waitFor() and screen.getAllByRole() method to get it asynchronous data synchronously

    // * screen.findByText()
    // TODO: here once it finds the first element it will assert the result so either we need to change the default interval and timeout or it is better to use waitFor() and screen.getAllByRole() for asynchronous call
    // const commentLi = await screen.findAllByRole('listitem', {}, { interval: 500, timeout: 2000 })
    // expect(commentLi).toHaveLength(2)

    // * or (Recommended) - waitFor() and screen.getAllByRole()

    await waitFor(() => {
      const commentLi = screen.getAllByRole('listitem')
      // expect(commentLi).toHaveLength(2)
      expect(commentLi.length).toBe(2)
    })
    screen.debug()
  })
})
