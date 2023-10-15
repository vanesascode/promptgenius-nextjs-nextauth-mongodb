import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left ">
        <span className="red_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        Ahoy there, fearless explorer! Prepare to set sail on an extraordinary
        voyage through the boundless realm of artificial intelligence.{" "}
        <b>{type} your prompt to get started</b>: what wondrous quest shall we
        embark upon together to kickstart our grand adventure?
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <span className="font-satoshi font-semibold text-base text-primary-gray">
          Your AI prompt
        </span>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here..."
          className="form_textarea"
          required
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-primary-gray">
            Tag{" "}
            <span className="text-normal"> (#coding, #images, #cooking)</span>
          </span>
        </label>

        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#Tag"
          required
          className="form_input"
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-gray rounded-lg text-white"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
