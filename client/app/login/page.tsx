import LoginLogic from "./login";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Page d’accueil de mon site',
};


export default function LoginPage() {
  return (
    <div>
      <LoginLogic />
    </div>
  );
}