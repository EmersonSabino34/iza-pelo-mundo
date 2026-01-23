"use client";

import Slider from "@/components/slider";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ManausPage() {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const images = [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
  ];
  
  const sights = [
    "Teatro Amazonas",
    "Encontro das Águas",
    "Mercado Adolpho Lisboa"
  ];
  
  const cuisineImages = [
    "https://images.unsplash.com/photo-1543352634-6e3b1d2f7d0b",
    "https://images.unsplash.com/photo-1525610553991-2bede1a236e2"
  ];

  useEffect(() => {
    try {
      const l = localStorage.getItem("manaus_likes");
      const c = localStorage.getItem("manaus_comments");
      if (l) setLikes(Number(l));
      if (c) setComments(JSON.parse(c));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("manaus_likes", String(likes));
    } catch (e) {}
  }, [likes]);
  
  useEffect(() => {
    try {
      localStorage.setItem("manaus_comments", JSON.stringify(comments));
    } catch (e) {}
  }, [comments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-700 to-emerald-400 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Manaus — Amazônia</h1>
        <Slider images={images} altPrefix="Manaus" />

        <section className="mt-6 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Cultura</h2>
          <p>Manaus tem forte influência indígena e ribeirinha, com festas locais e música regional.</p>
        </section>

        <section className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Pontos turísticos</h2>
          <ul className="list-disc list-inside">
            {sights.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Culinária</h2>
          <div className="grid grid-cols-2 gap-2">
            {cuisineImages.map((src, i) => (
              <img key={i} src={src} alt={`culinaria ${i + 1}`} className="w-full h-36 object-cover rounded" />
            ))}
          </div>
        </section>

        <div className="mt-4 flex gap-2">
          <Button onClick={() => setLikes((l) => l + 1)} variant="primary">Like ({likes})</Button>
          <a href="https://wa.me/351938983505" target="_blank" rel="noreferrer" className="bg-green-600 px-4 py-2 rounded-lg">WhatsApp</a>
        </div>

        <section className="mt-4">
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full p-3 rounded bg-white/5" placeholder="Deixe um comentário" />
          <div className="flex gap-2 mt-2">
            <Button onClick={() => { if (draft.trim()) { setComments((c)=>[...c,draft.trim()]); setDraft(""); } }} variant="primary">Comentar</Button>
            <div className="text-sm self-center">{comments.length} comentários</div>
          </div>
          <div className="mt-3 space-y-2">
            {comments.map((c,i)=>(<div key={i} className="bg-white/5 p-2 rounded">{c}</div>))}
          </div>
        </section>
      </div>
    </div>
  );
}
