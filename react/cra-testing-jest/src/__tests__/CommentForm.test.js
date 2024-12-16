import { fireEvent, render, screen } from '@testing-library/react'
import { CommentForm } from '../components'
import userEvent from '@testing-library/user-event'

describe(`Test cases related to comment button`, () => {
  test(`Initial condition`, () => {
    render(<CommentForm></CommentForm>)

    // TODO: We can get the input using by its label, placeholder or role attributes.
    const commentBox = screen.getByRole('textbox')
    expect(commentBox).toBeInTheDocument()

    // * Matching a string:
    const checkBox = screen.getByLabelText('I agree to terms and conditions', { exact: false })
    // * Matching a regex:
    const checkBox2 = screen.getByLabelText(/I agree to terms and conditions/i)
    // * Matching with a custom function:
    const checkBox3 = screen.getByLabelText((content, element) => content.startsWith('I agree to terms and conditions'))
    expect(checkBox).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: 'comment', exact: false })
    expect(submitButton).toBeDisabled()
  })

  test(`Enable comment button on type and checkbox click`, async () => {
    render(<CommentForm></CommentForm>)

    const commentBox = screen.getByPlaceholderText(/write your comment here/i)
    const checkBox = screen.getByLabelText(/I agree to terms and conditions/i)
    const submitButton = screen.getByRole('button', /comment/i)

    // TODO: There are 2 ways to Simulating user actions.
    // ? 1. Using fireEvent of @testing-library/react - it is synchronous
    // ? 2. Using userEvent of @testing-library/user-event - it is asynchronous so we have to add await before using its methods

    // ? 1. Using fireEvent of @testing-library/react
    // * Write something in comment box
    // fireEvent.change(commentBox, { target: { value: 'something' } })
    // * check t&c checkbox
    // fireEvent.click(checkBox)

    // ? 2. Using userEvent of @testing-library/user-event
    await userEvent.type(commentBox, 'something')
    await userEvent.click(checkBox)
    // * Now comment button must be enabled
    expect(submitButton).toBeEnabled()

    // * uncheck t&c checkbox
    fireEvent.click(checkBox)
    // * Now comment button must be disabled
    expect(submitButton).toBeDisabled()
  })
})
