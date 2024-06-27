import { useEffect, useState } from "react";
import styles from "./Services.module.css";
import { Paper} from "@mui/material";
import AddService from "../AddService/AddService";
import Notify from "../../../utils/notify";
import { serviceCategory } from "../../../api/salon.management";
import GetServices from "./GetServices";

function ProvideServices() {
  const [addServiceVisible, setAddServiceVisible] = useState(false);
  const [haircut, setHaircut] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // New state variable
  const [categories, setCategories] = useState([]);
  // console.log("Provide Categories", categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await serviceCategory();
        setCategories(res.data);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCloseViewMore = () => {
    setHaircut(false);
  };

  const handleViewMore = (id, name) => {
    setSelectedCategoryId(id.toString());
    setSelectedCategoryName(name); // Set the selected category name
    setHaircut(true);
  };

  const handleCloseAddService = () => {
    setAddServiceVisible(false);
  };

  return (
    <div>
      {haircut ? (
        <GetServices
          id={selectedCategoryId}
          categoryName={selectedCategoryName} // Pass the category name to GetServices
          onViewMore={() => setHaircut(false)}
          onClose={handleCloseViewMore}
        />
      ) : (
        <div className={styles.secDiv}>
          {addServiceVisible ? (
            <AddService onClose={handleCloseAddService} />
          ) : (
            <div className={styles.addService}>
              <div className={styles.services}>
                {categories.map((category) => (
                  <Paper className={styles.paper} key={category.id}>
                    <div className={styles.imgDiv}>
                      <img src={category.imageUrl} alt={category.name} />
                    </div>
                    <div className={styles.text}>
                      <p>
                        {category.name}
                        <br />
                        <span className={styles.spanTwo}>
                          <button onClick={() => handleViewMore(category.id, category.name)}>
                            View All
                          </button>
                        </span>
                      </p>
                    </div>
                  </Paper>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProvideServices;
