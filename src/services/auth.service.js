import { MOCK_USERS } from "../data/mockData";

const TOKEN_KEY = "edu_broadcast_user";

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginUser(email, password) {
  await delay();

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password. Please try again.");
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    teacherId: user.teacherId || null,
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(safeUser));

  return safeUser;
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}
