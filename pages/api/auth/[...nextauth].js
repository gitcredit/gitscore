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
      console.log("redirect__");
      console.log("url",url);
      console.log("baseUrl",baseUrl);
      return baseUrl
    },
    async jwt({ token, account }) {
      console.log("JWT_");
      console.log("token_",token);

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("SESSION__");
      console.log("token_",token);
      session.accessToken = token.accessToken;
      return session
    }
  },




async signIn(user) {
  console.log("SIGIN_");
  console.log("user",user);
  return {user: user} // res.data contains whatever received from DB call => fetchUserInfo(credentials.opt)
}
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



//   },

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