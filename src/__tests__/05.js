// mocking HTTP requests

import * as React from 'react'
import { render, screen, waitForElementToBeRemoved } from 'test/test-utils'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'
import Login from 'comps/login-submission'

const buildLoginForm = build({
    fields: {
        email: fake((faker) => faker.internet.exampleEmail()),
        password: fake((faker) => faker.internet.password()),
    },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's email`, async () => {
    render(<Login />)
    const { email, password } = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/email/i), email)
    await userEvent.type(screen.getByLabelText(/password/i), password)

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

    expect(screen.getByText(email)).toBeInTheDocument()
})

test('omitting the password results in an error', async () => {
    render(<Login />)
    const { email } = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/email/i), email)
    // don't type in the password
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
        `"password required"`
    )
})
