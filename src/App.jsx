
import React from "react";
import Discover from "./Discover";
import Trending from './Trending'
import Popular from "./Popular";
import Navbar from "./Navbar";

const App = () => {
 

  return (
    <div>
      {/* <Navbar/> */}
      {/* <Popular/> */}
      <Trending/>  
      <Discover/>
    </div>
  )
}

export default App;
