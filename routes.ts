/**
 * Array of public routes.
 * These routes are accessible to all users.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Array of authentication routes.
 * These routes are used for authentication and not accessible to authenticated users.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/signup"];

/**
 * The prefix for API authentication routes.
 * This is used to separate the API Auth routes from the other API routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect route.
 * This is the route that the user will be redirected to after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";


export const adminRoutesPrefix = "/admin";

export const allowedOrigins = ["http://localhost:3000/"];

export const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}