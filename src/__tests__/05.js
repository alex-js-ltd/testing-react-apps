// mocking HTTP requests

import * as React from 'react'
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login from 'comps/login-submission'

const buildLoginForm = build({
    fields: {
        email: fake((faker) => faker.internet.exampleEmail()),
        password: fake((faker) => faker.internet.password()),
    },
})

const server = setupServer(
    rest.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        async (req, res, ctx) => {
            if (!req.body.password) {
                return res(
                    ctx.status(400),
                    ctx.json({ message: 'password required' })
                )
            }
            if (!req.body.email) {
                return res(
                    ctx.status(400),
                    ctx.json({ message: 'username required' })
                )
            }
            return res(ctx.json({ email: req.body.email }))
        }
    )
)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's email`, async () => {
    render(<Login />)
    const { email, password } = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/email/i), email)
    await userEvent.type(screen.getByLabelText(/password/i), password)

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

    expect(screen.getByText(email)).toBeInTheDocument()
})
