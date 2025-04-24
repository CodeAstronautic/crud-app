import { useState } from 'react';
import './App.css';
import UserList from './component/UserList';

function App() {

  const [selectedUser, setSelectedUser] = useState({})
  return (
    <div style={{ padding: 20 }}>
      <UserList selectedUser={selectedUser} onEdit={setSelectedUser} />

    </div>
  );
}

export default App;
