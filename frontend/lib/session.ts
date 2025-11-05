'use server';

import { cookies } from 'next/headers';
import { TOKEN_KEY, TOKEN_EXPIRY_KEY } from './utils/constants';

/**
 * Creates a secure session by setting httpOnly cookies
 * This can only be called from Server Actions or API Routes
 */
export async function createSession(token: string, expiresIn: number): Promise<void> {
  const expiryTime = Date.now() + expiresIn * 1000;


  const cookieStore = await cookies()

  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: expiresIn,
    path: '/',
  });
  
  cookieStore.set(TOKEN_EXPIRY_KEY, expiryTime.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: expiresIn,
    path: '/',
  });
}

/**
 * Gets the current session token
 * Returns null if token is expired or doesn't exist
 */
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_KEY)?.value;
  const expiry = cookieStore.get(TOKEN_EXPIRY_KEY)?.value;

  if (!token || !expiry) {
    return null;
  }

  const expiryTime = parseInt(expiry, 10);
  if (Date.now() >= expiryTime) {
    await deleteSession();
    return null;
  }

  return token;
}

/**
 * Deletes the session by removing cookies
 */
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_KEY);
}

/**
 * Checks if user is authenticated
 */
export async function isAuthenticated() {
  const token = await getSession();
  return token !== null;
}

