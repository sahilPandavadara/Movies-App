import Banner from "./Movies/Banner";
import Footer from "./Movies/Footer";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>

      <section className="mt-[3px]">
        <Banner />
        <MoviesContainerPage />
        <Footer/>
      </section>
    </>
  );
};

export default Home;
