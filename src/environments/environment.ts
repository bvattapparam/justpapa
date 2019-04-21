// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //API_URL : "http://localhost:80/asq-api",
  API_URL: "/asq-api",
  login_URL: "/login/",
  logout_URL: '/login/closeinfo',
  login_urlf: '/login/forgotpwd',
  login_urlcu: '/login/createuser',
  justpapa_URL: '/secure'
};
