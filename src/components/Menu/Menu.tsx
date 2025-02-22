import Link from "next/link";
import {cookies} from "next/headers";


const Menu = async () => {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
    const userImage = cookieStore.get('userImage')?.value || '';
    const userName = cookieStore.get('userName')?.value || '';
    return (
        <div>
            <nav>
                {isAuthenticated ? (
                    <>
                        <Link href="/users">Users</Link>
                        <Link href="/recipes">Recipes</Link>
                        <div>
                            {userImage ? (
                                <img src={userImage} alt="User Logo" style={{ width: '50px', height: '50px' }} />
                            ) : (
                                <span>{userName}</span>
                            )}
                        </div>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </nav>
        </div>
    );
};

export default Menu;
