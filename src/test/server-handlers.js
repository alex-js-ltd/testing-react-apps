import { rest } from 'msw'

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500

const handlers = [
    rest.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        async (req, res, ctx) => {
            if (!req.body.password) {
                return res(
                    ctx.delay(delay),
                    ctx.status(400),
                    ctx.json({ message: 'password required' })
                )
            }
            if (!req.body.email) {
                return res(
                    ctx.delay(delay),
                    ctx.status(400),
                    ctx.json({ message: 'email required' })
                )
            }
            return res(ctx.delay(delay), ctx.json({ email: req.body.email }))
        }
    ),
]

export { handlers }
