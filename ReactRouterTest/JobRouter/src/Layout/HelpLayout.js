import { NavLink, Outlet } from "react-router-dom";

export default function HelpLayout() {
    return (
        <div className="help-layout">
            <h2>
                Web Site
            </h2>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, itaque!
            </p>
            <nav>
                {/* we dont say /help/faq since we need only the path that is relative or whatever route we are in which we are in help route already */}
                <NavLink to='faq'>View the FAQ</NavLink>
                <NavLink to='contact'>Contact Us</NavLink>
            </nav>
            {/* this is where any thing nested in the help will be ouputed */}
            <Outlet />
        </div>
    )
}
