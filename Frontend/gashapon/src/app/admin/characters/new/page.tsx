"use client"
import { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';

export default function CreateCharacter() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    element: '',
    rarity: 0,
    img: '',
    weapon:""
  });

  useEffect(() => {
    if (session && status === "authenticated") {

    }
  }, [session, status]);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log({
        "name":formData.name,
        "element":formData.element,
        "weapon":formData.weapon,
        "rarity":formData.rarity,
        "constellation":0,
        "level":90,
        "img":formData.img
        })

      const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/character`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        
        body:JSON.stringify({
          "constellation":0,
          "element":formData.element,
          "img":formData.img,
          "level":90,
          "name":formData.name,
          "rarity":Number(formData.rarity),
          "weapon":formData.weapon
          }),
      });

      const re=await res2.json

      console.log(re)

      router.push('/admin/characters');
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
            <Link href={`/admin/characters`} className="table-header-btn">
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
            <label className='character-form-label' htmlFor="element">Elemento:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="text" id="element" name="element"  value={formData.element} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="weapon">Arma:</label>
            <input className='character-form-input' placeholder='Ingrese el elemento del personaje' type="text" id="weapon" name="weapon"  value={formData.weapon} onChange={handleChange} required />
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
      </div>
    </div>
    /*
    <div>
      <h1>Crear Personaje</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="element">Elemento:</label>
          <input type="text" id="element" name="element" value={formData.element} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="rarity">Rareza:</label>
          <input type="number" id="rarity" name="rarity" value={formData.rarity} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="img">URL de la imagen:</label>
          <input type="url" id="img" name="img" value={formData.img} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Personaje</button>
      </form>
    </div>
    */
  );
}
