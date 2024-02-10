import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <div className="flex items-center justify-center mx-20 my-10 shadow-lg">
                <Outlet />
            </div>
        </>
    )
}

export default Layout