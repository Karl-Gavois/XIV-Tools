"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({ username: email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>


            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-lg font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="mt-1 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:border-black"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-lg font-medium">
                    Mot de passe
                  </label>
                  <a href="#" className="text-sm text-gray-500 hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:border-black"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition cursor-pointer"
              >
                Connexion
              </button>
            </form>
    </div>
  );
}