import React, { useEffect } from 'react'
import { Login } from './login'
import Spinner from './spinner'

type Action =
    | { type: 'START' }
    | { type: 'RESOLVE'; responseData: any }
    | { type: 'REJECT'; error: Error }
    | { type: undefined }

type State =
    | {
          status: 'idle' | 'pending' | 'resolved' | 'rejected'
          responseData: any
          errorMessage: any
      }
    | {}

const formSubmissionReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'START': {
            return { status: 'pending', responseData: null, errorMessage: null }
        }
        case 'RESOLVE': {
            return {
                status: 'resolved',
                responseData: action.responseData,
                errorMessage: null,
            }
        }
        case 'REJECT': {
            return {
                status: 'rejected',
                responseData: null,
                errorMessage: action.error.message,
            }
        }
        default:
            throw new Error(`Unsupported type: ${action.type}`)
    }
}

const useFormSubmission = ({
    endpoint,
    data,
}: {
    endpoint: string
    data: any
}) => {
    const [state, dispatch] = React.useReducer(formSubmissionReducer, {
        status: 'idle',
        responseData: null,
        errorMessage: null,
    })

    const fetchBody = data ? JSON.stringify(data) : null

    useEffect(() => {
        if (fetchBody) {
            dispatch({ type: 'START' })
            window
                .fetch(endpoint, {
                    method: 'POST',
                    body: fetchBody,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then(async (response) => {
                    const data = await response.json()

                    if (response.ok) {
                        dispatch({ type: 'RESOLVE', responseData: data })
                    } else {
                        dispatch({ type: 'REJECT', error: data.error })
                    }
                })
        }
    }, [fetchBody, endpoint])

    return state
}

interface FormData {
    email: string
    password: string
    returnSecureToken: boolean
}

const LoginSubmission = () => {
    const [formData, setFormData] = React.useState<FormData | null>(null)
    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        data: formData,
    })

    return (
        <>
            {status === 'resolved' ? (
                <div>
                    Welcome <strong>{responseData.email}</strong>
                </div>
            ) : (
                <Login onSubmit={(data: FormData) => setFormData(data)} />
            )}
            <div style={{ height: 200 }}>
                {status === 'pending' ? <Spinner /> : null}
                {status === 'rejected' ? (
                    <div role="alert" style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default LoginSubmission
