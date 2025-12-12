// src/app/dashboard/user-management/page.jsx

import UserList from './userlist';

// This file is the required route entry point. 
// It will automatically be wrapped by your friend's src/app/dashboard/layout.js.
export default function UserManagementPage() {
  return (
    <UserList /> 
  );
}