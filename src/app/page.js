import React from "react";
import classes from "./page.module.css";
import Card from "@/components/blogCard/Card";

export async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <div className={classes.container}>
      {blogs?.length > 0 && <h2>BlogsWebApp</h2>}
      <div className={classes.section}>
        {blogs?.length > 0 ? (
          blogs.map((blog) => <Card key={blog._id} blog={blog} />)
        ) : (
          <h3 className={classes.noBlogs}>No blogs are currently in the</h3>
        )}
      </div>
    </div>
  );
}
