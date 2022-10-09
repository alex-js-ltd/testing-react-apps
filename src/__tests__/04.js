// form testing
// 💯 use Test Data Bot

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
const { build, fake } = require('@jackfranklin/test-data-bot')
import Login from 'comps/login'

const buildLoginForm = build({
    fields: {
        email: fake((faker) => faker.internet.exampleEmail()),
        password: fake((faker) => faker.internet.password()),
    },
})

test('submitting the form calls onSubmit with username and password', async () => {
    const handleSubmit = jest.fn()
    render(<Login onSubmit={handleSubmit} />)
    const { email, password } = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/email/i), email)
    await userEvent.type(screen.getByLabelText(/password/i), password)
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
        email,
        password,
        returnSecureToken: true,
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
})
