import "@styles/globals.css";
import Nav from "@components/Nav";

// next-auth session provider

import Provider from "@components/Provider";

// Metadata

export const metadata = {
  title: {
    template: "%s | Promptgenius",
    default: "Promptgenius",
  },
  description:
    "Discover & Share AI Prompts | create your personal list of AI prompts | Search for prompts of all categories to ask to your ChatGPT",

  generator: "vanesascode",
  applicationName: "Prompgenius",
  referrer: "origin-when-cross-origin",
  keywords: [
    "ai",
    "prompts",
    "vanesascode",
    "promptgenius",
    "ai prompts",
    "developer",
    "nextjs",
    "fullstack",
    "chatgpt",
  ],
  authors: [
    { name: "vanesascode" },
    { name: "Vanesa Juarez", url: "https://vanesascode-portfolio.vercel.app/" },
  ],
  creator: "vanesascode",
  publisher: "vanesascode",

  openGraph: {
    title: "Promptgenius | AI Prompts",
    description:
      "Discover & Share AI Prompts | create your personal list of AI prompts | Search for prompts of all categories to ask to your ChatGPT",
    siteName: "Promptgenius",
    url: "https://promptgenius-chi.vercel.app/",
    images: {
      url: "https://promptgenius-chi.vercel.app/assets/images/opengraph-image.jpg",
    },
    locale: "en_EU",
    type: "website",
  },

  metadataBase: new URL("https://promptgenius-chi.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    images: "/images/cover-promptgenius.jpg",
  },
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <meta
      name="image"
      property="og:image"
      content="https://promptgenius-chi.vercel.app/assets/images/cover-promptgenius.jpg"
    ></meta>
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
