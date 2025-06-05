// import React, { useState } from "react";
// import { LikeOutlined, LikeFilled } from "@ant-design/icons";
// const CourseGridView = () => {
//   const posts = [
//     {
//       id: 1,
//       instructor: {
//         name: "John Doe",
//         role: "Senior Developer, Google",
//         profilePicture: "assets/images/thumbs/course-img2.png",
//       },
//       post: {
//         image: "assets/images/thumbs/course-img2.png",
//         title: "Roadmap to Becoming a Full-Stack Developer",
//         description:
//           "Discover the essential steps and resources that helped me master full-stack development and land my dream job.",
//         time: "2 hours ago",
//       },
//       likes: 0,
//       isLiked: false,
//     },
//     {
//       id: 2,
//       instructor: {
//         name: "Jane Smith",
//         role: "Data Scientist, Meta",
//         profilePicture: "assets/images/thumbs/course-img2.png",
//       },
//       post: {
//         image: "assets/images/thumbs/course-img2.png",
//         title: "Mastering Data Structures and Algorithms",
//         description:
//           "The strategies and tools that helped me excel in competitive coding and crack tech interviews.",
//         time: "1 day ago",
//       },
//       likes: 0,
//       isLiked: false,
//     },
//      {
//       id: 1,
//       instructor: {
//         name: "John Doe",
//         role: "Senior Developer, Google",
//         profilePicture: "assets/images/thumbs/course-img2.png",
//       },
//       post: {
//         image: "assets/images/thumbs/course-img2.png",
//         title: "Roadmap to Becoming a Full-Stack Developer",
//         description:
//           "Discover the essential steps and resources that helped me master full-stack development and land my dream job.",
//         time: "2 hours ago",
//       },
//       likes: 0,
//       isLiked: false,
//     },
//     {
//       id: 2,
//       instructor: {
//         name: "Jane Smith",
//         role: "Data Scientist, Meta",
//         profilePicture: "assets/images/thumbs/course-img2.png",
//       },
//       post: {
//         image: "assets/images/thumbs/course-img2.png",
//         title: "Mastering Data Structures and Algorithms",
//         description:
//           "The strategies and tools that helped me excel in competitive coding and crack tech interviews.",
//         time: "1 day ago",
//       },
//       likes:0,
//       isLiked: false,
//     },
//   ];

//   const [postList, setPostList] = useState(posts);

//   const handleLike = (id) => {
//     setPostList((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === id
//           ? {
//               ...post,
//               likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//               isLiked: !post.isLiked,
//             }
//           : post
//       )
//     );
//   };

//   return (
//     <section className="course-grid-view py-120">
//       <div className="container">
//         <div className="flex-between gap-16 flex-wrap mb-40">
//           <span className="text-neutral-500">Showing {postList.length} Results</span>
//         </div>
//         <div className="row gy-4">
//           {postList.map((post) => (
//             <div className="w-100 mb-4" key={post.id}>
//               <div
//                 className="post-card rounded-16 p-12 shadow-md border border-neutral-30"
//                 style={{
//                   backgroundColor: "#F3F9FF",
//                   width: "900px",
//                   margin: "0 auto",
//                   padding: "24px",
//                 }}
//               >
//                 {/* Instructor Information */}
//                 <div className="flex-between mb-16">
//                   <div className="flex-align gap-12">
//                     <img
//                       src={post.instructor.profilePicture}
//                       alt="Instructor"
//                       className="w-48 h-48 object-fit-cover rounded-circle"
//                     />
//                     <div>
//   <h5
//     className="text-md font-semibold"
//     style={{
//       fontWeight: "bold",
//       marginBottom: "4px", // Adjust spacing between lines
//     }}
//   >
//     {post.instructor.name}
//   </h5>
//   <p
//     className="text-sm text-neutral-600"
//     style={{
//       fontWeight: "normal",
//       color: "#888888", // Lighter shade for role
//     }}
//   >
//     {post.instructor.role}
//   </p>
// </div>
//                   </div>
//                   <p className="text-sm text-neutral-500">{post.post.time}</p>
//                 </div>

//                 {/* Post Content */}
//                 <div className="post-content mb-16">
//                   <img
//                     src={post.post.image}
//                     alt="Post Thumbnail"
//                     className="w-full rounded-12 mb-12"
//                   />
//                   <h4 className="text-lg font-semibold mb-8">{post.post.title}</h4>
//                   <p className="text-sm text-neutral-700">{post.post.description}</p>
//                 </div>

//                 {/* Post Footer */}
//                 <div className="post-footer flex-between mt-12">
//                   <button
//                     type="button"
//                     className="flex-align gap-4 text-main-600 text-lg"
//                     onClick={() => handleLike(post.id)}
//                     style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                   >
//                     {post.isLiked ? (
//                       <LikeFilled style={{ color: "#007BFF", fontSize: "24px" }} />
//                     ) : (
//                       <LikeOutlined style={{ color: "#888888", fontSize: "24px" }} />
//                     )}
//                     {post.likes} Likes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default CourseGridView;


import React, { useState, useEffect } from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";

const CourseGridView = () => {
  const [postList, setPostList] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPostList(response.data); // Assuming backend returns an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      const post = postList.find((p) => p.id === id);
      const updatedPost = {
        ...post,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        isLiked: !post.isLiked,
      };

      // Update backend (optional)
      await axios.put(`/api/posts/${id}`, { likes: updatedPost.likes, isLiked: updatedPost.isLiked });

      // Update local state
      setPostList((prevPosts) =>
        prevPosts.map((p) => (p.id === id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <section className="course-grid-view py-120">
      <div className="container">
        <div className="flex-between gap-16 flex-wrap mb-40">
          <span className="text-neutral-500">Showing {postList.length} Results</span>
        </div>
        <div className="row gy-4">
          {postList.map((post) => (
            <div className="w-100 mb-4" key={post.id}>
              <div
                className="post-card rounded-16 p-12 shadow-md border border-neutral-30"
                style={{
                  backgroundColor: "#F3F9FF",
                  width: "900px",
                  margin: "0 auto",
                  padding: "24px",
                }}
              >
                {/* Instructor Information */}
                <div className="flex-between mb-16">
                  <div className="flex-align gap-12">
                    <img
                      src={post.instructor.profilePicture}
                      alt="Instructor"
                      className="w-48 h-48 object-fit-cover rounded-circle"
                    />
                    <div>
                      <h5 className="text-md font-semibold">{post.instructor.name}</h5>
                      <p className="text-sm text-neutral-600">{post.instructor.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500">{post.time}</p>
                </div>

                {/* Post Content */}
                <div className="post-content mb-16">
                  <img
                    src={post.post.image}
                    alt="Post Thumbnail"
                    className="w-full rounded-12 mb-12"
                  />
                  <h4 className="text-lg font-semibold mb-8">{post.post.title}</h4>
                  <p className="text-sm text-neutral-700">{post.post.description}</p>
                </div>

                {/* Post Footer */}
                <div className="post-footer flex-between mt-12">
                  <button
                    type="button"
                    className="flex-align gap-4 text-main-600 text-lg"
                    onClick={() => handleLike(post.id)}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    {post.isLiked ? (
                      <LikeFilled style={{ color: "#007BFF", fontSize: "24px" }} />
                    ) : (
                      <LikeOutlined style={{ color: "#888888", fontSize: "24px" }} />
                    )}
                    {post.likes} Likes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGridView;
