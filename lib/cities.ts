export type City = {
  id: string;
  name: { pt: string; en: string };
  images: string[];
  imagesCaptions?: { pt: string; en: string }[];
  sights: { pt: string; en: string }[];
  sightsImages?: string[];
  cuisine: { pt: string; en: string };
  cuisineImages?: string[];
  description?: { pt: string; en: string };
};

export const CITIES: City[] = [
  {
    id: "manaus",
    name: { pt: "Manaus (Amazônia)", en: "Manaus (Amazon)" },
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471"
    ],
    imagesCaptions: [
      { pt: "Vista do Rio Negro", en: "View of the Rio Negro" },
      { pt: "Comunidade ribeirinha", en: "Riverside community" }
    ],
    description: {
      pt: "Cultura rica com influências indígenas e ribeirinhas, festas locais e música regional.",
      en: "Rich culture with indigenous and riverside influences, local festivals and regional music."
    },
    cuisine: {
      pt: "Pratos típicos como tambaqui, tacacá e frutos amazônicos.",
      en: "Typical dishes like tambaqui, tacacá and Amazonian fruits."
    },
    sights: [
      { pt: "Teatro Amazonas", en: "Amazon Theatre" },
      { pt: "Encontro das Águas", en: "Meeting of the Waters" },
      { pt: "Mercado Adolpho Lisboa", en: "Adolpho Lisboa Market" }
    ],
    sightsImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      "https://images.unsplash.com/photo-1505672678657-cc7037095e2d",
      "https://images.unsplash.com/photo-1542736667-069246bdbc6d"
    ],
    cuisineImages: [
      "https://images.unsplash.com/photo-1543352634-6e3b1d2f7d0b",
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2"
    ]
  },
  {
    id: "rio",
    name: { pt: "Rio de Janeiro", en: "Rio de Janeiro" },
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
    ],
    imagesCaptions: [
      { pt: "Cristo Redentor ao fundo", en: "Christ the Redeemer in the background" },
      { pt: "Orla e morros", en: "Beachfront and hills" }
    ],
    description: {
      pt: "Fusão de ritmos, samba, carnaval e vida praiana vibrante.",
      en: "Fusion of rhythms, samba, carnival and a vibrant beach life."
    },
    cuisine: {
      pt: "Churrasco, feijoada e frutos do mar frescos nas orlas.",
      en: "Barbecue, feijoada and fresh seafood along the waterfronts."
    },
    sights: [
      { pt: "Cristo Redentor", en: "Christ the Redeemer" },
      { pt: "Pão de Açúcar", en: "Sugarloaf Mountain" },
      { pt: "Praias de Copacabana e Ipanema", en: "Copacabana and Ipanema Beaches" }
    ],
    sightsImages: [
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
      "https://images.unsplash.com/photo-1508074779533-5f3c4b6f3f8e",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    ],
    cuisineImages: [
      "https://images.unsplash.com/photo-1604908554027-1a0d7c02b3a3",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
    ]
  }
];

export function getCity(id: string) {
  return CITIES.find((c) => c.id === id) || null;
}
