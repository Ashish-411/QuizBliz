import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout(){
    return(
        <section className="w-screen h-screen">
            <Header/>
            <Outlet/>
        </section>
    );

}
export default Layout;