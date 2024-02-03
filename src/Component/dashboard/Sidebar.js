import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { MdOutlineContentCut } from "react-icons/md";
import { MdOutlineAccessibility } from "react-icons/md";
import { MdOutlineContentPaste } from "react-icons/md";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { MdOutlineContactMail } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdSettingsSuggest } from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar=(props)=> {
  const feature = useSelector(state => state.feature.value);

  console.log("Features in state::>", feature);
  const menus = [
    {
      icon: <FaChartPie />,
      slug: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: <MdOutlineSupervisorAccount />,
      slug: "/user-management",
      label: "User Management",
    },
    {
      icon: <MdOutlineContentCut />,
      slug: "/salon-management",
      label: "Salon Management",
    },
    {
      icon: <MdOutlineAccessibility />,
      slug: "/freelance-management",
      label: "Freelance Management",
    },
    {
      icon: <MdOutlineContentPaste />,
      slug: "/service-type-management",
      label: "Service Type Management",
    },
    {
      icon: <MdOutlineConfirmationNumber />,
      slug: "/coupon-management",
      label: "Coupon Management",
    },
    {
      icon: <MdOutlineSupervisorAccount />,
      slug: "/appointment-management",
      label: "Appointment Management",
    },
    {
      icon: <RiBarChartFill />,
      slug: "/sales-person",
      label: "Sales Person",
    },
    {
      icon: <MdOutlineContactMail />,
      slug: "/ads-management",
      label: "ADS Management",
    },
    {
      icon: <MdOutlinePayment />,
      slug: "/payment-management",
      label: "Payment Management",
    },
    {
      icon: <IoMdNotifications />,
      slug: "/notification",
      label: "Notification",
    },
    {
      icon: <MdSettingsSuggest />,
      slug: "/setting",
      label: "Setting",
    },
  ];
  return (
    <ul className="sidebar list-unstyled">
      {menus.map((item, i) => {
        return (
          <li key={i}>
            <NavLink to={item.slug} className="text-decoration-none text-dark " exact>
            <div className="side-nav-item">
              <span className="side-nav-icon m-auto " >{item.icon}</span>
              {props.toggleSidebar && (
                <span className="side-nav-label m-auto ps-2 ">{item.label}</span>
              )}
            </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
export default Sidebar;