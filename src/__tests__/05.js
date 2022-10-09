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
import Login from 'comps/login'

const buildLoginForm = build({
    fields: {
        email: fake((faker) => faker.internet.exampleEmail()),
        password: fake((faker) => faker.internet.password()),
    },
})

test(`logging in displays the user's email`, async () => {
    render(<Login />)
    const { email, password } = buildLoginForm()
})
