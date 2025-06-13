// import { createMiddleware } from "@tanstack/react-start";
// import { auth } from "./auth";
// import { getHeaders } from "@tanstack/react-start/server";

// export const authMiddleware = createMiddleware({ type: "function" }).server(
//   async ({ next }) => {
//     const session = await auth.api.getSession({
//       headers: getHeaders(),
//     });

//     return next({
//       context: {
//         session,
//       },
//     });
//   },
// );
