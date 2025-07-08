const Hotel = require("../model/hotelModel");

// ➕ Créer un hôtel
const createHotel = async (req, res) => {
  try {
    const { nom, adresse, email, telephone, prix, devise } = req.body;

    if (!nom || !adresse || !email || !telephone || !prix || !devise) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const newHotel = new Hotel({
      nom,
      adresse,
      email,
      telephone,
      prix,
      devise,
      photo: req.file ? req.file.path : null,
    });

    await newHotel.save();
    res.status(201).json({ message: "Hôtel créé avec succès", hotel: newHotel });
  } catch (error) {
    console.error("Erreur lors de la création de l'hôtel :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔍 Récupérer tous les hôtels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Erreur de récupération :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
};