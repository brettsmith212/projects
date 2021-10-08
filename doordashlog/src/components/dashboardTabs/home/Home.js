import "./Home.css";
import React from "react";
import FeaturedInfo from "../../featuredInfo/FeaturedInfo";
import AddDash from "../../featuredInfo/AddDash";

function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <AddDash />
    </div>
  );
}

export default Home;
