import LoginLogic from "./login";
import type { Metadata } from 'next';

export const metadata = {
  title: 'Connexion',
  description: 'Page de connexion de XIV Tools',
};


export default function LoginPage() {
  return (
    <div>
      <LoginLogic />
    </div>
  );
}