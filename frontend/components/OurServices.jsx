import BlurCircle from "./helper/BlurCircle";

const OurServices = () => {
    return (
      <div className="relative z-0 -mt-20 sm:-mt-12 lg:-mt-12 xl:-mt-60 w-screen h-100 md:h-[76vw] bg-[url('/images/serviceDescription.png')] bg-no-repeat bg-contain">
        <BlurCircle left="-left-30" className="hidden md:block" opacity="opacity-70" height="h-[400px]" width="w-[400px]" />
        <div className="absolute left-[6vw] -top-16 md:top-0 lg:-top-16 xl:top-0 flex flex-col items-start max-w-full">
        <h4 className="text-lg xxs:text-2xl lg:text-4xl xl:text-6xl font-bold lg:w-[75vw] xl:mt-10 bg-linear-to-r from-[#FF8800] to-[#B700FF] bg-clip-text text-transparent">
            Our Deliverables – What You’will Receive in Every Issue
          </h4>
          <p className="text-xs md:text-base lg:text-lg md:font-sans mt-1 xl:mt-4 lg:mt-7 w-[90vw] lg:pr-8 text-justify">At OpT. National, we deliver well-organized, purpose-driven newsletters packed with curated opportunities and actionable resources. Each email is designed to inform, guide, and empower.</p>
        </div>
      </div>
    );
  }
  
  export default OurServices;
  