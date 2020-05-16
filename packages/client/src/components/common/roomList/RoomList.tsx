import React from 'react';
import * as vm from '@bgames/shared/vm';
import { Table } from 'react-bootstrap';
import RoomItem from './RoomItem';

interface RoomListParams {
  rooms: vm.Room[];
}

const RoomList: React.FC<RoomListParams> = ({ rooms }) => (
  <Table striped hover>
    <thead>
      <th>Name</th>
      <th>Author</th>
    </thead>
    <tbody>
      {rooms.map((room) => <RoomItem room={room} />)}
    </tbody>
  </Table>
);

export default RoomList;
