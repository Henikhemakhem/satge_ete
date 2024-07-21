// models/abonnement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour le modèle Abonnement
const AbonnementSchema = new Schema({
  formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true }, // Référence vers Formation
  IdUser: { type: String, required: true },
  stripeToken: { type: Schema.Types.Mixed, required: true } // Ajout du champ stripeToken comme objet
});

// Créer le modèle Abonnement basé sur le schéma
const Abonnement = mongoose.model('Abonnement', AbonnementSchema);

module.exports = Abonnement;
