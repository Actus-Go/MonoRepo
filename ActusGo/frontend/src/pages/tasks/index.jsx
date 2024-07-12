import React from "react";
import Header from "../../components/header";
import MapComponent from "../../components/MapComponent/MapComponent";


function Tasks({ getAllPosts}) {
 

  return (
    <div className="OverflowHidden h-screen w-full bg-black relative">
      <Header page="tasks" getAllPosts={getAllPosts} />
      <MapComponent />

    </div>
  );
}

export default Tasks;
