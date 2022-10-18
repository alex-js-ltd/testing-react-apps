import React, { FC } from 'react'
import Login from 'comps/login'
import LoginSubmission from 'comps/login-submission'
import EasyButton from 'comps/easy-button'

const App: FC = () => {
    return (
        <div>
            <LoginSubmission />
            <EasyButton x={'hello'} />
        </div>
    )
}

export default App
