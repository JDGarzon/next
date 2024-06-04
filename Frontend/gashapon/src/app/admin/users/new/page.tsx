"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import "../../../globals.css";

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
    <div className="register-container"> {/* Agregamos una clase de contenedor similar al login */}
      <div className="register-box"> {/* Agregamos una clase de caja similar al login */}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            name="name"
            className="form-control mb-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            className="form-control mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="form-control mb-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
           <input
            type="text"
            placeholder="role"
            name="role"
            className="form-control mb-2"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button type="button" className="btn btn-secondary" onClick={()=>{router.push("/sign/login");}}>
            Cancel
          </button>
          
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
