import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { AppProviders } from 'context'

const render = (ui, { theme = 'light', ...options } = {}) => {
    const Wrapper = ({ children }) => (
        <AppProviders theme={theme}>{children}</AppProviders>
    )
    return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
