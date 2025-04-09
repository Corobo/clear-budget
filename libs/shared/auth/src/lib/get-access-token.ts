import { getServerSession } from 'next-auth';
import { authOptions } from '../config/auth-options';

export const getAccessToken = async (): Promise<string | undefined> => {
  const session = await getServerSession(authOptions);
  return session?.accessToken as string | undefined;
};
