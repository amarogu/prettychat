import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import 'dotenv/config';
import { AuthOptions } from 'next-auth';
import connectDb from '../../../../../connect';
import User from '../../../../../models/User';
import bcrypt from 'bcrypt';

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const {name, password} = credentials;
                try {
                    await connectDb();
                    const user = await User.findOne({name});
                    if(!user) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch(err) {
                    console.log(err);
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};