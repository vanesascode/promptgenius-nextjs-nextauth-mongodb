"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // copy prompt to clipboard state
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold font-satoshi text-primary-gray">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={18}
            height={18}
            alt="copy_icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-primary-gray">
        {post.prompt}
      </p>

      {/*The function handleTagClick knows to copy the content of the tag because it receives the tagName as a parameter:*/}

      <p
        className="font-inter text-sm text-primary-red cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-end gap-4 border-t border- gray-400 pt-3">
          <p
            className="font-inter text-sm  cursor-pointer text-primary-gray"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer text-primary-gray"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

//The navigator.clipboard.writeText() method is a JavaScript API that allows you to write text to the system clipboard. It is used to programmatically copy text to the clipboard, making it available for the user to paste elsewhere.
