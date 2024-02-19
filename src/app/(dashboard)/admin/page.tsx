import Users from '@/components/auth/Users';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <div>
            <h1>Admin page </h1>
            <p>welcome to {session?.user.city} </p>
            <Users />
        </div>
    );
};

export default page;
