<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column] 
    private string $email; 

    #[ORM\Column] 
    private string $password; 

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string 
    {
        return $this->email;
    }

    public function getPassword(): string 
    {
        return $this->password;
    }

    public function setEmail(string $newEmail): void 
    {
        $this->email = $newEmail;
    }

    public function setPassword(string $newPassword): void 
    {
        $this->password = $newPassword;
    }
}
