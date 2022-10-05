// https://testing-playground.com/
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from 'comps/login'

test('submitting the form calls onSubmit with username and password', () => {
    let submittedData

    const handleSubmit = (data) => {
        submittedData = data
    }

    render(<Login onSubmit={handleSubmit} />)

    const username = 'chucknorris'
    const password = 'i need no password'

    screen.debug()
    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/password/i), password)
    userEvent.click(
        screen.getByRole('button', {
            name: /submit/i,
        })
    )
    expect(submittedData).toEqual({
        username,
        password,
    })
})