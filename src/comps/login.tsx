// http://localhost:3000/login
// this renders a login UI and calls the onSubmit handler with the username
// and password when the user submits the form.

import React, { FC, FormEvent } from 'react'

const Login = ({ onSubmit }: { onSubmit: Function }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget

        const formElements = form.elements as typeof form.elements & {
            username: HTMLInputElement
            password: HTMLInputElement
        }

        const { username, password } = formElements

        onSubmit({
            username: username.value,
            password: password.value,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username-field">Username</label>
                <input id="username-field" name="username" type="text" />
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

type Action = { type: 'increment' } | { type: 'decrement' }
type Dispatch = (action: Action) => void
type State = { count: number }
type CountProviderProps = { children: React.ReactNode }

const CountStateContext = React.createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined)

function countReducer(state: State, action: Action) {
    switch (action.type) {
        case 'increment': {
            return { count: state.count + 1 }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function CountProvider({ children }: CountProviderProps) {
    const [state, dispatch] = React.useReducer(countReducer, { count: 0 })
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = { state, dispatch }
    return (
        <CountStateContext.Provider value={value}>
            {children}
        </CountStateContext.Provider>
    )
}

function useCount() {
    const context = React.useContext(CountStateContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export default Login
