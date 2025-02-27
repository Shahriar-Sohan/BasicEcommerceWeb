import Navbar from "@/component/Navbar"
import SideBar from "./sideBar"
import AllProducts from "./AllProducts"



function Products() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-row" >
                <SideBar/>
                <AllProducts/>
            </div>

        </div>
    )
}

export default Products