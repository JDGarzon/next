"use client"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import "../../globals.css"
import Image from 'next/image';
import Link from 'next/link';


export default function CreateWeapon() {
  const [formData, setFormData] = useState({
    name: '',
    type:'',
    subStats:'',
    effect:'',
    rarity: '',
    img: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Formulario enviado:', {...formData, level: 90});
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
          <h2>Nueva Arma</h2>
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
            <input className='character-form-input' placeholder='Ingrese el nombre del arma' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="element">Tipo:</label>
            <input className='character-form-input' placeholder='Ingrese el tipo del arma' type="text" id="element" name="element"  value={formData.type} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="substats">Sub Stats:</label>
            <input className='character-form-input' placeholder='Ingrese las estadisticas del arma' type="text" id="substats" name="substats" value={formData.subStats} onChange={handleChange} required min="1" max="5"/>
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="effect">Effect:</label>
            <input className='character-form-input' placeholder='Ingrese el efecto del arma' type="text" id="effect" name="effect" value={formData.effect} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="rarity">Rareza:</label>
            <input className='character-form-input' placeholder='Ingrese el valor de rareza del arma (1 a 5)' type="number" id="rarity" name="rarity" value={formData.rarity} onChange={handleChange} required min="1" max="5"/>
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="img">URL de la imagen:</label>
            <input className='character-form-input' placeholder='Ingrese la imagen del personaje' type="url" id="img" name="img" value={formData.img} onChange={handleChange} required />
          </div>
          <button className='submit-btn' type="submit">Crear Arma</button>
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
