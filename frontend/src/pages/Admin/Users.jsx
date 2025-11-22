import { useEffect, useState } from "react";
import { getUsers, blockUser, deleteUser } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";

export default function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);

  const loadUsers = () =>
    getUsers().then((res) => setUsers(res.data.data.users));

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-gray-100">
              <td className="p-3">{u.fullName}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 flex gap-3 justify-center">

                <button
                  onClick={() => blockUser(u._id).then(loadUsers)}
                  className={`px-3 py-1 rounded text-white ${
                    u.isBlocked ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>

                <button
                  onClick={() => deleteUser(u._id).then(loadUsers)}
                  className="px-3 py-1 rounded bg-gray-700 text-white"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
