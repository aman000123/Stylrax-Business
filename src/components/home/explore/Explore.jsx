import styles from "../explore/Explore.module.css";

export default function Explore() {
  let data = (
    <p>
      Discover success stories from Stylrax partners themselves. Committed to<br />
      safety, security, and ease, our platform has empowered them to expand<br />
      their businesses and reach new heights.
      {/* &quot;Explore success stories from freelancers and salon owners who have */}
      {/* <br /> thrived on Stylrax. Learn how our platform has helped them expand */}
      {/* their */}
      {/* <br /> client base and achieve new heights in their careers */}
    </p>
  );
  return (
    <div className={styles.textCenter}>
      <p className="text-center">{data}</p>
    </div>
  );
}
