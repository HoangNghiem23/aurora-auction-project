import { useEffect } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
function useRealtime(callback) {
  const WS_URL = "http://188.166.208.107:8080/websocket";

  const socket = new SockJS(WS_URL);
  const stomp = Stomp.over(socket);
  //   const accountID = localStorage.getItem("accountId");
  useEffect(() => {
    const onConnected = () => {
      stomp.subscribe(`/topic/sendBid`, (message) => {
        console.log(message);
        callback && callback(message);
      });
      stomp.subscribe(`/topic/time`, (message) => {
        console.log(message);
        callback && callback(message);
      });
    };
    stomp.connect({}, onConnected, null);
  }, []);
  return <></>;
}

export default useRealtime;
