import Axios from 'axios'

interface Data {
    expires: number;
    refresh_token: string;
    token: string;
    token_type: string;
  }

var refresh_token = ""

function refreshSession(){
    Axios.request<Data>({
      method: "post",
      url: "http://127.0.0.1:8888/token_refresh",
      headers: {
        "Content-Type": "application/json",
      },
      data: {refresh_token: refresh_token}
    }).then((res) => {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      sessionStorage.setItem("expires", JSON.stringify(res.data.expires));
      sessionHandler();
      console.log("Token refreshed")
  })}

export function sessionHandler(){
    refresh_token = String(sessionStorage.getItem("refresh_token"));
    setTimeout(refreshSession, 180000)
}