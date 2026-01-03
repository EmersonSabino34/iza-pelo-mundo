"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider";
import { getCity } from "@/lib/cities";
import { Button } from "@/components/ui/button";

export default function CityPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const city = getCity(id as string);
  const router = useRouter();
  const [data, setData] = useState<{ likes: number; comments: string[] } | null>(null);
  const [draft, setDraft] = useState("");
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/cities/${id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          return;
        }
      } catch (e) {}
      // fallback to localStorage
      try {
        const l = localStorage.getItem(`${id}_likes`);
        const c = localStorage.getItem(`${id}_comments`);
        setData({ likes: l ? Number(l) : 0, comments: c ? JSON.parse(c) : [] });
      } catch (e) {
        setData({ likes: 0, comments: [] });
      }
    }
    load();
  }, [id]);

  async function like() {
    try {
      const res = await fetch(`/api/cities/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'like' }) });
      if (res.ok) {
        const json = await res.json();
        setData((d) => ({ ...(d || { likes: 0, comments: [] }), likes: json.likes }));
        return;
      }
    } catch (e) {}
    // fallback
    setData((d) => ({ ...(d || { likes: 0, comments: [] }), likes: ((d?.likes || 0) + 1) }));
  }

  async function submitComment() {
    const text = draft.trim();
    if (!text) return;
    try {
      const res = await fetch(`/api/cities/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'comment', comment: text }) });
      if (res.ok) {
        const json = await res.json();
        setData((d) => ({ ...(d || { likes: 0, comments: [] }), comments: json.comments }));
        setDraft("");
        return;
      }
    } catch (e) {}
    // fallback to local
    setData((d) => ({ ...(d || { likes: 0, comments: [] }), comments: [...(d?.comments || []), text] }));
    setDraft("");
  }

  if (!city) return <div className="p-6">City not found</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-800 to-gray-700 text-white">
      <div className="max-w-4xl mx-auto">
        <button className="mb-4" onClick={() => router.push('/')}>← Back</button>
        <h1 className="text-3xl font-bold mb-4">{city.name.pt} / {city.name.en}</h1>
        <div className="flex items-center justify-between">
          <Slider images={city.images} altPrefix={city.name.en} captions={city.imagesCaptions} lang={lang} />
          <div className="ml-4 flex flex-col gap-2">
            <button onClick={() => setLang('pt')} className={`px-3 py-1 rounded ${lang==='pt'?'bg-white/10':''}`}>PT</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded ${lang==='en'?'bg-white/10':''}`}>EN</button>
          </div>
        </div>

        <section className="mt-6 bg-white/5 rounded p-4">
          <h2 className="font-semibold mb-2">{city.name.pt}</h2>
          <p className="text-sm">{city.description?.pt}</p>
          <p className="text-sm mt-2">{city.description?.en}</p>
        </section>

        {city.sightsImages && (
          <section className="mt-4 bg-white/5 rounded p-4">
            <h3 className="font-semibold mb-2">{"Pontos turísticos / Sights"}</h3>
            <div className="grid grid-cols-3 gap-2">
              {city.sightsImages.map((src, i) => (
                <img key={i} src={src} alt={`sight ${i + 1}`} className="w-full h-28 object-cover rounded" />
              ))}
            </div>
          </section>
        )}

        {city.cuisineImages && (
          <section className="mt-4 bg-white/5 rounded p-4">
            <h3 className="font-semibold mb-2">{"Culinária / Cuisine"}</h3>
            <div className="grid grid-cols-2 gap-2">
              {city.cuisineImages.map((src, i) => (
                <img key={i} src={src} alt={`cuisine ${i + 1}`} className="w-full h-36 object-cover rounded" />
              ))}
            </div>
          </section>
        )}

        <div className="mt-4 flex gap-2">
          <Button onClick={like} variant="primary">👍 {data?.likes ?? '...'}</Button>
          <a href="https://wa.me/351938983505" target="_blank" rel="noreferrer" className="bg-green-600 px-4 py-2 rounded-lg">WhatsApp</a>
        </div>

        <section className="mt-4">
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full p-3 rounded bg-white/5" placeholder="Leave a comment / Deixe um comentário" />
          <div className="flex gap-2 mt-2">
            <Button onClick={submitComment} variant="primary">{`Comment / Comentar`}</Button>
            <div className="text-sm self-center">{(data?.comments?.length ?? 0)} comments</div>
          </div>
          <div className="mt-3 space-y-2">
            {(data?.comments || []).map((c, i) => (
              <div key={i} className="bg-white/5 p-2 rounded">{c}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
