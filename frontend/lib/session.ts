'use server';

import { cookies } from 'next/headers';
import { TOKEN_KEY, TOKEN_EXPIRY_KEY } from './utils/constants';


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


export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_KEY);
}


export async function isAuthenticated() {
  const token = await getSession();
  return token !== null;
}

