import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share&nbsp;
      <br className="max-md:hidden" />
      <span className="red_gradient text-center">your favorite AI prompts</span>
    </h1>
    <p className="desc text-center">
      Promptgenius is an open-source AI prompting tool that allows you to
      discover, create and share your favorite prompts.
    </p>

    <Feed />
  </section>
);

export default Home;
