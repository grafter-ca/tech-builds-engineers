import pool from "@/lib/db";

export async function GET() {

    try {
        const res =  await (pool as any).query("SELECT id, name, email, role, is_verified, created_at, updated_at FROM users");
        const users = res.rows;
        return new Response(JSON.stringify({ users }), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}