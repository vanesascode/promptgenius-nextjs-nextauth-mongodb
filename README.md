# Open source AI prompting tool to discover, create and share creative prompts

Learned to use NextJS: about the server/client components, the app file router (layout, page, dynamic routes, loading, errors), the backend (api routes and models in NextJs way), and metadata for better SEO.

![video-promptgenius](https://github.com/vanesascode/vanesascode_portfolio/assets/131259155/aa08e689-8bb5-4ecc-89d9-dd16f8413bd2)

Visit it [HERE](https://promptgenius-chi.vercel.app/)

## Tools & Notes of Process:

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

👉 If you want to go to a specific page when signing out, you must especify it:

```
    onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/"); // Redirect to the dashboard page after signing out
                });
              }}
```

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

- The `database.js` file is a module that connects to a `MongoDB Atlas` database using `Mongoose`(which is an Object Data Modeling (ODM) library for MongoDB and provides a higher-level abstraction for interacting with MongoDB). In this file we also track the connection status of the MongoDB database.

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

RENDERING THE PROMPTS:

We create the `Feed.jsx` component and in there we make a fetch of the prompts in the database. For that we use the URI of the GET endpoint `route.js` we create inside the `prompt` folder inside the `api` folder.

RENDERING THE PROMPTS OF ONLY A USER, IN THEIR PRIVATE PAGE:

We create a new app router page, in the folder `profile`. In this page we fetch the prompts only of a user, and only when the user id of the session exists.

The fetch URI is this: fetch(`/api/users/${session?.user.id}/posts`)

So, our new `route.js` file is going to be in: `api > users > [id] > posts`

Then, in our route.js file we are going to be able to pass `params.id`, through props as `{params}`, that is going to be that user id.

EDITING AND DELETING THE PERSONAL PROMPTS:

In the page of the `profile` app route folder, we create two functions, edit and delete. Of course, we also have the `useSession` imported there so we can pass them the `post` as argument. This page will have a component called `Profile.jsx` which will receive some props or others depending if the user is registered or not, and whether it is their profile or another user's profile. Then, this component renders again the `PromptCard.jsx` component, but this time with the edit and delete props (so you will see that the buttons to edit and delete only appear if the user is logged in).

So that these two actions (edit and delete) work we create the requests (get, patch and delete) to the database through endpoints in our api. So, in the api folder, into the `prompt` folder, we create a dynamic folder `[id]` and inside we create a new `route.js` file in which the endpoints will be.

Since we have this dynamic folder [id], again we pass the `params.id`, through props as `{params}`, that is the user id.

- In the case of the edit process, in the function we just send the user to another page, one we create in the folder `update-prompt`. The route is dynamic, depending on the id of the prompt:

```
 const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
```

In the update-prompt file, we copy the code from the `create-prompt` page and modify it so it is reused for the editing purpose. In here we also need the id of the prompt, so we import `useSearchParams`, which is a hook that lets you read the current URL's query string. Example:

```
import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```

This way we can access a particular prompt. We need to get it first of all, with the GET fetch and a useEffect, so it is loaded once the page `create-prompt` is loaded:

```
const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

```

Once loaded, since it is done in the `Form.jsx` component (this time passing other props for the occasion), when we click the button edit of the form (once we have edited the prompt), the Patch fetch runs:

```
 try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }

```

- In the case of delete process, we put the Delete fetch just inside the function that is in the `profile` app route:

```
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
```

### 🔸 Search Functionality

The search functionality in this project allows users to search for prompts based on prompt content, user, or tag.

- When the user enters a search query in the search input field, the `handleSearchChange` function is triggered. This function sets the search text using the setSearchText function from the useState hook. It also clears the previous search timeout using the clearTimeout function to prevent unnecessary API calls.

- After setting the search text, a `debounce method` is used to delay the execution of the search. The `setSearchTimeout` function from the useState hook sets a new timeout that triggers the search after a delay of 500 milliseconds. During this delay, if the user continues typing, the previous timeout is cleared and a new timeout is set.

- When the search is triggered, the `filterPrompts` function is called. This function creates a `regular expression` with the search text and performs a case-insensitive search on the posts array. It filters the posts array based on whether the search text matches the username of the creator, the tag, or the prompt content.

- The filtered search results are then set using the `setSearchedResults` function from the useState hook. This updates the searchedResults state with the filtered prompts.

- Based on the presence of search text, the Feed component conditionally renders the PromptCardList component. If there is search text, it passes the searchedResults and handleTagClick function as props to PromptCardList. Otherwise, it passes the posts and handleTagClick function.

---

### 🔸 Mongodb + Mongoose

The `database.js` file, inside the `utils`folder, is a module that connects to a `MongoDB Atlas` database using [`Mongoose`](https://mongoosejs.com) (which is an Object Data Modeling (ODM) library for MongoDB and provides a higher-level abstraction for interacting with MongoDB). In this file we also track the connection status of the MongoDB database.

To get the `connection string` you go to `connect` into your cluster, and into `drivers`. We add the password to the string, and then we copy it into the env file (without commas ""!):

```
GOOGLE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGODB_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_URL_INTERNAL=http://localhost:3000/
NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
