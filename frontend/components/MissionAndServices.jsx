import OurServices from "./OurServices";

const MissionAndVission = () => {
  return (
    <div>
      <div className="relative z-0 w-screen h-100 md:h-[54vw] my-[30px] bg-[url('/images/happy-diverse-friends-background.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute left-[6vw] flex flex-col items-start sm:pt-12 lg:pt-14 xl:pt-50 max-w-full">
          <h2 className="font-semibold md:font-bold text-2xl xxs:text-3xl  lg:text-7xl bg-linear-to-r from-[#DF00AF] to-[#00B2FF] bg-clip-text text-transparent w-full xl:w-3/4">
            Our mission and vision
          </h2>
          <p className="text-xs md:text-base lg:text-xl md:font-sans mt-3 md:mt-4 lg:mt-7 w-[90vw] lg:pr-8 text-justify">
            At OpT. National, our mission is to empower Bangladeshi students and
            professionals by delivering authentic, curated global opportunities
            for higher education, research, jobs, and internships directly to
            their inboxes. We aim to bridge the information gap by making vital
            resources accessible, affordable, and well-organized. Our vision is
            to become the most trusted digital gateway for academic and career
            advancement in Bangladesh. Through our structured, email-based
            service, we aspire to build an informed generation ready to compete
            globally. We are committed to simplicity, authenticity, and
            impact—helping our subscribers stay updated, take action, and shape
            their futures with confidence.
          </p>
        </div>
      </div>
      <OurServices />
    </div>
  );
};

export default MissionAndVission;
