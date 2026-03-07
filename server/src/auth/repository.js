import sql from "../../db.js";

export const findUserByUsername = async (username) => {
  const result = await sql`
    SELECT 
      u.*, 
      us.status AS status_name
    FROM "user" u
    JOIN user_status us ON u.status = us.id
    WHERE u.username = ${username}
  `;
  return result[0];
};

export const saveRefreshToken = async (userId, token, expiresAt) => {
  return await sql`
    INSERT INTO refresh_tokens (user_id, token, expires_at) 
    VALUES (${userId}, ${token}, ${expiresAt})
`;
};

export const deleteRefreshToken = async (token) => {
  return await sql`
        DELETE FROM refresh_tokens 
        WHERE token = ${token}
    `;
};

export const findUserById = async (id) => {
  const result = await sql`
    SELECT 
      u.*, 
      us.status AS status_name
    FROM "user" u
    JOIN user_status us ON u.status = us.id
    WHERE u.id = ${id}
  `;
  return result[0];
};
