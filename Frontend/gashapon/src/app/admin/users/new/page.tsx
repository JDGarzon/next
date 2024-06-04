"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';



export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Formulario enviado:', {...formData});
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
          <h2> Nuevo Usuario</h2>
          <div>
            <Link href={`/admin/users`} className="table-header-btn">
              <Image className="table-option-btn" src={"/icons/return.png"} alt={"Return Icon"} width={40} height={40} />
              <p>Regresar</p>
            </Link>
          </div>
        </div>
        <form className="character-form" onSubmit={handleSubmit}>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="name">Nombre:</label>
            <input className='character-form-input' placeholder='Ingrese el nombre del usuario' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="email">Email:</label>
            <input className='character-form-input' placeholder='Ingrese el email del usuario' type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="password">Contraseña:</label>
            <input className='character-form-input' placeholder='Ingrese la contraseña del usuario' type="text" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button className='submit-btn' type="submit">Crear Usuario</button>
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
