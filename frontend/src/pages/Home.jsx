import Banner from "./Movies/Banner";
import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      {/* <Header /> */}

      <section className="mt-[3px]">
        <Banner />
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
