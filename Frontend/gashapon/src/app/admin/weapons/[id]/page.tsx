"use client"
import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Image from 'next/image';
import Link from 'next/link';

export default function UpdateCharacter() {
  const [formData, setFormData] = useState({
    "_id":'',
    "name": '',
    "subStats": '',
    "effect": '',
    "type": '',
    "rarity": '',
    "img": ''
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
      // Simula una llamada a una API
      console.log(session?.user?.username)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/weapon/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
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
      console.log({
        "name": formData.name,
        "subStats": formData.subStats,
        "effect": formData.effect,
        "type": formData.type,
        "rarity": Number(formData.rarity),
        "img": formData.img,
        "level":90
        })
      const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/weapon/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body:JSON.stringify({
          "name": formData.name,
          "subStats": formData.subStats,
          "effect": formData.effect,
          "type": formData.type,
          "rarity": Number(formData.rarity),
          "img": formData.img,
          "level":90
          }),
      });

      const responseAPI = await res2.json();

      if (!res2.ok) {
        setErrors(responseAPI.message);
        return;
      }
  
      router.push('/admin/weapons');
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
            <Link href={`/admin/weapons`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
          </div>
        </div>
        <form className="character-form" onSubmit={handleSubmit}>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="name">Nombre:</label>
            <input className='character-form-input' placeholder='Ingrese el nombre del personaje' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="subStat">Substat:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="text" id="subStat" name="subStat"  value={formData.subStats} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="effect">Efecto:</label>
            <input className='character-form-input' placeholder='Ingrese el nombre del personaje' type="text" id="effect" name="effect" value={formData.effect} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="type">Tipo:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="text" id="type" name="type"  value={formData.type} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="rarity">Rareza:</label>
            <input className='character-form-input' placeholder='Ingrese el valor de rareza del personaje (1 a 5)' type="number" id="rarity" name="rarity" value={formData.rarity} onChange={handleChange} required min="1" max="5"/>
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="img">URL de la imagen:</label>
            <input className='character-form-input' placeholder='Ingrese la imagen del personaje' type="url" id="img" name="img" value={formData.img} onChange={handleChange} required />
          </div>
          <button className='submit-btn' type="submit">Crear Personaje</button>
        </form>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
