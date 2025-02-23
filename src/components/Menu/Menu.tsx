import Link from "next/link";
import {cookies} from "next/headers";
import './StyleForMenu.css'
const Menu = async () => {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
    const userImage = cookieStore.get('userImage')?.value || '';
    const userName = cookieStore.get('userName')?.value || '';
    return (
        <div className={'MenuMainDiv'}>
            <nav>
                {isAuthenticated ? (
                    <div className={'AuthenticatedMenu'}>
                        <Link className={'usersLink LinksForAllItems'} href="/users">Users</Link>
                        <Link className={'recipesLink LinksForAllItems'} href="/recipes">Recipes</Link>
                        <div className={'divForUser'}>
                            <p className={'userName'}>{userName}</p>
                            <img src={userImage} alt="User Logo" style={{width: '50px', height: '50px'}}/>

                        </div>
                    </div>
                ) : (
                    <Link className={'LinkToLogin'} href="/login">Login</Link>
                )}
            </nav>
        </div>
    );
};

export default Menu;
