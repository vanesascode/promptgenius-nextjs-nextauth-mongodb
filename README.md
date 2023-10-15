# Open source AI prompting tool to discover, create and share creative prompts

Learning to use NextJS. Learning about the server/client components, the app file router (layout, page, dynamic routes, loading, errors), metadata for better SEO.

Also, about data fetching and API endpoints:

- SSR (Server Side Rendering)
- SSG (Static Site Generation)
- ISR (Incremental Static Generation)

## Tools & Notes of Use:

### 🔸 NextJS

First thing was to delete the app folder and create a new one from scratch.

- Then, in the root folder, create a `components`, and a `styles` folder.

- `import Image from "next/image"`:

Next.js provides an optimized Image component that allows you to easily optimize and load images on your website. It provides features like automatic image optimization, lazy loading, and support for responsive images.

It's important to import the image first and add it into the src attribute with `curly brackets`, so it works.

---

### 🔸 Next-auth

GOOGLE AUTHENTIFICATION:

-------- USE CLIENT FILES:

Info [HERE](https://next-auth.js.org/getting-started/example)

- `Provider.jsx` : This component gets the `SessionProvider` from the next-auth/react package to handle the session management.

- We wrap our project with the provider component in the `layout.jsx` file, to expose the session context and be able to use the `useSession` in the `Nav.jsx` component, along with the `signIn` and `signOut` functions.

-------- SERVER: API BACKEND ENDPOINTS:

(Create an `api` folder inside the app folder. Inside, create an `auth` folder. Inside create a folder `[...nextauth]`. Inside, create a file `route.js`, which is the file that will handle our entire authentication process.)

- In the `route.js` file we set up authentication using `Google` as the provider.

- You have to create a project in `https://console.cloud.google.com/` to get the "clientId" and the "clientSecret" passwords, which we hide in a `.env` file we create in the root folder. In the Authorized redirect URIs, we also have to add: http://localhost:3000/api/auth/callback/google
  More info about the Next Auth REST API [HERE](https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider)

  (if Github loads your env file, even though you have it in `gitignore file`, follow these commands:

  ```
  git rm --cached .env
  git add .
  git commit -m "Removed.env"
  git push
  ```

  )

(Create a `utils` folder in the root folder, and inside a file `database.js`)

- in the `database.js` file is a module that connects to a `MongoDB Atlas` database using `Mongoose`(which is an Object Data Modeling (ODM) library for MongoDB and provides a higher-level abstraction for interacting with MongoDB). In this file we also track the connection status of the MongoDB database.

- Then we import the connection to the database to the route.js file.

(Create a folder `models` in the root folder, and inside a file `user.js`)

- In the `user.js` file define a Mongoose `schema` for a `User model` and export it.

The code also `checks if a model with the name "User" already exists` or has to be created. This is because it is not a regular always on always running back-end server. In NextJS the route is only going to be created and running for the time when it is getting called, so we need to make that check. So, if a model named user already exists inthe models object it assigns that existing model to the user variable. This is going to prevent us from redefining the model everytime the route is called (which is every time the connection is established), and ensure that the existing model is reused.

- Then we import the model to the database to the route.js file, and we can finish the session and the signIn functions.

- We need some other environment variables for being able to deploy the project into production later on. For the NEXTAUTH_SECRET one, go [HERE](https://next-auth.js.org/deployment)- (if you choose the `openssl rand -base64 32` command option, you can run it [HERE](https://www.cryptool.org/en/cto/openssl))

- Finally, we can use `useSession` in our `Nav.jsx` file.

---

CREATING PROMPTS

-------- USE CLIENT FILES:

We create a new page.jsx in the `create-promp` folder, which is going to be the page to create prompts.

- In it we have to import the `useSession` from `next-auth` which is going to allow us to know which user is currently logged in.

- Create a form in which a new prompt is created everytime, including the session.user.id. We `post` the prompt into our database using a fetch with url `/api/prompt/new`, for which we have to create an endopoint in our server:

-------- SERVER: API BACKEND ENDPOINTS:

In our API folder, we create another folder called `prompt` and inside another folder called `new`, and inside then a file called `route.js`.

In this file `route.js` we create our API route for the prompts, after we have created a model for the prompts (see in `models` folder). Notice we have to connect the database every time the route gets called.

### 🔸 Bcrypt

---

### 🔸 Mongodb + Mongoose
