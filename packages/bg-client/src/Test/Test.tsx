import { useEffect, useState } from "react";
import React from "react";
import io from 'socket.io-client';

interface RestApi {
  rest: string;
}

interface IoData {
  socket: string;
}

const socket = io.connect('http://localhost:4000/');
const eventName = 'io';

function Test() {
  const [api, setApi] = useState<RestApi>({ rest: '' });
  const [sio, setSio] = useState<IoData[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(res => res.json())
      .then(data => setApi(data));
  }, []);

  useEffect(() => {
    socket.on(eventName, (data: IoData) => {
      setSio((oldSio) => [...oldSio, data]);
    });
  }, []);

  const emitIo = () => {
    socket.emit(eventName, sio);
  }

  return (
    <div>
      <h1>My Test Component</h1>
      <div>
        <h3>REST API:</h3>
        <p>{api.rest}</p>
      </div>
      <div>
        <h3>Socket IO:</h3>
        <button onClick={emitIo}>Send</button>
        <ul>{sio.map((s, i) =>
          <li key={i}>{s.socket}</li>
        )}</ul>
      </div>
    </div>
  )
}

export default Test;