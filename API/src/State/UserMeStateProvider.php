<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use ApiPlatform\State\ProviderInterface;
use App\Entity\User;

/**
 * @template T of object
 * @implements ProviderInterface<T>
 */

class UserMeStateProvider extends AbstractController implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return $this->getUser();
    }
}
