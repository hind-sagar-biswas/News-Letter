import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto min-h-screen">{/* min-h-screen to ensure footer at bottom */}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
