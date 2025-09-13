import React, { useRef, useState } from "react";
import Header from "../components/Header";
import AiAssistantWidget from "../components/AiAssistantWidget";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [orderWidgetOpen, setOrderWidgetOpen] = useState(false);
  const foodRef = useRef(null);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setTimeout(() => {
      if (foodRef.current) {
        const navbarHeight = 340;
        const y =
          foodRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <div>
      <Header
        orderWidgetOpen={orderWidgetOpen}
        setOrderWidgetOpen={setOrderWidgetOpen}
      />
      <ExploreMenu category={category} setCategory={handleCategoryChange} />
      <div ref={foodRef} id="food-display-scroll-point">
        <FoodDisplay category={category} />
      </div>
      <AppDownload />

      {!orderWidgetOpen && <AiAssistantWidget />}
    </div>
  );
};

export default Home;
