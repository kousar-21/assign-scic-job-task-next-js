import clientPromise from "@/library/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("phones_store");

    const data = await req.json();
    
    const result = await db.collection("users").insertOne(data);
    
    return new Response(JSON.stringify({ insertedId: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
