import Footer from "../home/Footer";
import Navbar from "../navbar/Navbar";

export default function FrontendLayout({children}: {children:React.ReactNode}) {
    return (
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <Navbar />
            {children}
            <Footer/>
        </div>
    )
}