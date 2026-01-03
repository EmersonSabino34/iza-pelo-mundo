import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'city-data.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function writeData(d: any) {
  try {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify(d, null, 2), 'utf-8');
  } catch (e) {
    // ignore
  }
}

export async function GET(request: any, { params }: any) {
  const id = params?.id;
  const data = readData();
  const city = data[id] || { likes: 0, comments: [] };
  return NextResponse.json(city);
}

export async function POST(request: any, { params }: any) {
  const id = params?.id;
  const body = await (request.json ? request.json().catch(() => ({})) : Promise.resolve({}));
  const data = readData();
  if (!data[id]) data[id] = { likes: 0, comments: [] };
  // Simple API key validation for POST requests
  const API_KEY = process.env.CITY_API_KEY || "dev-key";
  const provided = request.headers.get('x-api-key');
  if (!provided || provided !== API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (body.action === 'like') {
    data[id].likes = (data[id].likes || 0) + 1;
    writeData(data);
    return NextResponse.json({ likes: data[id].likes });
  }

  if (body.action === 'comment' && typeof body.comment === 'string' && body.comment.trim()) {
    data[id].comments = data[id].comments || [];
    // basic sanitization: trim and limit length
    const comment = body.comment.trim().slice(0, 1000);
    data[id].comments.push(comment);
    writeData(data);
    return NextResponse.json({ comments: data[id].comments });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
