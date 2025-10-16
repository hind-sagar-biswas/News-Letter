import StarRatings from "@/components/helper/StarRatings";
// import { comments } from "@/data/subscribersComments";
import { getServerAxios } from "@/lib/server-axios";
import Image from "next/image";
import Link from "next/link";

const UserReviewPage = async () => {
  const axios = await getServerAxios();
  let reviews = null;

  try {
    const response = await axios.get("/review/");
    reviews = response.data.data.reviews;
    // console.log("review array", reviews)
  } catch (err) {
    console.error("Error fetching profile:", err);
    redirect("/");
  }

  return (
    <div>
      <div className="flex justify-start items-center gap-10 mb-12 mx-14">
        <Link
          href="/"
          className="absolute z-20 hidden lg:inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          ← Back
        </Link>

        <h2 className="flex-grow text-center font-roboto font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent relative">
          User Reviews
          <span className="block h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] rounded-full"></span>
        </h2>
      </div>

      <div className="w-full flex justify-center flex-wrap gap-8 md:gap-12 xl:gap-16">
        {reviews.map((item, idx) => (
          <div
            key={idx}
            className="px-4 py-6 w-full sm:w-[22rem] md:w-[24rem] lg:w-[26rem] shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative w-full">
              <div className="absolute left-1/2 -translate-x-1/2 -top-9 rounded-full">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden shadow-md">
                  <Image
                    src={item?.user?.img || "/images/userprofile.png"}
                    alt="commenter img"
                    width={70}
                    height={70}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div className="font-dmSans border-2 border-white rounded-2xl bg-[#001D934A] p-4">
                <div className="flex flex-col justify-center items-center w-full overflow-hidden">
                  <h3 className="mt-7 font-bold text-2xl sm:text-3xl md:text-2xl lg:text-3xl h-[1.2em]">
                    {item?.user?.fullName}
                  </h3>
                  <h4 className="text-xs my-0.5 xl:my-1 h-[1.2em]">
                    {item?.user?.profession}
                  </h4>
                  <h6 className="text-sm md:text-xs lg:text-sm h-[1.2em]">
                    {item?.user?.institute}
                  </h6>
                  <StarRatings rating={4} />
                </div>
                <p className="h-64 mb-2 sm:mb-5 overflow-y-scroll text-center hide-scrollbar">
                  {item?.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviewPage;
