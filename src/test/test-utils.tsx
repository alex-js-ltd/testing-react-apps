import React, { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { AppProviders } from 'context'
import { Theme } from 'comps/theme'

type Props = {
    theme?: Theme
}

const render = (
    ui: ReactElement,
    { theme = 'light', ...options }: Props = {}
) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <AppProviders theme={theme}>{children}</AppProviders>
    )
    return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
