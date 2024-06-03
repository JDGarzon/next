"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function CreateCharacter() {
  const [formData, setFormData] = useState({
    name: '',
    element: '',
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
      console.log('Formulario enviado:', {...formData, "constellation":0,level: 90});
      router.push('/admin/characters');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
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
  );
}
