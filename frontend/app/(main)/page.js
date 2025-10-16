import Blogs from "@/components/Blogs";
import HomePage from "@/components/HomePage";
import MissionAndServices from "@/components/MissionAndServices";
import Pricing from "@/components/Pricing";
import UserReview from "@/components/UserReview";
import Test from "@/components/Test"

export default function Home() {
  return (
      <main>
        <HomePage />
        <MissionAndServices />
        <Pricing />
        <UserReview />
        <Blogs />
        {/* <Test /> */}
      </main>
  );
}
