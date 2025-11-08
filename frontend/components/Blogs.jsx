import BlogSlider from "./BlogSlider";
import Link from "next/link";
import { getServerAxios } from "@/lib/server-axios";

const Blogs = async () => {
  const axios = await getServerAxios();
  let blogs = null;
  let error = null;

  try {
    const response = await axios.get("/blog");
    blogs = response.data.data.blogs;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    error = "Failed to load blogs";
  }

  return (
    <div className="relative w-full mt-10">
      {/* Background Image Layer */}
      <div className='absolute inset-0 -z-10 w-screen h-[80vh] md:h-[66vw] bg-[url("/images/blogBg.png")] bg-no-repeat bg-contain' />

      {/* Foreground Content */}
      <div className="w-full relative z-10">
        <div className="flex justify-between px-4 md:px-14 lg:px-24 py-3 md:pb-12 md:mb-7">
          <h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#FF00FB] to-[#FFAE00] w-fit lg:h-[1.2em] text-sm sm:text-xl md:text-3xl lg:text-5xl font-bold">
            Our Blogs: Your Guide to Growth
          </h5>
          <Link href="/blogs">
            <button className="text-[#FF0000] border-2 border-[#FF0000] h-8 sm:h-12 rounded-3xl text-sm lg:text-2xl bg-linear-to-r from-[#FFFFFF] to-[#999999] font-dmSans font-bold px-2 sm:px-4 cursor-pointer">
              View All
            </button>
          </Link>
        </div>
        <div className="px-6 md:px-3 lg:px-10 xl:px-20">
          {error ? (
            <p className="text-red-500 text-center text-5xl md:h-[80vh]">{error}</p>
          ) : (
            <BlogSlider blogs={blogs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
