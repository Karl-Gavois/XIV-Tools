<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class VerifyEmailController extends AbstractController
{
    #[Route('/api/verify-email', methods: ['POST'])]
    public function verify(
        Request $request,
        UserRepository $userRepo,
        UserPasswordHasherInterface $hasher,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'] ?? null;
        $password = $data['password'] ?? null;

        if (!$token || !$password) {
            return new JsonResponse(['error' => 'Token et mot de passe requis'], 400);
        }

        $user = $userRepo->findOneBy(['emailVerificationToken' => $token]);

        if (!$user) {
            return new JsonResponse(['error' => 'Token invalide ou expiré'], 404);
        }

        if ($user->isVerified()) {
            return new JsonResponse(['error' => 'Compte déjà vérifié'], 400);
        }

        // Vérification du mot de passe
        if (!$hasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Mot de passe incorrect'], 401);
        }

        // Activation du compte
        $user->setIsVerified(true);
        $user->setEmailVerificationToken(null);
        $em->flush();

        // Génération du JWT
        $jwt = $jwtManager->create($user);

        $response = new JsonResponse([
            'message' => 'Email vérifié avec succès',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'characterFirstName' => $user->getCharacterFirstName(),
                'characterLastName' => $user->getCharacterLastName(),
                'world' => $user->getWorld(),
                'roles' => $user->getRoles()
            ]
        ]);

        // Cookie HttpOnly sécurisé
        $response->headers->setCookie(
            Cookie::create('JWT_Token')
                ->withValue($jwt)
                ->withExpires(time() + 3600 * 24 * 7) // 7 jours
                ->withPath('/')
                ->withSecure(true)
                ->withHttpOnly(true)
                ->withSameSite('lax')
        );

        return $response;
    }
}
