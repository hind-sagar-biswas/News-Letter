const Option = () => {
  return (
    <div className="mx-6 md:mx-24 mt-3">
      <h3 className="mb-2 md:mb-10 w-full md:w-1/2 font-bold text-3xl bg-linear-to-r from-[#D90000] to-[#D800EB] bg-clip-text text-transparen text-transparent">
        Why OpT. National is a Smart Choice ?
      </h3>
      <div className="flex flex-wrap md:flex-nowrap gap-5 justify-evenly lg:justify-between items-center">
      {cardData.map((content, index) => (
          <div
            key={index}
            className="h-40 w-36 lg:h-52 lg:w-[12.9rem] bg-[#474B5B66] border rounded-2xl font-bold text-md flex justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:border-[#D800EB] hover:text-emerald-400 cursor-pointer"
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Option;

const cardData = [
  <>
    Verified global opportunities, <br /> weekly
  </>,
  <>
    Saves time no <br /> more scattered <br /> searching
  </>,
  <>
    Keeps you <br /> informed and <br /> deadline-ready
  </>,
  <>Affordable for every student and professional</>,
];
