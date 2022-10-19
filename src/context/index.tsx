import React, { FC, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'comps/theme'

const AppProviders = ({
    theme,
    children,
}: {
    theme: 'light' | 'dark'
    children: ReactNode
}) => (
    <Router>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    </Router>
)

export { AppProviders }
