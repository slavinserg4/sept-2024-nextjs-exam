// components/Menu/Menu.tsx
import Link from "next/link";

interface MenuProps {
    isAuthenticated: boolean;
    userName?: string;
    userImage?: string;
}

const Menu = ({ isAuthenticated, userName, userImage }: MenuProps) => {
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
