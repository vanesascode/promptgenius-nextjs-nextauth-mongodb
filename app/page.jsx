import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        your favorite AI prompts
      </span>
    </h1>
    <p className="desc text-center">
      Promptgenius is a web app that allows you to discover,create and share
      your favorite AI prompts.
    </p>

    <Feed />
  </section>
);

export default Home;
