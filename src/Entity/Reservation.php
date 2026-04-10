<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private \DateTimeImmutable $dateReservation;

    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    private \DateTimeImmutable $niche;

    #[ORM\Column]
    private int $nbJoueur;

    #[ORM\Column]
    private string $playerName;

    #[ORM\Column]
    private string $email;

    #[ORM\Column]
    private int $tel;

    #[ORM\ManyToOne(targetEntity: Salle::class, inversedBy: 'reservations')]
    private Salle $salle;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): \DateTimeImmutable 
    {
        return $this->dateReservation;
    }

    public function setDate(\DateTimeImmutable $newDateReservation): void 
    {
        $this->dateReservation = $newDateReservation;
    }

    public function getNbJoueur(): int 
    {
        return $this->nbJoueur;
    }

    public function setNbJoueur(int $newNbJoueur): void 
    {
        $this->nbJoueur = $newNbJoueur;
    }

    public function getNiche(): \DateTimeImmutable
    {
        return $this->niche;
    }

    public function setNiche(\DateTimeImmutable $newNiche): void 
    {
        $this->niche = $newNiche;
    }

    public function getPlayerName(): string 
    {
        return $this->playerName;
    }

    public function setPlayerName(string $newPlayerName): void 
    {
        $this->playerName = $newPlayerName;
    }

    public function getEmail(): string 
    {
        return $this->email;
    }

    public function setEmail(string $newEmail): void 
    {
        $this->email = $newEmail;
    }

    public function getTel(): int 
    {
        return $this->tel;
    }

    public function setTel(int $newTel): void 
    {
        $this->tel = $newTel;
    }

    public function getSalle(): Salle 
    {
        return $this->salle;
    }

    public function setSalle(Salle $newSalle): void 
    {
        $this->salle = $newSalle;
    }
}
