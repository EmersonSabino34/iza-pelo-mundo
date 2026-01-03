"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Utensils, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type City = {
  id: string;
  name: { pt: string; en: string };
  images: string[];
  culture: { pt: string; en: string };
  cuisine: { pt: string; en: string };
  sights: { pt: string; en: string }[];
};

const CITIES: City[] = [
  {
    id: "manaus",
    name: { pt: "Manaus (Amazônia)", en: "Manaus (Amazon)" },
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471"
    ],
    culture: {
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
    ]
  },
  {
    id: "rio",
    name: { pt: "Rio de Janeiro", en: "Rio de Janeiro" },
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
    ],
    culture: {
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
    ]
  }
];

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [likes, setLikes] = useState<Record<string, number>>({ manaus: 0, rio: 0 });
  const [comments, setComments] = useState<Record<string, string[]>>({ manaus: [], rio: [] });
  const [draft, setDraft] = useState<Record<string, string>>({ manaus: "", rio: "" });

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem("iza_likes");
      const storedComments = localStorage.getItem("iza_comments");
      if (storedLikes) setLikes(JSON.parse(storedLikes));
      if (storedComments) setComments(JSON.parse(storedComments));
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist likes and comments when they change
  useEffect(() => {
    try {
      localStorage.setItem("iza_likes", JSON.stringify(likes));
    } catch (e) {}
  }, [likes]);

  useEffect(() => {
    try {
      localStorage.setItem("iza_comments", JSON.stringify(comments));
    } catch (e) {}
  }, [comments]);

  function toggleLike(id: string) {
    setLikes((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  }

  function submitComment(id: string) {
    const text = draft[id]?.trim();
    if (!text) return;
    setComments((s) => ({ ...s, [id]: [...(s[id] || []), text] }));
    setDraft((d) => ({ ...d, [id]: "" }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-teal-500 to-sky-400 text-white">
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Izabelle Lessa Viagens</h1>
            <p className="mt-2 text-sm md:text-base max-w-2xl">
              {lang === "pt"
                ? "Escolha uma cidade brasileira para explorar cultura, culinária e pontos turísticos."
                : "Choose a Brazilian city to explore culture, cuisine and sights."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setLang("pt")}
              className={cn(lang === "pt" ? "ring-2 ring-white/40" : "", "px-4 py-2")}
              variant="ghost"
            >
              PT
            </Button>
            <Button
              onClick={() => setLang("en")}
              className={cn(lang === "en" ? "ring-2 ring-white/40" : "", "px-4 py-2")}
              variant="ghost"
            >
              EN
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {CITIES.map((city) => (
            <Card key={city.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="md:flex md:gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={city.images[0]}
                      alt={city.name.pt}
                      className="w-full h-56 md:h-full object-cover rounded-lg mb-2"
                    />
                    <div className="text-xs text-white/80 mb-3">{lang === "pt" ? "Foto destacada" : "Featured photo"}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        src={city.images[1]}
                        alt={city.name.pt + " 2"}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="text-xs text-white/80">{lang === "pt" ? "Foto adicional" : "Additional photo"}</div>
                      <div className="flex items-center justify-center bg-white/5 rounded-lg">
                        <div className="text-center p-2">
                          <div className="font-semibold">{city.name[lang]}</div>
                          <div className="text-xs text-white/80">{lang === "pt" ? "Brasil" : "Brazil"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0">
                    <h3 className="text-2xl font-semibold mb-2">{city.name[lang]}</h3>
                    <p className="mb-3 text-sm">{city.culture[lang]}</p>
                    <p className="mb-3 text-sm">
                      <strong>{lang === "pt" ? "Culinária:" : "Cuisine:"}</strong> {city.cuisine[lang]}
                    </p>
                    <div className="mb-3">
                      <strong className="block mb-1">{lang === "pt" ? "Pontos turísticos" : "Sights"}:</strong>
                      <ul className="list-disc list-inside text-sm">
                        {city.sights.map((s, i) => (
                          <li key={i}>{s[lang]}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => toggleLike(city.id)}
                        className="bg-emerald-600/90 px-3 py-2 rounded-lg"
                      >
                        👍 {likes[city.id] || 0}
                      </button>
                      <a
                        href={`https://wa.me/351938983505`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <div className="bg-green-600 px-3 py-2 rounded-lg">{lang === "pt" ? "WhatsApp" : "WhatsApp"}</div>
                      </a>
                    </div>

                    <div className="mt-4">
                      <textarea
                        value={draft[city.id] || ""}
                        onChange={(e) => setDraft((d) => ({ ...d, [city.id]: e.target.value }))}
                        placeholder={lang === "pt" ? "Deixe um comentário..." : "Leave a comment..."}
                        className="w-full p-3 rounded-lg bg-white/5 text-sm placeholder-white/60"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Button onClick={() => submitComment(city.id)} variant="primary" className="px-4 py-2">
                          {lang === "pt" ? "Comentar" : "Comment"}
                        </Button>
                        <div className="text-sm text-white/80">{(comments[city.id] || []).length} {lang === "pt" ? "comentários" : "comments"}</div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {(comments[city.id] || []).map((c, i) => (
                          <div key={i} className="bg-white/5 p-3 rounded">
                            <div className="text-sm">{c}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="bg-black/20 py-6 text-center text-sm">
        © {new Date().getFullYear()} Izabelle Lessa Viagens · {lang === "pt" ? "Todos os direitos reservados" : "All rights reserved"}
      </footer>
    </div>
  );
}
