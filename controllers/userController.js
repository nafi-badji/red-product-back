const User = require("../model/user");

const createUsers = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    if (!nom || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    // vérifier si l'utilisateur existe
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "Email deja utilisé" });

    // creer l'utilisateur
    const user = await User.create({ nom, email, password });
    // Génère le token
    const token = user.generateToken();

    // Envoie le cookie avec le token
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      sameSite: "none",
      secure: true,
    });

    // renvoyer le token
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: user._id,
        nom,
        email,
      },
      token,
    });
    console.log("utilisateur créer", user);
    console.log("id de user", user._id);
  } catch (error) {
    console.error("erreur d'inscription", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res

        .status(404)
        .json({ message: "cet email n'existe pas. Veuillez inscrire" });
    }
    if (!user) {
      return res

        .status(400)
        .json({ message: "cet email n'existe pas. Veuillez inscrire" });
    }

    const token = user.generateToken();

    res.status(201).json({
      message: "Connection réussit!",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
      },
      token,
    });
    console.log("Utilisateur créé avec succès", user);
  } catch (error) {
    console.error("erreur de connection", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    console.error("erreur de reccupération", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = { createUsers, loginUser, getUser };
