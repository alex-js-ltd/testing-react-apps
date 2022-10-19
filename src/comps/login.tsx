// http://localhost:3000/login
// this renders a login UI and calls the onSubmit handler with the username
// and password when the user submits the form.

import React, { FormEvent } from 'react'

const Login = ({ onSubmit }: { onSubmit: Function }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget

        const formElements = form.elements as typeof form.elements & {
            email: HTMLInputElement
            password: HTMLInputElement
        }

        const { email, password } = formElements

        onSubmit({
            email: email.value,
            password: password.value,
            returnSecureToken: true,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email-field">Email</label>
                <input id="email-field" name="email" type="text" />
            </div>
            <div>
                <label htmlFor="password-field">Password</label>
                <input id="password-field" name="password" type="password" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export { Login }
