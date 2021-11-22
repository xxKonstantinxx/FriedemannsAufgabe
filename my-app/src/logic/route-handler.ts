export function routeHandler() {
      if (sessionStorage.getItem("token") === null) {
        window.location.replace("/login");
      } else {
        window.location.replace("/home");
      }
    };