"use client";

import Link from "next/link";

export default function Rooms() {
  const rooms = [
    {
      id: "0",
    },
  ];

  // if (isError) {
  //   return <div>Error loading rooms</div>;
  // }

  // if (isLoading) {
  //   return <div>Loading rooms...</div>;
  // }
  return (
    <div>
      <h1>Rooms</h1>
      {rooms?.map((room) => (
        <div key={room.id}>
          <h2>RoomId: {room.id}</h2>
          <Link href={`/room/${room.id}`}>Join</Link>
        </div>
      ))}
    </div>
  );
}
