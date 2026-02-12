import sql from "../../db.js";

export const findUserByUsername = async (username) => {
    const result = await sql`
    SELECT * FROM "user" 
    WHERE username = ${username}`;
    return result[0];
};

export const saveRefreshToken = async (userId, token, expiresAt) => {
    return await sql`
    INSERT INTO public.refresh_tokens (user_id, token, expires_at) 
    VALUES (${userId}, ${token}, ${expiresAt})
`;
};
