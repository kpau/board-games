import React, { useState, useEffect } from 'react';
import * as vm from '@bgames/shared/vm';
import { Jumbotron } from 'react-bootstrap';
import rest from '../../../services/rest';
import RoomList from '../../common/roomList/RoomList';

const roomRest = rest<vm.Room>('room');

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<vm.Room[]>([]);

  useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      const allRooms = await roomRest.getAll();
      setRooms(allRooms);
    };
    fetchRooms();
  }, []);

  return (
    <Jumbotron>
      <h1>Rooms</h1>
      <RoomList rooms={rooms} />
    </Jumbotron>
  );
};

export default Rooms;
