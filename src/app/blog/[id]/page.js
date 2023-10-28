"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import classes from "./blog.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete, AiFillLike, AiOutlineLike } from "react-icons/ai";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "timeago.js";
import { useRouter } from "next/navigation";
import Comment from "@/components/comment/Comment";
import ice from "../../../../../Blog/blog-app/public/ice-cream.jpg";

const BlogDetails = (ctx) => {
  const [blogDetails, setBlogDetails] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();
  const id = ctx?.params?.id;

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/comment/${id}`, {
        cache: "no-store",
      });
      const comments = await res.json();

      setComments(comments);
    }
    fetchComments();
  }, [session]);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        cache: "no-store",
      });
      const blog = await res.json();

      setBlogDetails(blog);
      setIsLiked(blog?.likes?.includes(session?.user?._id));
      setBlogLikes(blog?.likes?.length || 0);
    }
    session && fetchBlog();
  }, [session]);

  const handleDelete = async () => {
    try {
      const confirmModal = confirm(
        "Are you sure you want to delete your blog?"
      );

      if (confirmModal) {
        const res = await fetch(`/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "DELETE",
        });

        if (res.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blog/${id}/like`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
      });

      if (res.ok) {
        if (isLiked) {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev - 1);
        } else {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    if (commentText?.length < 2) {
      toast.error("Comment must be at least 2 characters long");
      return;
    }

    try {
      const res = await fetch("/api/comment", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          blogId: ctx.params.id,
          authorId: session?.user?._id,
          text: commentText,
        }),
      });

      const newComment = await res.json();

      setComments((prev) => {
        return [newComment, ...prev];
      });

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Image
          src={blogDetails?.imageUrl}
          width="500"
          height="500"
          alt="blog_img"
        />
        <div className={classes.row}>
          <h3 className={classes.title}>{blogDetails?.title}</h3>
          {blogDetails?.authorId?._id.toString() ===
          session?.user?._id.toString() ? (
            <div className={classes.controls}>
              <Link className={classes.editButton} href={`/blog/edit/${id}`}>
                Edit <BsFillPencilFill />
              </Link>
              <button onClick={handleDelete} className={classes.deleteButton}>
                Delete
                <AiFillDelete />
              </button>
            </div>
          ) : (
            <div className={classes.author}>
              Author: <span>{blogDetails?.authorId}</span>
            </div>
          )}
        </div>
        <div className={classes.row}>
          <div className={classes.category}>
            Category:
            <span>{blogDetails?.category}</span>
          </div>
          <div className={classes.right}>
            {blogLikes}{" "}
            {isLiked ? (
              <AiFillLike size={20} onClick={handleLike} />
            ) : (
              <AiOutlineLike size={20} onClick={handleLike} />
            )}
          </div>
        </div>
        <div className={classes.row}>
          <p>{blogDetails?.desc}</p>
          <span>
            Posted: <span>{format(blogDetails?.createdAt)}</span>
          </span>
        </div>
        <div className={classes.commentSection}>
          <div className={classes.commentInput}>
            <Image src={ice} width="45" height="45" alt="" />
            <input
              value={commentText}
              type="text"
              placeholder="Type message..."
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleComment}>Post</button>
          </div>
          <div className={classes.comments}>
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  setComments={setComments}
                />
              ))
            ) : (
              <h4 className={classes.noComments}>No comments.</h4>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogDetails;
