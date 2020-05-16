import React from 'react';
import * as vm from '@bgames/shared/vm';

interface RoomParams {
  room: vm.Room;
}

const RoomItem: React.FC<RoomParams> = ({ room }) => (
  <tr key={room.id}>
    <td>{room.name}</td>
    <td>{room.author}</td>
  </tr>
);

export default RoomItem;
