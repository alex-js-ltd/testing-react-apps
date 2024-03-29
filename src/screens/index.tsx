import Counter from 'comps/counter'
import { Login as LoginComp } from 'comps/login'
import LoginSubmission from 'comps/login-submission'
import { ThemeProvider, useTheme, Theme } from 'comps/theme'
import { EasyButton as EasyButtonComp } from 'comps/easy-button'

type Props = { email: string; password: string; returnSecureToken: true }

const onSubmit = ({ email, password, returnSecureToken }: Props) =>
    console.log(email, password, returnSecureToken)

const Login = () => <LoginComp onSubmit={onSubmit} />

const EasyButton = () => (
    <>
        <h1>Hit the easy button!</h1>
        <hr />
        <EasyButtonComp onClick={() => alert('that was easy')}>
            Easy!
        </EasyButtonComp>

        <hr />
        <ThemeToggler />
    </>
)

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme()
    return (
        <button
            onClick={() =>
                setTheme((t: Theme) => (t === 'dark' ? 'light' : 'dark'))
            }
        >
            Toggle theme: {theme}
        </button>
    )
}

export { Counter, Login, LoginSubmission, EasyButton }
