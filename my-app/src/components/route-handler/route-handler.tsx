import React, { useEffect } from "react";

function RouteHandler() {
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      window.location.replace("/login");
    } else {
      window.location.replace("/home");
    }
  });
  return <div></div>;
}

export default RouteHandler;
