// MainLayout.tsx
import { NavLink, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "./MainLayout.css";

export const MainLayout = () => {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">🎬</div>
                    <div className="sidebar-logo-text">Serivia</div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            "sidebar-link" + (isActive ? " sidebar-link--active" : "")
                        }
                    >
                        <span className="sidebar-link-dot" />
                        <span>Home</span>
                    </NavLink>
                </nav>
            </aside>

            <main className="main">

                <Header />

                <section className="main-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};
