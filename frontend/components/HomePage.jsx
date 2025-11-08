import Image from "next/image";
import BlurCircle from "./helper/BlurCircle";
import Option from "./Option";

const HomePage = () => {
  return (
    <>
    <div className="relative w-screen flex flex-col">
      <div className="w-full h-16 md:h-36">
        <div className="flex justify-center w-full items-center absolute  -top-16">
          <Image
            src="/images/landingLogo.png"
            alt="homepage logo"
            width={600}
            height={300}
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row px-6">
        <div className="w-full lg:w-[60vw]  ml-1 md:ml-20">
          <div className="flex flex-col xl:flex-row w-full mb-6">
            <h1 className="text-3xl md:text-6xl w-full xl:w-1/2 font-semibold bg-linear-to-b from-[#BF34CC] to-[#4015FF] bg-clip-text text-transparent">
              THE ALL IN ONE OPPORTUNITY <br /> HUB
            </h1>
            {/* <div className="grow flex justify-start items-end">
              <button className=" flex items-center gap-2 mt-5 bg-linear-to-b from-[#292F6E] to-[#B400CF] rounded-2xl px-2 py-1.5 border border-[#F6E8E8] shadow-[0px_4px_43.7px_-1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 font-roboto font-semibold cursor-pointer">
                <LogIn className="w-5 h-5" />
                LOGIN
              </button>
            </div> */}
          </div>
          <h2 className="w-[95%] md:w-[80%] text-justify">
            We are Bangladesh’s first dedicated <span className="text-[#BA43FF]">email newsletter</span> agency focused
            on delivering verified, timely opportunities for higher studies,
            research, scholarships, internships, and international jobs. Our
            mission is to bridge the gap between ambition and access by bringing
            global prospects right to your inbox. Tailored for students and
            young professionals, we ensure no opportunity is missed. With
            flexible subscription plans and a curated blog on career guidance,
            OPT. National is your trusted partner in shaping a global future —
            affordably, reliably, and efficiently.
          </h2>
        </div>
        <div className="md:ml-20 lg:ml-6 mt-3 md:mt-4 lg:mt-0 z-0">
          <Image
            src="/images/homeImage.png"
            alt="home page image"
            height={400}
            width={400}
          />
        </div>
      </div>
      <BlurCircle top="top-84" left="left-[85%]" opacity="opacity-70" />
    </div>
    <Option />
    </>
  );
};

export default HomePage;
