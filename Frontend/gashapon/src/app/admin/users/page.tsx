"use client"
import Link from 'next/link';
import "../../globals.css"
import Image from 'next/image';

const UsersList = () => {

  const users = [
    { id: 1,email:"c", name: 'User 1' },
    { id: 2,email:"c", name: 'User 2' },
    { id: 3,email:"c", name: 'User 3' },

  ];

  const handleDelete =  async(id:number)=>{
    console.log("delete")
  }

  return (
    
    <div className={"container-table"}>
     <h1>Users List</h1>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Users</th>
            <th>Email</th>
            <th className='tabletd'><Link href={`/admin`}>
                    <Image src={"/icons/return.png"} alt={"Ir"} width={40} height={40} />
                </Link>
                <Link href={`/admin/users/new`}>
                    <Image src={"/icons/plus.png"} alt={"Ir"} width={40} height={40} />
                </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              
              <td className='tabletd'>
                <Link href={`/admin/users/${user.id}`}>
                    <Image src={"/icons/book.png"} alt={"Ir"} width={40} height={40} />
                </Link>

                <Link href={`/admin/users/${user.id}/edit`}>
                    <Image src={"/icons/edit.png"} alt={"Ir"} width={40} height={40}/>
                </Link>
                <Image src={"/icons/trash.png"} alt={"Ir"} width={40} height={40} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
