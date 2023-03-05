import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
    Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
]

const callbacks = {}

callbacks.signIn = async function signIn(user, account, metadata) {
    if (account.provider === 'github') {    
      console.log("METADATA",metadata);
        const githubUser = {
            id: metadata.id,
            login: metadata.login,
            name: metadata.name,
            avatar: user.image
        }
    
        user.accessToken = await getTokenFromYourAPIServer('github', githubUser)
        return true
    }

    return false;
}

callbacks.jwt = async function jwt(token, user) {
    if (user) {
        token = { accessToken: user.accessToken }
    }

    return token
}

callbacks.session = async function session(session, token) {
    session.accessToken = token.accessToken
    return session
}

const options = {
    providers,
    callbacks
}

export default (req, res) => NextAuth(req, res, options)