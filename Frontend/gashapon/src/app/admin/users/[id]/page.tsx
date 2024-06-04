"use client"
import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Image from 'next/image';
import Link from 'next/link';

export default function UpdateUser() {
  const [formData, setFormData] = useState({
    _id:'',
    email: '',
    username: '',
    level:"",
    rol: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const search = useSearchParams ();
  const { data: session, status } = useSession();

  const id=search.get("id")  

  const router = useRouter();

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchCharacters();
    }
  }, [session, status]);

  const fetchCharacters = async () => {
    try {

      console.log(id)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
      console.log(resD)
      setFormData(resD);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    try {
      const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body:JSON.stringify({
          "level":formData.level,
          "rol":formData.rol
          }),
      });

      const responseAPI = await res2.json();

      if (!res2.ok) {
        setErrors(responseAPI.message);
        return;
      }
  
      router.push('/admin/users');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (

    <div className="admin-container">
      <div className="admin-dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <Link href={`/sign/login`} className="sign-out-btn">Sign out</Link>
      </div>
      <div className="table-container">
        <div className="table-header">
          <h2> Nuevo Personaje</h2>
          <div>
            <Link href={`/admin/users`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
          </div>
        </div>
        <form className="character-form" onSubmit={handleSubmit}>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="name">Nombre de usuario:</label>
            <input className='character-form-input' placeholder='Ingrese el nombre del personaje' type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="element">Email:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="email" id="email" name="email"  value={formData.email} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="rarity">Nivel:</label>
            <input className='character-form-input' placeholder='Nivel del usuario' type="number" id="level" name="level" value={formData.level} onChange={handleChange} required min="1" max="5"/>
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="element">Rol:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="text" id="rol" name="rol"  value={formData.rol} onChange={handleChange} required />
          </div>
          <button className='submit-btn' type="submit">Crear Personaje</button>
        </form>
      </div>
    </div>
  );
}
