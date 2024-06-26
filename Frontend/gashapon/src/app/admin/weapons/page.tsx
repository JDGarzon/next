"use client"
import Link from 'next/link';
import "../../globals.css"
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const UsersList = () => {
  const [weapons, setWeapons] = useState([
    {
      "name":"",
      "rarity":0,
      "element":"",
      "img":"",
      "_id":""

    }
  ])
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchWeapons=async ()=>{
      try {
        // Simula una llamada a una API
        console.log(session?.user?.username)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/weapon`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
        });
        const resD = await res.json();
        setWeapons(resD);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }
    if (session && status === "authenticated") {
      fetchWeapons();
    }
  }, [session, status,weapons]);

  

  
  const handleDelete =  async(id:string)=>{
    console.log(id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/weapon/${id}`, {
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
          <h2>Armas</h2>
          <div>
            <Link href={`/admin`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
            <Link href={`/admin/weapons/new`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/plus.png"} alt={"Plus Icon"} width={40} height={40} />
              <p>Nuevo</p>
            </Link>
          </div>
        </div>
        {weapons.map((element, index) => (
          <div key={index} className="table-nonuser-element">
            <h3>{element.name}</h3>
            <h3>{element.element}</h3>
            <h3>{element.rarity}</h3>
            <h3 className='last-text'>{element.img}</h3>
            <div className="table-btns">
              <Link href={`/admin/weapons/[id]?id=${element._id}`} className="table-btn"> 
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
