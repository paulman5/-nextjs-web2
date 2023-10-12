import express from "express"



rwaRouter.get("/login/profiling", (req, res, next) => {
    res.oidc.login({
      returnTo: baseURL,
      authorizationParams: {
        connection: PROFILING_CONNECTION_NAME,
      },
    })
  })
  