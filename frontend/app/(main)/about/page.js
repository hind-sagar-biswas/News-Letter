import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="relative text-white py-12">

      <div className="absolute -top-24 left-0 -z-50 w-[100vw] h-[80vh] md:h-[66vw] bg-[url('/images/aboutpagebg1.png')] bg-no-repeat bg-contain" />
      <div className="absolute top-[50vh] -z-40 w-[120vw] h-full  md:h-[66vw] bg-[url('/images/aboutpagebg2.png')] bg-no-repeat bg-contain" />

      <div className="w-full after:content-[''] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:w-3/5 after:block after:mx-auto after:mt-12">
        <h2 className="text-4xl sm:text-5xl font-bold w-fit bg-gradient-to-r from-[#FF007B] to-[#FB00FF] bg-clip-text text-transparent mb-6 px-4 sm:px-14 lg:px-28">
          About Us
        </h2>

        <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-28 mx-auto">
          <div className="w-full lg:w-3/5">
            <p className="text-lg text-white mb-6 text-justify">
              At <span className="font-bold text-[#FF0000]">OpT. National</span>{" "}
              – Opportunity Transport, we’re more than just a newsletter agency
              — we’re a mission-driven initiative built to bridge the gap
              between ambition and opportunity for students and young
              professionals across Bangladesh.
            </p>

            <p className="text-white mb-6 text-justify">
              This agency is founded and led by Arnab Samadder, an undergraduate
              student of Agriculture at Patuakhali Science and Technology
              University. With a deep understanding of the challenges faced by
              students in accessing authentic information about higher studies,
              research programs, and international career opportunities, Arnab
              envisioned a platform that could transport real, curated, and
              personalized opportunities straight to the inbox of deserving
              individuals. His involvement in multiple educational initiatives,
              student organizations, and field research projects allows him to
              deeply relate to the needs of the youth.
            </p>

            <p className="text-white mb-6 text-justify">
              Joining him is Nafis Uddin, his closest collaborator and partner
              in all major projects. Nafis is also an undergraduate student of
              Agriculture at PSTU and has worked side by side with Arnab on a
              wide range of academic, organizational, and entrepreneurial
              ventures. His strengths lie in system management, backend
              execution, and strategic development. Nafis brings structure and
              reliability to every step of this initiative.
            </p>

            <p className="text-white mb-12 text-justify">
              Together, we’ve built OpT. National as a professional,
              student-powered platform. We combine insight, experience, and
              empathy to ensure every subscriber receives relevant, valuable
              guidance in a personalized and reliable format.
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/5 gap-8 lg:pl-8">
            <div className="flex flex-col items-center self-start">
              <div className="flex">
                <Image
                  src="/images/arnab.png"
                  alt="Arnab Samadder"
                  width={200}
                  height={240}
                  className="rounded-lg border-4 border-white shadow-md"
                />
                <div className="flex flex-col justify-center items-center">
                  <h3 className="mt-4 text-2xl font-bold text-white">
                    ARNAB SAMADDER
                  </h3>
                  <p className="text-center text-white mt-2">
                    B.Sc. in Agriculture,
                    <br />
                    Patuakhali Science and Technology University
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center self-end">
              <div className="flex">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="mt-4 text-2xl font-bold text-white text-center">
                    MD. NAFIS UDDIN
                  </h3>
                  <p className="text-center text-white mt-2">
                    B.Sc. in Agriculture,
                    <br />
                    Patuakhali Science and Technology University
                  </p>
                </div>
                <Image
                  src="/images/nafis.png"
                  alt="Nafis Uddin"
                  width={200}
                  height={240}
                  className="rounded-lg border-4 border-white shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 lg:flex-row pt-5 lg:pt-24">
          <Image
            src="/images/team1.png"
            alt="Team Work"
            width={600}
            height={400}
            className="rounded-xl shadow-md"
          />
          <div className="text-center w-fit px-0 lg:px-4 text-2xl sm:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            We are not just building a newsletter.
            <br />
            We are building a bridge between ambition and achievement.
          </div>
          <Image
            src="/images/team2.png"
            alt="Team Bonding"
            width={600}
            height={400}
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
