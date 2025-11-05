import React, { useEffect } from "react";
import { fetchUserDetails } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import AllProduct from "./components/AllProduct";
import Navbar from "./components/Navbar";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="">
        <AllProduct />
      </div>
    </div>
  );
}

export default Home;
