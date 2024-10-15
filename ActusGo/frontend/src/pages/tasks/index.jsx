import React from "react";
import MapComponent from "../../components/MapComponent/MapComponent";

function Tasks({ getAllPosts, users }) {


  return (
    <div className="OverflowHidden h-screen w-full bg-black relative">
      <MapComponent />

    </div>
  );
}

export default Tasks;
