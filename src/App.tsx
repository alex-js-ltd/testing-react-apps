import React, { FC } from 'react'
import Login from 'comps/login'

const App: FC = () => {
    return (
        <div>
            <Login onSubmit={() => console.log('onSubmit')} />
        </div>
    )
}

export default App
