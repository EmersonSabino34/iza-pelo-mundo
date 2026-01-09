"use client";

import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function RioPage() {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const images = [
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    "https://images.unsplash.com/photo-1505685296765-3a2736de412f"
  ];

  const sights = [
    "Cristo Redentor",
    "Pão de Açúcar",
    "Praias de Copacabana e Ipanema"
  ];

  const cuisineImages = [
    "https://images.unsplash.com/photo-1604908554027-1a0d7c02b3a3",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
  ];

  useEffect(() => {
    try {
      const l = localStorage.getItem("rio_likes");
      const c = localStorage.getItem("rio_comments");
      if (l) setLikes(Number(l));
      if (c) setComments(JSON.parse(c));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("rio_likes", String(likes)); } catch (e) {}
  }, [likes]);
  useEffect(() => {
    try { localStorage.setItem("rio_comments", JSON.stringify(comments)); } catch (e) {}
  }, [comments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700 to-sky-400 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Rio de Janeiro</h1>
        <Slider images={images} altPrefix="Rio" />
        
        <section className="mt-6 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Culture / Cultura</h2>
          <p>Fusion of rhythms, samba, carnival and vibrant beach life. / Fusão de ritmos, samba e carnaval.</p>
        </section>

        <section className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Sights / Pontos turísticos</h2>
          <ul className="list-disc list-inside">
            {sights.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      
        <section className="mt-4 bg-white/5 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Cuisine / Culinária</h2>
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
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full p-3 rounded bg-white/5" placeholder="Leave a comment / Deixe um comentário" />
          <div className="flex gap-2 mt-2">
            <Button onClick={() => { if (draft.trim()) { setComments((c)=>[...c,draft.trim()]); setDraft(""); } }} variant="primary">Comment / Comentar</Button>
            <div className="text-sm self-center">{comments.length} comments / comentários</div>
          </div>
          <div className="mt-3 space-y-2">
            {comments.map((c,i)=>(<div key={i} className="bg-white/5 p-2 rounded">{c}</div>))}
          </div>
        </section>
      </div>
    </div>
  );
}
