import LoginLogic from "./login";

export const metadata = {
  title: "Connexion",
  description: "Page de connexion de XIV Tools",
};

export default function LoginPage() {
  return (
    <div>
      <LoginLogic />
    </div>
  );
}
