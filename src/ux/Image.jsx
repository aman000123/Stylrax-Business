import salondetailimg from "../assets/image/salondetailimg.png";
const Image = ({ alt, className }) => {
  return (
    <img src={salondetailimg} alt={alt} className={className} />
  );
}

export default Image;