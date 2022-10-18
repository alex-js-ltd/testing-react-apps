import React, { ButtonHTMLAttributes } from 'react'
import { useTheme } from './theme'

interface Dark {
    backgroundColor: 'black'
    color: 'white'
}

interface Light {
    color: 'black'
    backgroundColor: 'white'
}

interface Style {
    dark: Dark
    light: Light
}

const styles: Style = {
    dark: {
        backgroundColor: 'black',
        color: 'white',
    },
    light: {
        color: 'black',
        backgroundColor: 'white',
    },
}

const EasyButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { theme } = useTheme()

    return <button style={styles[theme]} {...props} />
}

export default EasyButton
