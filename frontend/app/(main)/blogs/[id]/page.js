// app/blogs/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerAxios } from "@/lib/server-axios";
import 'ckeditor5/ckeditor5.css';
import '@/app/ck.css';

const BlogDetails = async ({ params }) => {
  const { id } = await params;
  const axios = await getServerAxios();

  let blog = null;

  try {
    const response = await axios.get(`/blog/${id}`);
    blog = response.data.data.blog;
  } catch (err) {
    console.error("Error fetching blog:", err);
    notFound();
  }

  if (!blog) notFound();

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-block bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          ← Back
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Image
            src={blog?.img || "/images/default-blog.jpg"}
            alt={blog?.title}
            width={800}
            height={500}
            className="rounded-xl shadow-xl object-cover w-full max-h-[600px]"
          />
        </div>
        <div className="hidden lg:block lg:w-1/2" />
      </div>

      {/* Title */}
      <h1 className="mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-roboto bg-linear-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent">
        {blog?.title}
      </h1>

      {/* Description */}
      <div className="mt-6 ck-content">
        <div className="prose lg:prose-xl !max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: blog?.body }} />
      </div>
    </div>
  );
};

export default BlogDetails;
