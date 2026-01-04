import RegisterLogic from "./register";

export const metadata = {
  title: "Inscription",
  description: "Page d'inscription de XIV Tools",
};

export default function RegisterPage() {
  return (
    <div>
      <RegisterLogic />
    </div>
  );
}
