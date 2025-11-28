// app/blog/page.tsx
import { getServerAxios } from "@/lib/server-axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const BlogPage = async () => {
  const axios = await getServerAxios();
  let blogs = null;

  try {
    const response = await axios.get("/blog");
    blogs = response.data.data.blogs;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    redirect("/");
  }


  return (
    <div className="relative px-4 sm:px-8 md:px-14 py-10">
      {/* Heading */}
      <div className="flex justify-start items-center gap-10 mb-12 mx-14">
        <Link
          href="/"
          className="absolute z-20 hidden lg:inline-block bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          ← Back
        </Link>

        <h2 className="grow text-center font-roboto font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-linear-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent relative">
          Our Blogs
          <span className="block h-1 w-24 mx-auto mt-2 bg-linear-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] rounded-full"></span>
        </h2>
      </div>

      {/* Blog Cards */}
      <div className="w-full flex justify-center flex-wrap gap-8 md:gap-12 xl:gap-16">
        {blogs?.map((item) => (
          <div
            key={item?._id}
            className="bg-[#00200A4A] border-2 border-white/10 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] w-full max-w-sm sm:w-88 md:w-[24rem] lg:w-104 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative w-full h-[220px] rounded-t-xl overflow-hidden">
              <Image
                src={item?.img || "/images/defauld-blog.jpg"}
                alt="blog image"
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl aspect-4/1"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between items-center text-center p-4">
              <h6 className="text-lg font-semibold font-roboto mb-2 overflow-hidden line-clamp-2">
                {item?.title}
              </h6>
              <p className="text-sm text-gray-200 h-[6em] overflow-hidden line-clamp-4 mb-4 px-2 opacity-60">
                {item?.description}
              </p>

              <Link href={`/blogs/${item?._id}`}>
                <button className="bg-white text-black font-bold px-6 py-1.5 rounded-2xl hover:bg-linear-to-r hover:from-[#FF00FB] hover:via-[#9B00FF] hover:to-[#00D9FF] hover:text-white transition cursor-pointer">
                  READ MORE
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
