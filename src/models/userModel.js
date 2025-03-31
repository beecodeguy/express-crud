import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
export const createUserService = async (user) => {
  const { name, email } = user;
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};
export const updateUserService = async (id, user) => {
  const { name, email } = user;
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

export const deleteUserService = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
};
export const deleteAllUsersService = async () => {
  const result = await pool.query("DELETE FROM users");
  return result.rowCount > 0;
};
export const getUserByEmailService = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
export const getUserByNameService = async (name) => {
  const result = await pool.query("SELECT * FROM users WHERE name = $1", [
    name,
  ]);
  return result.rows[0];
};
export const getUserByEmailAndNameService = async (email, name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND name = $2",
    [email, name]
  );
  return result.rows[0];
};
export const getUserByIdAndEmailService = async (id, email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND email = $2",
    [id, email]
  );
  return result.rows[0];
};
export const getUserByIdAndNameService = async (id, name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND name = $2",
    [id, name]
  );
  return result.rows[0];
};
export const getUserByIdAndEmailAndNameService = async (id, email, name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND email = $2 AND name = $3",
    [id, email, name]
  );
  return result.rows[0];
};
export const getUserByIdAndEmailOrNameService = async (id, email, name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND (email = $2 OR name = $3)",
    [id, email, name]
  );
  return result.rows[0];
};
export const getUserByEmailOrNameService = async (email, name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR name = $2",
    [email, name]
  );
  return result.rows[0];
};
