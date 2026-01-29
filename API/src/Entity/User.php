<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\State\UserMeStateProvider;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'Cet email est déjà utilisé.')]
#[Get(
    normalizationContext: ['groups' => ['user:get_me']],
    security: 'is_granted("ROLE_USER")',
    name: "get_me",
    uriTemplate: "/user-me",
    provider: UserMeStateProvider::class
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['user:get_me'])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column]
    private string $password;

    #[Assert\NotBlank(groups: ['registration'])]
    #[Assert\Length(min: 8)]
    #[Assert\Regex('/[A-Z]/', message: 'Une majuscule est requise.')]
    #[Assert\Regex('/[^A-Za-z0-9]/', message: 'Un caractère spécial est requis.')]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Groups(['user:get_me'])]
    private string $characterLastName;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Groups(['user:get_me'])]
    private string $characterFirstName;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank]
    #[Groups(['user:get_me'])]
    private string $world;

    #[ORM\Column(type: 'boolean')]
    private bool $isVerified = false;

    #[ORM\Column(length: 36, nullable: true)]
    private ?string $emailVerificationToken = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return array_unique([...$this->roles, 'ROLE_USER']);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $hashedPassword): self
    {
        $this->password = $hashedPassword;
        return $this;
    }

    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = strtolower($email);
        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;
        return $this;
    }

    public function getCharacterLastName(): string
    {
        return $this->characterLastName;
    }

    public function setCharacterLastName(string $value): self
    {
        $this->characterLastName = $value;
        return $this;
    }

    public function getCharacterFirstName(): string
    {
        return $this->characterFirstName;
    }

    public function setCharacterFirstName(string $value): self
    {
        $this->characterFirstName = $value;
        return $this;
    }

    public function getWorld(): string
    {
        return $this->world;
    }

    public function setWorld(string $value): self
    {
        $this->world = $value;
        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $value): self
    {
        $this->isVerified = $value;
        return $this;
    }

    public function getEmailVerificationToken(): ?string
    {
        return $this->emailVerificationToken;
    }

    public function setEmailVerificationToken(?string $token): self
    {
        $this->emailVerificationToken = $token;
        return $this;
    }
}
