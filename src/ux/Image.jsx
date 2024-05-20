import dummyImage from "../../src/assets/image/dummyImage.webp";
const Image = ({ alt, className ,imageUrl}) => {
  return (
    <img src={imageUrl!== "" ? imageUrl:dummyImage} alt={alt} className={className} />
  );
}

export default Image;