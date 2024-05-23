import menuItems from "../../../data/navdata/Data";
import Navbar from "../../../layout/navbar/Navbar";
import StaticPage from "../../common/StaticPage";
import Footer from "../../home/footer/Footer";

export default function ContactUs() {
  return (
    <>
      <Navbar data={menuItems} />
      <div className="container my-2">
        <div className="row">
          <div className="col">
            <StaticPage endpoint={"contactUs"} />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
