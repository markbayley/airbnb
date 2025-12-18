import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import PhotoGallery from "@/components/PhotoGallery";

export default function Explore() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Head>
        <title>Travel Explorer - AirBnb</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Travel Explorer Section */}
        <section className="py-12 sm:py-16">
          <div className="text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Travel Explorer
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light">
              See the world through others' eyes
            </p>
          </div>

          <div className="mb-16">
            <PhotoGallery />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
