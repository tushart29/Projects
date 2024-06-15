import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs";
const RootLayout = () => {
    return (

        <div className="root-layout">
            <header>
                <nav>
                    <h1>JobRouter</h1>
                    <NavLink to='/'>Home</NavLink>

                    {/* by using the navlinks you can style better. in html, it will make this link active . you can change the css only if the page is active */}
                    <NavLink to='about'>About</NavLink>
                    {/* by adding the above, it will look at the link and then match the route path below, and request to server is intercepted, content is just swapped and not get fresh copies of html*/}
                    <NavLink to='help'>Help</NavLink>
                    <NavLink to='careers'>Careers</NavLink>
                </nav>
                <Breadcrumbs />
            </header>

            <main>
                <Outlet />
            </main>

        </div>

    );
}

export default RootLayout;
