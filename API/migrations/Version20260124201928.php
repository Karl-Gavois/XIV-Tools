<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260124201928 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD character_last_name VARCHAR(100) NOT NULL, ADD character_first_name VARCHAR(100) NOT NULL, ADD world VARCHAR(50) NOT NULL, ADD is_verified TINYINT(1) NOT NULL, ADD email_verification_token VARCHAR(36) DEFAULT NULL');
        $this->addSql('ALTER TABLE user RENAME INDEX uniq_identifier_email TO UNIQ_8D93D649E7927C74');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `user` DROP character_last_name, DROP character_first_name, DROP world, DROP is_verified, DROP email_verification_token');
        $this->addSql('ALTER TABLE `user` RENAME INDEX uniq_8d93d649e7927c74 TO UNIQ_IDENTIFIER_EMAIL');
    }
}
