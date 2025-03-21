"use client";

import Link from "next/link";
import { useGetRooms } from "../../api/mocks";

export default function Rooms() {
  const { data: rooms, isLoading, isError } = useGetRooms();

  if (isError) {
    return <div>Error loading rooms</div>;
  }

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }
  return (
    <div>
      <h1>Rooms</h1>
      {rooms?.map((room) => (
        <div key={room.id}>
          <h2>RoomId: {room.id}</h2>
          <p>Players: {room.players.length}</p>
          <Link href={`/room/${room.id}`}>Join</Link>
        </div>
      ))}
    </div>
  );
}
