import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ _id, img, title, description }) => {
  return (
    <div className="bg-[#8207B34A] border-2 rounded-2xl w-full max-w-sm mx-auto flex flex-col justify-between">
      {/* Image */}
      <div className="w-full relative rounded-t-lg overflow-hidden aspect-4/2">
        <Image
          src={img}
          alt="blog image"
          fill
          className="rounded-t-lg w-full aspect-4/2"
        />
      </div>

      {/* Title */}
      <h6 className="text-xl md:text-2xl lg:text-3xl font-roboto font-semibold px-2 py-3 overflow-y-scroll hide-scrollbar text-center">
        {title}
      </h6>

      {/* Description & Button */}
      <div className="font-roboto text-center flex flex-col items-center justify-between grow">
        <p className="text-sm px-4 h-[6em] overflow-hidden text-ellipsis line-clamp-4">
          {description}
        </p>

        <Link href={`/blogs/${_id}`} className="my-4">
          <button className="bg-white text-black font-bold px-6 py-1 rounded-2xl cursor-pointer">
            READ MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
