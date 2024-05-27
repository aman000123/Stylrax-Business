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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await serviceCategory();
        setCategories(res.data);
        Notify.success(res.message);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCloseViewMore = () => {
    setHaircut(false);
  };

  const handleViewMore = (id) => {
    setSelectedCategoryId(id);
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
                          <button onClick={() => handleViewMore(category.id)}>
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
