import { handleAuth } from "@auth0/nextjs-auth0";

exports.onExecutePostLogin = async (event, api) => {
  const YOUR_AUTH0_DOMAIN =
    event.secrets.YOUR_AUTH0_DOMAIN || event.request.hostname;

  const token = api.redirect.encodeToken({
    secret: event.secrets.MY_REDIRECT_SECRET,
    expiresInSeconds: 60,
    payload: {
      // Custom claims to be added to the token
      email: event.user.email,
      firstName: event.user.firstName,
      lastName: event.user.lastName,
      externalUserId: 1234,
      continue_uri: `https://${YOUR_AUTH0_DOMAIN}/continue`,
    },
  });
  api.redirect.sendUserTo("http://localhost:3000/Signup" , {
    query: { session_token: token }
  });
}

exports.onContinuePostLogin = async (event, api) => {};

export const GET = handleAuth();


 