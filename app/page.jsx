import Header from "@/components/header";
import Rooms from "@/components/rooms";
import Map from "@/components/map";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";

export default function Home() {
  return (
    <>
      <Header />
      <Rooms />
      <Map />
      <Gallery />
      <Footer />
    </>
  );
}
