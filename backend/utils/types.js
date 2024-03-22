const z = require('zod')

const UserType = z.object({
    username: z.string(),
    email: z.string().email(),
    password = z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
})

const SignInType = UserType.pick({
    email: true,
    password: true
});


module.exports = {UserType, SignInType}