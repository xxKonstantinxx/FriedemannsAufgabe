import Axios from 'axios'

interface Data {
    expires: number;
    refresh_token: string;
    token: string;
    token_type: string;
  }

var token = ""
var refresh_token = ""
var expires = 0

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
      SessionHandler();
      console.log("Token refreshed")
  })}

export function SessionHandler(){
    token = String(sessionStorage.getItem("token"));
    refresh_token = String(sessionStorage.getItem("refresh_token"));
    expires = Number(sessionStorage.getItem("expires"));
    setTimeout(refreshSession, 180000)
}