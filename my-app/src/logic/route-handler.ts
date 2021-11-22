export function routeHandler() {
      if (sessionStorage.getItem("token") === null) {
        window.location.replace("/login")
      }
    };