// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appName:         'EllaMD Coding Challenge',
  // backendHost:     'http://emd-challenge-be.herokuapp.com',
  backendHost:     'http://localhost:3000',
  backendApiRoot:  ''
};

environment.backendApiRoot = `${environment.backendHost}/api/v1`;
