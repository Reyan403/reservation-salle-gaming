<?php

namespace App\Entity;

use App\Repository\SalleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: SalleRepository::class)]
class Salle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(type: Types::TEXT)]
    private string $description;

    #[ORM\Column]
    private string $image;

    #[ORM\Column]
    private int $nbPlayerMax;

    #[ORM\Column]
    private int $price;

    #[ORM\Column]
    private string $equipement;

    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'salle')]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    public function getNbPlayerMax(): int
    {
        return $this->nbPlayerMax;
    }

    public function setNbPlayerMax(int $nbPlayerMax): void
    {
        $this->nbPlayerMax = $nbPlayerMax;
    }

    public function getPrice(): int
    {
        return $this->price;
    }

    public function setPrice(int $price): void
    {
        $this->price = $price;
    }

    public function getEquipement(): string
    {
        return $this->equipement;
    }

    public function setEquipement(string $newEquipement): void
    {
        $this->equipement = $newEquipement;
    }

    public function getReservations(): Collection 
    {
        return $this->reservations;
    }

    public function addReservations(Reservation $reservation): self 
    {
       if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
       }

       return $this;
    }

    public function removeReservation(Reservation $reservation)
    {
        $this->reservations->removeElement($reservation);

        return $this;
    }
}
