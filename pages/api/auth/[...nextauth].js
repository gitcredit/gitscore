import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user }) {

      console.log("async_session___");
      console.log("SESSION",session);
console.log("USER",user);
      session.user.id = user.id
      return session
    },




//     async signIn(user, account, metadata) {



// if (account.provider === 'github') {    
//   console.log("METADATA",metadata);
//     const githubUser = {
//         id: metadata.id,
//         login: metadata.login,
//         name: metadata.name,
//         avatar: user.image
//     }

//     //user.accessToken = await getTokenFromYourAPIServer('github', githubUser)
//     return true
// }

// return false;
//     }



  },

});





/*




    // ...add more providers here

async signIn(user, account, metadata) {
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
  },
 async  jwt(token, user) {
    if (user) {
        token = { accessToken: user.accessToken }
    }

    return token
},
async  session(session, token) {
  session.accessToken = token.accessToken
  return session
}
],


import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github";

const providers = [
  GithubProvider({
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

*/