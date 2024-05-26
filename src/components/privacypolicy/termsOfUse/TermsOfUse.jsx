import menuItems from "../../../data/navdata/Data";
import Navbar from "../../../layout/navbar/Navbar";
import StaticPage from "../../common/StaticPage";
import Footer from "../../home/footer/Footer";

export default function TermsOfUse() {
  return (
    <>
      <Navbar data={menuItems} redirect="/" />

      <StaticPage endpoint={"termsAndConditions"} />
      <Footer redirect="/" />
    </>
  );
}
