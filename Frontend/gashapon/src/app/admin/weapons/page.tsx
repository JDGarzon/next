"use client"
import Link from 'next/link';
import "../../globals.css"
import Image from 'next/image';

const UsersList = () => {

  const weapons = [
    { id: 1,element:"CRYO", name: 'Shenhe', rarity:"5", img:"urllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllargalssksksksksksksk"},
    { id: 2,element:"CRYO", name: 'Shenhe', rarity:"5", img:"c"},
    { id: 3,element:"CRYO", name: 'Shenhe', rarity:"5", img:"c"},
  ];

  const handleDelete =  async(id:number)=>{
    console.log("delete")
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
              <Link href={`/admin/weapons/${element.id}/edit`} className="table-btn"> 
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
