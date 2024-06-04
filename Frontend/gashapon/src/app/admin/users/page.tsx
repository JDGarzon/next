"use client"
import Link from 'next/link';
import "../../globals.css"
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

const UsersList = () => {
  const { data: session, status } = useSession();
  const[users,setUsers]=useState([{
    "_id":'',
    "email": '',
    "username": '',
    "level":"",
    "rol": ''
  }])


  useEffect(() => {
    if (session && status === "authenticated") {
      fetchUsers();
    }
  }, [session, status,users]);

  const fetchUsers=async ()=>{
    try {
      // Simula una llamada a una API
      console.log(session?.user?.username)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
      setUsers(resD);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  const handleDelete =  async(id:string)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
  }

  return (

    <div className="admin-container">
      <div className="admin-dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <Link href={`/sign/login`} className="sign-out-btn">Sign out</Link>
      </div>
      <div className="table-container">
        <div className="table-header">
          <h2>Usuarios</h2>
          <div>
            <Link href={`/admin`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
            <Link href={`/admin/users/new`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/plus.png"} alt={"Plus Icon"} width={40} height={40} />
              <p>Nuevo</p>
            </Link>
          </div>
        </div>
        {users.map((element, index) => (
          <div key={index} className="table-element">
            <h3 className="table-element-name">{element.username}</h3>
            <h3 className="table-element-name">{element.email}</h3>
            <div className="table-btns">
              <Link href={`/admin/users/[id]?id=${element.username}`} className="table-btn"> 
                <Image className="table-option-btn" src={"/icons/edit.png"} alt={"Edit Icon"} width={40} height={40} />
                <p>Editar</p>
              </Link>
              <button className="table-btn" onClick={()=>{handleDelete(element._id)}}> 
                <Image className="table-option-btn" src={"/icons/trash.png"} alt={"Delete Icon"} width={40} height={40} />
                <p>Borrar</p>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>

    /*
    
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

    */
  );
};

export default UsersList;
