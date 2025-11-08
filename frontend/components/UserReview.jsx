import UserReviewSlider from "./UserReviewSlider";
import Link from "next/link";
import { getServerAxios } from "@/lib/server-axios";

const UserReview = async () => {
  const axios = await getServerAxios();
  let reviews = null;
  let error = null;

  try {
    const response = await axios.get("/review/");
    reviews = response.data.data.reviews;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    error = "Failed to load reviews";
  }

  return (
    <div className="relative mt-10 xl:mt-24 mb-10 xl:mb-36">
      {/* Background */}
      <div className='absolute -z-10 w-screen h-[80vh] md:h-[66vw] bg-[url("/images/commentsBg.png")] bg-no-repeat bg-contain' />

      {/* Foreground */}
      <div className="w-full">
        <div className="flex justify-between px-4 md:px-12 xl:px-24 py-3 md:pb-3 xl:pb-12 md:mb-7">
          <h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#FF00FB] to-[#FFAE00] w-fit xxs:text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
            What Our Subscribers Say
          </h5>
          <Link href="/review">
            <button className="text-[#FF0000] border-2 border-[#FF0000] h-8 sm:h-12 rounded-3xl text-sm lg:text-2xl bg-linear-to-r from-[#FFFFFF] to-[#999999] font-dmSans font-bold px-2 sm:px-4 cursor-pointer">
              View All
            </button>
          </Link>
        </div>

        <div className="px-3 sm:px-2 lg:px-8 xl:px-20">
          {error ? (
            <p className="pt-10 sm:pt-14 md:pt-12 xl:pt-14 text-red-500 text-3xl md:text-5xl md:h-[80vh]">{error}</p>
          ) : (
            <UserReviewSlider reviews={reviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReview;
