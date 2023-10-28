"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import classes from "./edit.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AiOutlineFileImage } from "react-icons/ai";

const Edit = (ctx) => {
  const CLOUD_NAME = "dijpnfuug";
  const UPLOAD_PRESET = "my-blog-app";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Nature");
  const [photo, setPhoto] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const id = ctx.params.id;

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blog/${id}`);

      const blog = await res.json();

      setTitle(blog.title);
      setDesc(blog.desc);
      setCategory(blog.category);
    }
    fetchBlog();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || category === "" || desc === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      let imageUrl = null;
      if (photo) {
        imageUrl = await uploadImage();
      }

      const body = {
        title,
        desc,
        category,
      };

      console.log("blogPhoto", photo);

      if (imageUrl != null) {
        body.imageUrl = imageUrl;
      }
      console.log("title", title, "desc", desc, "category", category);
      const res = await fetch(`/api/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
        body: JSON.stringify({
          title,
          desc,
          category,
        }),
      });

      if (!res.ok) {
        throw new Error("Error has occured");
      }

      const blogEdited = await res.json();
      console.log("edited blog", blogEdited);

      router.push(`/blog/${blogEdited._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={desc}
            placeholder="Description..."
            onChange={(e) => setDesc(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Nature">Nature</option>
            <option value="Mountain">Mountain</option>
            <option value="Ocean">Ocean</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Forest">Forest</option>
          </select>
          <label htmlFor="image">
            Upload Image <AiOutlineFileImage />
          </label>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button className={classes.createBlog}>Edit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;
