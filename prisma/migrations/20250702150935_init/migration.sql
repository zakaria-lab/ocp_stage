-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('UTILISATEUR', 'TECHNICIEN_N1', 'TECHNICIEN_N2', 'TECHNICIEN_N3', 'RESPONSABLE', 'ADMINISTRATEUR');

-- CreateEnum
CREATE TYPE "StatutIntervention" AS ENUM ('DEMANDEE', 'VALIDEE', 'ASSIGNEE', 'EN_COURS', 'SUSPENDUE', 'TERMINEE', 'ANNULEE', 'REJETEE');

-- CreateEnum
CREATE TYPE "PrioriteIntervention" AS ENUM ('BASSE', 'NORMALE', 'HAUTE', 'CRITIQUE');

-- CreateEnum
CREATE TYPE "TypeIntervention" AS ENUM ('MATERIEL', 'LOGICIEL', 'RESEAU', 'SECURITE', 'MAINTENANCE', 'INSTALLATION', 'SUPPORT');

-- CreateEnum
CREATE TYPE "StatutEquipement" AS ENUM ('OPERATIONNEL', 'EN_PANNE', 'MAINTENANCE', 'RETIRE');

-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('ASSIGNATION', 'VALIDATION', 'CLOTURE', 'ESCALADE', 'RAPPEL', 'URGENT');

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "motDePasse" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'UTILISATEUR',
    "specialite" TEXT,
    "niveau" INTEGER,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demandes_intervention" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priorite" "PrioriteIntervention" NOT NULL DEFAULT 'NORMALE',
    "statut" "StatutIntervention" NOT NULL DEFAULT 'DEMANDEE',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEcheance" TIMESTAMP(3),
    "demandeurId" INTEGER NOT NULL,
    "equipementId" INTEGER,

    CONSTRAINT "demandes_intervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interventions" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "type" "TypeIntervention" NOT NULL,
    "niveau" INTEGER NOT NULL DEFAULT 1,
    "statut" "StatutIntervention" NOT NULL DEFAULT 'ASSIGNEE',
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "tempsEstime" INTEGER,
    "tempsReel" INTEGER,
    "technicienId" INTEGER,
    "demandeId" INTEGER NOT NULL,

    CONSTRAINT "interventions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiches_intervention" (
    "id" SERIAL NOT NULL,
    "interventionId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "materielUtilise" TEXT,
    "actionRealisee" TEXT NOT NULL,
    "observation" TEXT,
    "dateGeneration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fiches_intervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipements" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "marque" TEXT,
    "modele" TEXT,
    "numeroSerie" TEXT,
    "localisation" TEXT NOT NULL,
    "statut" "StatutEquipement" NOT NULL DEFAULT 'OPERATIONNEL',
    "dateAchat" TIMESTAMP(3),
    "garantie" TIMESTAMP(3),
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventaires" (
    "id" SERIAL NOT NULL,
    "dateInventaire" TIMESTAMP(3) NOT NULL,
    "responsableId" INTEGER NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN_COURS',
    "observations" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventaire_equipements" (
    "id" SERIAL NOT NULL,
    "inventaireId" INTEGER NOT NULL,
    "equipementId" INTEGER NOT NULL,
    "etatConstate" TEXT NOT NULL,
    "observations" TEXT,

    CONSTRAINT "inventaire_equipements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planifications" (
    "id" SERIAL NOT NULL,
    "interventionId" INTEGER NOT NULL,
    "datePrevisionnelle" TIMESTAMP(3) NOT NULL,
    "technicienId" INTEGER NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'PLANIFIEE',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "destinataireId" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "lienAction" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistiques" (
    "id" SERIAL NOT NULL,
    "periode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "donnees" JSONB NOT NULL,
    "dateGeneration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statistiques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tableaux_bord" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "widgets" JSONB NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tableaux_bord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentaires" (
    "id" SERIAL NOT NULL,
    "interventionId" INTEGER NOT NULL,
    "auteurId" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3),

    CONSTRAINT "commentaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "taille" INTEGER NOT NULL,
    "chemin" TEXT NOT NULL,
    "interventionId" INTEGER NOT NULL,
    "uploadePar" INTEGER NOT NULL,
    "dateUpload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "interventions_numero_key" ON "interventions"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "interventions_demandeId_key" ON "interventions"("demandeId");

-- CreateIndex
CREATE UNIQUE INDEX "fiches_intervention_interventionId_key" ON "fiches_intervention"("interventionId");

-- CreateIndex
CREATE UNIQUE INDEX "equipements_numeroSerie_key" ON "equipements"("numeroSerie");

-- CreateIndex
CREATE UNIQUE INDEX "inventaire_equipements_inventaireId_equipementId_key" ON "inventaire_equipements"("inventaireId", "equipementId");

-- CreateIndex
CREATE UNIQUE INDEX "planifications_interventionId_key" ON "planifications"("interventionId");

-- AddForeignKey
ALTER TABLE "demandes_intervention" ADD CONSTRAINT "demandes_intervention_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_intervention" ADD CONSTRAINT "demandes_intervention_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "equipements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_demandeId_fkey" FOREIGN KEY ("demandeId") REFERENCES "demandes_intervention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_technicienId_fkey" FOREIGN KEY ("technicienId") REFERENCES "utilisateurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiches_intervention" ADD CONSTRAINT "fiches_intervention_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventaires" ADD CONSTRAINT "inventaires_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventaire_equipements" ADD CONSTRAINT "inventaire_equipements_inventaireId_fkey" FOREIGN KEY ("inventaireId") REFERENCES "inventaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventaire_equipements" ADD CONSTRAINT "inventaire_equipements_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "equipements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planifications" ADD CONSTRAINT "planifications_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planifications" ADD CONSTRAINT "planifications_technicienId_fkey" FOREIGN KEY ("technicienId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableaux_bord" ADD CONSTRAINT "tableaux_bord_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaires" ADD CONSTRAINT "commentaires_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaires" ADD CONSTRAINT "commentaires_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
