import menuItems from "../../../data/navdata/Data";
import Navbar from "../../../layout/navbar/Navbar";
import StaticPage from "../../common/StaticPage";
import Footer from "../../home/footer/Footer";

export default function ContactUs() {
  return (
    <div className="pageContent">
      <Navbar data={menuItems} redirect="/"/>
      <StaticPage endpoint={"contactUs"} />
      <Footer redirect="/" />
    </div>
  );
}
