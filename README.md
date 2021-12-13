# Lnk Shrtnr

![Desktop layout](https://raw.githubusercontent.com/larryschirmer/shortlink-url/main/documentation/desktop-example.png)

This is the frontend for the Lnk Shrtnr application. Built with:

- React
- TypeScript
- Context API/useReducer with Duck Pattern
- Next.js
- Deployed with Vercel

## Installation

This is project is a little unique when it comes to installation. I'm using Font Awesome icons and built in my pro license. Everything should work fine if you remove the font awesome dependency, but if you wish to build as is, you'll need a licence for the font awesome icons and add an ignored env file.

- Clone the repository
- Add ignored env file
  - `.devcontainer/devcontainer.env`
  - Add the following to the file:
    - `FONTAWESOME_NPM_AUTH_TOKEN=`
    - `NEXT_PUBLIC_DOMAIN=http://localhost:1337`
- Launch the dev container using vscode
  - This will place the env vars in the PATH allowing for the `yarn` command to build as expected
- Install dependencies
  - Run `yarn`

## Todo

- [x] Make url slug input full width
- [x] Add copy url + slug button to form
