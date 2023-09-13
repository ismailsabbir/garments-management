import React, { useContext } from "react";
import { servcontext } from "../../../App";
import SingleBlog from "../../HomeComponents/SingleBlog/SingleBlog";

const AllBlog = () => {
  const { blogs } = useContext(servcontext);
  return (
    <div className="home-blog-con">
      <div className="homeservices-top" id="home-project-top">
        <h5>BLOG</h5>
        <h1>Blog & Articles</h1>
        <p>
          Nulla in nibh at leo faucibus molestie eget nec velit. Phasellus vel
          felis vel orci iaculis tempor tristique sagittis urna. Phasellus ac
          ante in lacus tempor egestas.
        </p>
      </div>
      <div className="home-servicess row">
        {blogs?.map((blog) => (
          <SingleBlog blog={blog} key={blog?._id}></SingleBlog>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
