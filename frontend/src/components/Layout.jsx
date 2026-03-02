import Header from "./Header";
function Layout({children}){
    return(
        <section className="w-screen h-screen">
            <Header/>
            {children}
        </section>
    );

}
export default Layout;