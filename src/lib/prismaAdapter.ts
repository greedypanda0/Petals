// import type { Adapter } from "@auth/core/adapters";
// import { PrismaClient } from "@prisma/client";

// export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
//   return {
//     // USER ------------------------------
//     async createUser(data) {
//       if (!data.email) throw new Error("Cannot create user without email.");

//       const existing = await prisma.user.findUnique({
//         where: { email: data.email },
//       });

//       if (existing) return existing;

//       return prisma.user.create({
//         data: {
//           ...data,
//           created_at: new Date(),
//         },
//       });
//     },

//     async getUser(id) {
//       return prisma.user.findUnique({ where: { id } });
//     },

//     async getUserByEmail(email) {
//       return prisma.user.findUnique({ where: { email } });
//     },

//     async getUserByAccount({ provider, providerAccountId }) {
//       const account = await prisma.account.findUnique({
//         where: {
//           provider_providerAccountId: {
//             provider,
//             providerAccountId,
//           },
//         },
//         include: { user: true },
//       });

//       return account?.user ?? null;
//     },

//     async updateUser(user) {
//       return prisma.user.update({
//         where: { id: user.id },
//         data: user,
//       });
//     },

//     async deleteUser(userId) {
//       return prisma.user.delete({
//         where: { id: userId },
//       });
//     },

//     // ACCOUNT ------------------------------
//     async linkAccount(account) {
//       return prisma.account.create({ data: account });
//     },

//     async unlinkAccount({ provider, providerAccountId }) {
//       return prisma.account.delete({
//         where: {
//           provider_providerAccountId: {
//             provider,
//             providerAccountId,
//           },
//         },
//       });
//     },

//     // SESSION ------------------------------
//     async createSession(data) {
//       return prisma.session.create({ data });
//     },

//     async getSessionAndUser(sessionToken) {
//       const session = await prisma.session.findUnique({
//         where: { sessionToken },
//         include: { user: true },
//       });

//       if (!session) return null;

//       const { user, ...sessionData } = session;
//       return { session: sessionData, user };
//     },

//     async updateSession(data) {
//       return prisma.session.update({
//         where: { sessionToken: data.sessionToken },
//         data,
//       });
//     },

//     async deleteSession(sessionToken) {
//       return prisma.session.delete({
//         where: { sessionToken },
//       });
//     },

//     // VERIFICATION TOKEN ------------------------------
//     async createVerificationToken(data) {
//       return prisma.verificationToken.create({ data });
//     },

//     async useVerificationToken({ identifier, token }) {
//       try {
//         return await prisma.verificationToken.delete({
//           where: {
//             identifier_token: {
//               identifier,
//               token,
//             },
//           },
//         });
//       } catch {
//         return null;
//       }
//     },
//   };
// }
