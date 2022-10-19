import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Counter, Login, LoginSubmission, EasyButton } from 'screens'

const AppRoutes = () => (
    <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-submission" element={<LoginSubmission />} />
        <Route path="/easy-button" element={<EasyButton />} />
    </Routes>
)

const App = () => {
    return <AppRoutes />
}

export default App
