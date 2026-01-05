"use client";

import { useState } from "react";
import { ReactNode } from "react";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
};

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  toggleShow: () => void;
};

export default function RegisterLogic() {
  const [characterLastName, setCharacterLastName] = useState("");
  const [characterFirstName, setCharacterFirstName] = useState("");
  const [world, setWorld] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError("Le mot de passe ne respecte pas tous les critères requis.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            characterLastName,
            characterFirstName,
            world,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Erreur lors de l'inscription. Veuillez réessayer.");
      }

      // reset
      setCharacterLastName("");
      setCharacterFirstName("");
      setWorld("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#1a1c29] via-[#151722] to-[#11131d] text-gray-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-center text-2xl font-semibold">Inscription</h1>
          <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            {/* Autofill trap */}
            <input type="text" autoComplete="username" className="hidden" />
            <input
              type="password"
              autoComplete="current-password"
              className="hidden"
            />

            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Nom */}
            <Input
              label="Nom du personnage"
              value={characterLastName}
              onChange={setCharacterLastName}
              placeholder="Nom"
              icon="🧙"
            />

            {/* Prénom */}
            <Input
              label="Prénom du personnage"
              value={characterFirstName}
              onChange={setCharacterFirstName}
              placeholder="Prénom"
              icon="✨"
            />

            {/* Monde */}
            <Input
              label="Monde d'origine"
              value={world}
              onChange={setWorld}
              placeholder="Serveur"
              icon="🌍"
            />

            {/* Email */}
            <Input
              label="Adresse e-mail"
              value={email}
              onChange={setEmail}
              placeholder="Adresse e-mail"
              icon="✉️"
              type="email"
              autoComplete="username"
            />

            {/* Mot de passe */}
            <PasswordInput
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              show={showPassword}
              toggleShow={() => setShowPassword((v) => !v)}
            />

            {/* Confirmation */}
            <PasswordInput
              label="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showPassword}
              toggleShow={() => setShowPassword((v) => !v)}
            />

            <div className="space-y-1 text-sm">
              <PasswordRule
                valid={passwordChecks.length}
                label="8 caractères minimum"
              />
              <PasswordRule
                valid={passwordChecks.upper}
                label="1 caractère spécial (!@#$%...)"
              />
              <PasswordRule
                valid={passwordChecks.special}
                label="1 caractère spécial"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 py-3 font-medium text-black shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  autoComplete,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-300">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full rounded-md border border-white/10 bg-[#151722] px-4 py-3 pl-11 text-sm text-gray-100 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  toggleShow,
}: PasswordInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-300">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete="current-password"
          placeholder={label}
          className="w-full rounded-md border border-white/10 bg-[#151722] px-4 py-3 pl-11 text-sm text-gray-100 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔒
        </span>
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
          aria-label={
            show ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );
}

function PasswordRule({ valid, label }: { valid: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        valid ? "text-green-400" : "text-gray-400"
      }`}
    >
      <span className="text-base">{valid ? "✔️" : "•"}</span>
      <span>{label}</span>
    </div>
  );
}
