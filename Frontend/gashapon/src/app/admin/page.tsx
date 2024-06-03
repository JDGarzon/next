import "../globals.css"
import Image from 'next/image';

import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className={"container-table"}>
      <h1>Admin Dashboard</h1>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Elements</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Users</td>
            <td>
              <Link href="/admin/users">
              <Image src={"/icons/book.png"} alt={"Ir"} width={20} height={20} className="characterImage" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>Characters</td>
            <td>
              <Link href="/admin/characters">
              <Image src={"/icons/book.png"} alt={"Ir"} width={20} height={20} className="characterImage" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>Weapons</td>
            <td>
              <Link href="/admin/weapons">
              <Image src={"/icons/book.png"} alt={"Ir"} width={20} height={20} className="characterImage" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
