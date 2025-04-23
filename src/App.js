import { useState } from 'react';
import './App.css';
import UserForm from './component/UserForm';
import UserList from './component/UserList';

function App() {

  const [selectedUser , setSelectedUser] =useState({})
  console.log(selectedUser,"selectedUserselectedUser")
  return (
    <div style={{padding:20}}>

      <UserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <UserList selectedUser={selectedUser}onEdit={setSelectedUser} />
    
    </div>
  );
}

export default App;
