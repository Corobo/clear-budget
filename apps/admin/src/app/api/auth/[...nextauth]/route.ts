// apps/admin/src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@clear-budget/shared/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
