"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import "../../../globals.css";
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage = () => {
    const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (session && status === "authenticated") {

    }
  }, [session, status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    let data={"username":name,
    "email":email,
    "password":password}
    console.log(data)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username":name,
          "email":email,
          "password":password
        }),
      }
    );

    const response = await res.json();

    console.log(response)

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${response._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
        body:JSON.stringify({
            "rol":role
          }),
      });


    const responseAPI = await res2.json();

    if (!res2.ok) {
      setErrors(responseAPI.message);
      return;
    }

    router.push("/admin/users");
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
            <input
              className='character-form-input' 
              placeholder='Ingrese el nombre del usuario'
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="email">Email:</label>

            <input
              className='character-form-input' 
              placeholder='Ingrese el nombre del usuario'
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="password">Contraseña:</label>
            <input
              className='character-form-input' 
              placeholder='Ingrese el nombre del usuario'
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className='character-form-element'>
            <label className='character-form-label' htmlFor="rol">Rol:</label>
            <input
              className='character-form-input' 
              placeholder='Ingrese el rol del usuario'
              type="text"
              name="rol"
              value={password}
              onChange={(event) => setRole(event.target.value)}
            />
          </div>
          <button className='submit-btn' type="submit">Crear Usuario</button>
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
};
export default RegisterPage;
