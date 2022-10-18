// this one doesn't really make sense to render on its own, so don't bother.

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<
    { theme: Theme; setTheme: Function } | undefined
>(undefined)

const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme should be used within a ThemeProvider')
    }
    return context
}

type ThemeProviderProps = { initialTheme: Theme; children: ReactNode }

const ThemeProvider = ({
    initialTheme = 'light',
    children,
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(initialTheme)

    const value = { theme, setTheme }

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export { useTheme, ThemeProvider }
