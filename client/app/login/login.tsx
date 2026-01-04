"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function LoginLogic() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  function getLoginErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return "Requête invalide. Vérifiez les informations saisies.";
      case 401:
        return "Adresse e-mail ou mot de passe incorrect.";
      case 403:
        return "Accès refusé.";
      case 500:
        return "Erreur serveur. Merci de réessayer plus tard.";
      default:
        return "Une erreur est survenue. Veuillez réessayer.";
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login_check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/ld+json",
          },
          body: JSON.stringify({ username: email, password }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(getLoginErrorMessage(response.status));
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#1a1c29] via-[#151722] to-[#11131d] text-gray-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_60%)]" />
      {/* <Navbar /> */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-center text-2xl font-semibold">Connectez-vous</h1>
          <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Affichage erreurs */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Adresse e-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Adresse e-mail"
                  className="w-full rounded-md border border-white/10 bg-[#151722] px-4 py-3 pl-11 text-sm text-gray-100 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mot de passe"
                  className="w-full rounded-md border border-white/10 bg-[#151722] px-4 py-3 pl-11 text-sm text-gray-100 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div className="mt-2 text-right">
                <Link
                  href="#"
                  className="text-xs text-yellow-400 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 py-3 font-medium text-black shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-yellow-400 hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
