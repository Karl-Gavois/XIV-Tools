<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegisterController extends AbstractController
{
    #[Route('/api/register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        ValidatorInterface $validator,
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $user = (new User())
            ->setEmail($data['email'] ?? '')
            ->setPlainPassword($data['password'] ?? '')
            ->setCharacterLastName($data['characterLastName'] ?? '')
            ->setCharacterFirstName($data['characterFirstName'] ?? '')
            ->setWorld($data['world'] ?? '')
            ->setRoles(['ROLE_USER']);

        // Validation
        $errors = $validator->validate($user, null, ['registration']);
        if (count($errors) > 0) {
            $errorsArray = [];
            foreach ($errors as $error) {
                $errorsArray[$error->getPropertyPath()][] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorsArray], 400);
        }

        // Vérification email unique
        if ($em->getRepository(User::class)->findOneBy(['email' => $user->getEmail()])) {
            return new JsonResponse(['error' => 'Cet email est déjà utilisé'], 400);
        }

        // Génération du token de vérification
        $token = Uuid::v4()->toRfc4122();
        $user->setEmailVerificationToken($token);

        // Hash du password
        $user->setPassword(
            $hasher->hashPassword($user, $user->getPlainPassword())
        );
        $user->eraseCredentials();

        $em->persist($user);
        $em->flush();

        // Envoi de l'email de vérification
        $url = sprintf(
            '%s/verify-email?token=%s',
            $_ENV['FRONTEND_URL'],
            $token
        );

        $mailer->send(
            (new Email())
                ->from($_ENV['MAILER_FROM'] ?? 'no-reply@tonsite.com')
                ->to($user->getEmail())
                ->subject('Vérification de votre compte')
                ->html(sprintf(
                    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1>Bienvenue %s %s !</h1>
                        <p>Merci de vous être inscrit. Pour activer votre compte, 
                        veuillez confirmer votre mot de passe en cliquant sur le lien ci-dessous :</p>
                        <p style="margin: 30px 0;">
                            <a href="%s" style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                            text-decoration: none; border-radius: 5px; display: inline-block;">
                                Vérifier mon email
                            </a>
                        </p>
                        <p style="color: #666; font-size: 14px;">Ce lien est valable 24 heures.</p>
                        <p style="color: #666; font-size: 14px;">Si vous n\'avez pas créé de compte, 
                        vous pouvez ignorez cet email.</p>
                    </div>
                ',
                    htmlspecialchars($user->getCharacterFirstName()),
                    htmlspecialchars($user->getCharacterLastName()),
                    htmlspecialchars($url)
                ))
        );

        return new JsonResponse([
            'message' => 'Compte créé ! Veuillez vérifier votre email pour activer votre compte.'
        ], 201);
    }
}
