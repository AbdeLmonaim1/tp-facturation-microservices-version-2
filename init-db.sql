-- Script d'initialisation de la base de données PostgreSQL
-- Ce script crée des bases de données séparées pour chaque microservice

-- Créer les bases de données pour chaque microservice
CREATE DATABASE keycloak_db;
CREATE DATABASE customer_db;
CREATE DATABASE inventory_db;
CREATE DATABASE billing_db;

-- Créer des utilisateurs dédiés pour chaque service (optionnel mais recommandé pour la sécurité)
CREATE USER keycloak_user WITH ENCRYPTED PASSWORD 'keycloak_pass';
CREATE USER customer_user WITH ENCRYPTED PASSWORD 'customer_pass';
CREATE USER inventory_user WITH ENCRYPTED PASSWORD 'inventory_pass';
CREATE USER billing_user WITH ENCRYPTED PASSWORD 'billing_pass';

-- Accorder tous les privilèges sur les bases respectives
GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO keycloak_user;
GRANT ALL PRIVILEGES ON DATABASE customer_db TO customer_user;
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO inventory_user;
GRANT ALL PRIVILEGES ON DATABASE billing_db TO billing_user;

-- Accorder aussi à l'admin pour faciliter la gestion
GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO admin;
GRANT ALL PRIVILEGES ON DATABASE customer_db TO admin;
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO admin;
GRANT ALL PRIVILEGES ON DATABASE billing_db TO admin;

-- Message de confirmation
DO $
BEGIN
    RAISE NOTICE '✅ Bases de données créées avec succès :';
    RAISE NOTICE '   - keycloak_db   (Keycloak)';
    RAISE NOTICE '   - customer_db   (Customer Service)';
    RAISE NOTICE '   - inventory_db  (Inventory Service)';
    RAISE NOTICE '   - billing_db    (Billing Service)';
END $;