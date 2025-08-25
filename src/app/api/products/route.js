import clientPromise from "@/library/mongodb";

// post method here
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("phones_store");
    const result = await db.collection("products").insertOne(body);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// GET method here
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("phones_store");
    const products = await db.collection("products").find().toArray();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}