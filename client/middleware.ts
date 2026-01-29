import { NextResponse, NextRequest } from "next/server";
import { parse, serialize } from "cookie";

export async function middleware(req: NextRequest) {
  console.log("Headers:", req.headers);

  const cookieHeader = req.headers.get("cookie");
  console.log("Cookie Header:", cookieHeader);

  if (!cookieHeader) {
    console.error("Aucun cookie reçu !");
    return NextResponse.next();
  }

  const cookies = parse(cookieHeader);
  console.log("Parsed Cookies:", cookies);

  const token = cookies["JWT_Token"];
  console.log("JWT Token:", token);

  if (req.nextUrl.pathname.startsWith("/admin") && !token) {
    console.log("Redirection vers /logout : Token JWT absent");
    return NextResponse.redirect(new URL("/logout", req.url));
  }

  // Vérifier si l'utilisateur accède à /logout
  if (req.nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.headers.set(
      "Set-Cookie",
      serialize("JWT_Token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // Définit la date d'expiration à une date passée pour supprimer le cookie
      })
    );
    return response;
  }

  return NextResponse.next();
}