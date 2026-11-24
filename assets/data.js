// Gamme BYD presentee par CFAO Mobility Cote d'Ivoire (byd.com/ci, byd.ci).
// Chiffres : fiches officielles BYD citees dans "sources". Coordonnees des points en % de l'image de profil.
// glb : laisser null. Si un modele 3D libre est ajoute plus tard (assets/models/xxx.glb), la vue 3D remplace la vue studio.
export const VEHICULES = [
  {
    id: 'atto-2',
    nom: 'BYD ATTO 2',
    type: 'SUV compact 100 % électrique',
    glb: null, usdz: null,
    couleurs: [
      { id: 'grey', nom: 'Gris', hex: '#6d7076' },
      { id: 'mist', nom: 'Vert brume', hex: '#b9c4a4' },
      { id: 'white', nom: 'Blanc', hex: '#f1f2f3' },
      { id: 'black', nom: 'Noir', hex: '#1d1e21' }
    ],
    fiche: [
      { lib: 'Autonomie', val: '345 km', note: 'WLTP' },
      { lib: 'Puissance', val: '130 kW', note: '0 à 100 km/h en 7,9 s' },
      { lib: 'Recharge rapide', val: '28 min', note: '30 à 80 %, 65 kW' }
    ],
    points: [
      { id: 'batterie', titre: 'Batterie Blade', x: 50.0, y: 52.6, texte: 'Batterie BYD Blade de 51,13 kWh, logée dans le plancher entre les deux essieux.', src: 'au' },
      { id: 'autonomie', titre: 'Autonomie', x: 28.5, y: 55.3, texte: "Jusqu'à 345 km en cycle WLTP. Puissance de 130 kW, 0 à 100 km/h en 7,9 s.", src: 'au' },
      { id: 'recharge', titre: 'Recharge', x: 71.5, y: 55.3, texte: 'Recharge rapide en courant continu jusqu\'à 65 kW : de 30 à 80 % en 28 minutes. Fonction V2L pour alimenter un appareil depuis la voiture.', src: 'eu' },
      { id: 'habitacle', titre: 'Habitacle', x: 44.6, y: 29.7, texte: 'Écran tactile rotatif de 10,1 ou 12,8 pouces selon la version, Apple CarPlay et Android Auto sans fil.', src: 'au' },
      { id: 'coffre', titre: 'Coffre', x: 78.2, y: 36.4, texte: 'Coffre de 380 litres, jusqu\'à 1 320 litres banquette rabattue.', src: 'au' }
    ],
    sources: {
      au: { lib: 'Fiche BYD ATTO 2, BYD Australie', url: 'https://bydautomotive.com.au/atto-2' },
      eu: { lib: 'Fiche BYD ATTO 2, BYD Europe', url: 'https://www.byd.com/eu/electric-cars/atto-2' }
    },
    photos: 'https://bydautomotive.com.au/atto-2'
  },
  {
    id: 'dolphin',
    nom: 'BYD DOLPHIN',
    type: 'Citadine 100 % électrique',
    glb: null, usdz: null,
    couleurs: [
      { id: 'blue', nom: 'Bleu', hex: '#4a6a99' },
      { id: 'grey', nom: 'Gris', hex: '#5f6268' },
      { id: 'white', nom: 'Blanc', hex: '#f1f2f3' }
    ],
    fiche: [
      { lib: 'Autonomie', val: '427 km', note: 'WLTP, version Premium' },
      { lib: 'Puissance', val: '150 kW', note: '0 à 100 km/h en 7,0 s' },
      { lib: 'Recharge rapide', val: '29 min', note: '30 à 80 %, 80 kW' }
    ],
    points: [
      { id: 'batterie', titre: 'Batterie Blade', x: 50.0, y: 48.5, texte: 'Batterie BYD Blade de 60,48 kWh (version Premium), intégrée au plancher.', src: 'au' },
      { id: 'autonomie', titre: 'Autonomie', x: 28.5, y: 49.9, texte: "Jusqu'à 427 km en cycle WLTP (version Premium). Puissance de 150 kW, 0 à 100 km/h en 7,0 s.", src: 'au' },
      { id: 'recharge', titre: 'Recharge', x: 72.8, y: 49.9, texte: 'Recharge rapide de 80 kW (version Premium) : de 30 à 80 % en 29 minutes. Fonction V2L de 3,3 kW.', src: 'au' },
      { id: 'habitacle', titre: 'Habitacle', x: 47.3, y: 25.7, texte: 'Écran tactile rotatif de 12,8 pouces, toit panoramique en verre, chargeur de téléphone sans fil.', src: 'au' },
      { id: 'coffre', titre: 'Coffre', x: 79.6, y: 31.1, texte: 'Coffre de 345 litres, jusqu\'à 1 310 litres sièges arrière rabattus.', src: 'au' }
    ],
    sources: {
      au: { lib: 'Fiche BYD DOLPHIN, BYD Australie', url: 'https://bydautomotive.com.au/dolphin' }
    },
    photos: 'https://bydautomotive.com.au/dolphin'
  },
  {
    id: 'shark-6',
    nom: 'BYD SHARK 6',
    type: 'Pick-up hybride rechargeable DMO',
    glb: null, usdz: null,
    couleurs: [
      { id: 'blue', nom: 'Bleu', hex: '#4b6484' },
      { id: 'grey', nom: 'Gris', hex: '#d9dadb' },
      { id: 'white', nom: 'Blanc', hex: '#f4f4f4' },
      { id: 'black', nom: 'Noir', hex: '#232427' },
      { id: 'orange', nom: 'Orange', hex: '#c4552e' }
    ],
    fiche: [
      { lib: 'Autonomie', val: '650 km', note: 'combinée WLTP' },
      { lib: 'Puissance', val: '321 kW', note: '650 N.m, 0 à 100 km/h en 5,7 s' },
      { lib: 'Recharge', val: 'V2L', note: 'câble de recharge portable fourni' }
    ],
    points: [
      { id: 'batterie', titre: 'Batterie Blade', x: 46.1, y: 48.9, texte: 'Batterie BYD Blade de 29,58 kWh, intégrée au châssis : rigidité accrue et sécurité renforcée.', src: 'au' },
      { id: 'autonomie', titre: 'Autonomie', x: 29.2, y: 50.2, texte: 'Autonomie combinée de 650 km (WLTP). Moteur hybride rechargeable et transmission intégrale : 321 kW et 650 N.m, 0 à 100 km/h en 5,7 s.', src: 'ci' },
      { id: 'recharge', titre: 'Recharge', x: 63.5, y: 40, texte: 'Câble de recharge portable fourni et fonction V2L : le pick-up alimente vos outils et appareils électriques.', src: 'ci' },
      { id: 'habitacle', titre: 'Habitacle', x: 42.2, y: 29.4, texte: 'Écran tactile rotatif de 12,8 pouces, système audio Dynaudio à 8 haut-parleurs, chargeur de téléphone sans fil.', src: 'ci' },
      { id: 'benne', titre: 'Remorquage', x: 76.5, y: 42, texte: 'Capacité de remorquage freiné de 2 500 kg.', src: 'ci' }
    ],
    sources: {
      ci: { lib: 'Fiche BYD SHARK 6, BYD Côte d\'Ivoire', url: 'https://www.byd.com/ci/car/shark-6' },
      au: { lib: 'Fiche BYD SHARK 6, BYD Australie', url: 'https://bydautomotive.com.au/shark-6' }
    },
    photos: 'https://bydautomotive.com.au/shark-6'
  }
];
