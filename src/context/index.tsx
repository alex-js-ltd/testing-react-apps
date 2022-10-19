import React, { FC, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

const AppProviders: FC<{ children: ReactNode }> = ({ children }) => (
    <Router>{children}</Router>
)

export { AppProviders }
