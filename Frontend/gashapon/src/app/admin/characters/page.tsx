"use client"
import Link from 'next/link';
import "../../globals.css"
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const CharactersList = () => {
  const [characters, setCharacters] = useState([
    {
      _id:'',
      name:'',
      element:'',
      rarity:0,
      img:'',
    }
  ])
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchCharacters();
    }
  }, [session, status]);

  const fetchCharacters = async () => {
    try {
      // Simula una llamada a una API
      console.log(session?.user?.username)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/character`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
      setCharacters(resD);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleDelete =  async(id:number)=>{
    console.log("delete")
  }

  const handleEdit=async(id:String)=>{
    router.push(`/admin/characters/[id]?id=${id}`);
}

  return (

    <div className="admin-container">
      <div className="admin-dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <Link href={`/sign/login`} className="sign-out-btn">Sign out</Link>
      </div>
      <div className="table-container">
        <div className="table-header">
          <h2>Personajes</h2>
          <div>
            <Link href={`/admin`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
            <Link href={`/admin/characters/new`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/plus.png"} alt={"Plus Icon"} width={40} height={40} />
              <p>Nuevo</p>
            </Link>
          </div>
        </div>
        {characters.map((element, index) => (
          <div key={index} className="table-nonuser-element">
            <h3>{element.name}</h3>
            <h3>{element.element}</h3>
            <h3>{element.rarity}</h3>
            <h3 className='last-text'>{element.img}</h3>
            <div className="table-btns">
              <Link href={`/admin/characters/[id]?id=${element._id}`} className="table-btn"> 
                <Image className="table-option-btn" src={"/icons/edit.png"} alt={"Edit Icon"} width={40} height={40} />
                <p>Editar</p>
              </Link>
              <Link href="" className="table-btn"> 
                <Image className="table-option-btn" src={"/icons/trash.png"} alt={"Delete Icon"} width={40} height={40} />
                <p>Borrar</p>
              </Link>
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
                <Link href={`/admin/characters/new`}>
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

export default CharactersList;
