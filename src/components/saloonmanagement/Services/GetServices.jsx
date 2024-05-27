// import { useEffect, useState } from "react";
// import styles from "./Services.module.css";
// import { Paper, Button } from "@mui/material";
// import { IoMdAddCircle } from "react-icons/io";
// import AddService from "../AddService/AddService";
// import ViewMore from "../Viewmore/ViewMore";
// import Notify from "../../../utils/notify";
// import { salonService } from "../../../api/salon.management";
// import Session from "../../../service/session";
// import servicesimg from "../../../assets/image/servicesimg.png";

// function GetServices({ id }) {
//   const [addServiceVisible, setAddServiceVisible] = useState(false);
//   const [haircut, setHaircut] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [services, setServices] = useState([]);
//   console.log("services", services);
//   const salonId = Session.get("salonId");
//   const fetchCategories = async () => {
//     try {
//       const res = await salonService(salonId, id);
//       setServices(res.data);
//       Notify.success(res.message);
//     } catch (error) {
//       Notify.error(error.message);
//     }
//   };
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCloseViewMore = () => {
//     setHaircut(false);
//   };

//   const handleViewMore = (id) => {
//     setSelectedCategoryId(id);
//     setHaircut(true);
//   };

//   const handleOpenAddService = () => {
//     setAddServiceVisible(true);
//   };

//   const handleCloseAddService = () => {
//     setAddServiceVisible(false);
//   };

//   return (
//     <div>
//       {haircut ? (
//         <ViewMore
//           id={selectedCategoryId}
//           onViewMore={() => setHaircut(false)}
//           onClose={handleCloseViewMore}
//           updatedData={fetchCategories}

//         />
//       ) : (
//         <div className={styles.secDiv}>
//           {addServiceVisible ? (
//             <AddService
//               onClose={handleCloseAddService}
//               updatedData={fetchCategories}
//               id={id}
//             />
//           ) : (
//             <div className={styles.addService}>
//               <div className={styles.services}>
//                 {services.map((category) => (
//                   <Paper className={styles.paper} key={category.id}>
//                     <div className={styles.imgDiv}>
//                       <img src={servicesimg} alt="" />
//                     </div>
//                     <div className={styles.text}>
//                       <p>
//                         {category.serviceName}
//                         <br />
//                         {category.servicePrice}
//                         <br />
//                         <span className={styles.spanTwo}>
//                           <button onClick={() => handleViewMore(category.id)}>
//                             View All
//                           </button>
//                         </span>
//                       </p>
//                     </div>
//                   </Paper>
//                 ))}
//                 <div className={styles.iconDiv}>
//                   <Button
//                     onClick={handleOpenAddService}
//                     style={{ color: "black" }}
//                   >
//                     <IoMdAddCircle className={styles.icon} />
//                   </Button>
//                   <p>Add More Services</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default GetServices;





import { useEffect, useState } from "react";
import styles from "./Services.module.css";
import { Paper, Button, Select, MenuItem } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import AddService from "../AddService/AddService";
import ViewMore from "../Viewmore/ViewMore";
import Notify from "../../../utils/notify";
import { salonService } from "../../../api/salon.management";
import Session from "../../../service/session";
import servicesimg from "../../../assets/image/servicesimg.png";

function GetServices({ id }) {
  const [addServiceVisible, setAddServiceVisible] = useState(false);
  const [haircut, setHaircut] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [services, setServices] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");

  console.log("services", services);
  const salonId = Session.get("salonId");

  const fetchCategories = async () => {
    try {
      const res = await salonService(salonId, id);
      setServices(res.data);
      Notify.success(res.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCloseViewMore = () => {
    setHaircut(false);
  };

  const handleViewMore = (id) => {
    setSelectedCategoryId(id);
    setHaircut(true);
  };

  const handleOpenAddService = () => {
    setAddServiceVisible(true);
  };

  const handleCloseAddService = () => {
    setAddServiceVisible(false);
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    genderFilter ? service.type === genderFilter : true
  );

  return (
    <div>
    
      {haircut ? (
        <ViewMore
          id={selectedCategoryId}
          onViewMore={() => setHaircut(false)}
          onClose={handleCloseViewMore}
          updatedData={fetchCategories}
        />
        
      ) : (
        
        <div className={styles.secDiv}>
        
        
          {addServiceVisible ? (
            <AddService
              onClose={handleCloseAddService}
              updatedData={fetchCategories}
              id={id}
            />
          ) : (
            
            <div className={styles.addService}>
               <div>
         <select
            value={genderFilter}
            onChange={handleGenderChange}
            //displayEmpty
            className={styles.genderFilter}
          >
            <option value="">
              <em>All</em>
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
         </div>
              <div className={styles.services}>
                {filteredServices.map((category) => (
                  <Paper className={styles.paper} key={category.id}>
                    <div className={styles.imgDiv}>
                      <img src={servicesimg} alt="" />
                    </div>
                    <div className={styles.text}>
                      <p>
                        {category.serviceName}
                        <br />
                        {category.servicePrice}
                        <br />
                        <span className={styles.spanTwo}>
                          <button onClick={() => handleViewMore(category.id)}>
                            View All
                          </button>
                        </span>
                      </p>
                    </div>
                  </Paper>
                ))}
                <div className={styles.iconDiv}>
                  <Button
                    onClick={handleOpenAddService}
                    style={{ color: "black" }}
                  >
                    <IoMdAddCircle className={styles.icon} />
                  </Button>
                  <p>Add More Services</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GetServices;
