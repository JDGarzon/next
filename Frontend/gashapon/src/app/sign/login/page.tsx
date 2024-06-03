"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../globals.css";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">

         <div className="login-header">
          <img className="icon" src="/img/wish.webp" alt="wish" width={60} height={60} />
          <h1 className="login-title">Gachapon</h1>
          <img className="icon" src="/img/wish.webp" alt="wish" width={60} height={60} />
        </div>
        <p className="login-subtitle">Start the adventure. Let's make a wish</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="form-control mb-2"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="form-control mb-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Play!
            </button>
            <button type="button" className="btn btn-secondary" onClick={()=>{router.push("/sign/register");}}>
              Sign in
            </button>
          </div>
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

export default LoginPage;
