import React, { useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
function Home() {
  const socket = useSocket();

  //   useEffect(() => {
  //     if (socket) {
  //       socket.emit("join-server", {
  //         roomId: "123",
  //         emailID: "some@gmail.com",
  //       });
  //     }
  //   }, [socket]);

  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();

  function handleRoomJoin() {
    socket.emit("join-server", {
      roomId: roomId,
      emailID: email,
    });
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-black/70">
      <div className="flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full overflow-hidden bg-white">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none"
        />
        <div className="h-6 border-l border-gray-400"></div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none"
        />
        <div className="h-6 border-l border-gray-400"></div>
        <button className="px-5 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        onClick={handleRoomJoin}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Home;
