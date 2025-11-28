import BlogCard from "./BlogCard";
import Link from "next/link";

const LatestBlogs = ({ blogs }) => {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <div className="mt-16 pt-12 border-t border-white/20">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-roboto bg-linear-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent mb-4">
                    Latest Blogs
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Discover more insights and stories from our latest articles
                </p>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        _id={blog._id}
                        img={blog.img}
                        title={blog.title}
                        description={blog.description}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link href="/blogs">
                    <button className="inline-block bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition transform hover:scale-105">
                        View All Blogs
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestBlogs;
