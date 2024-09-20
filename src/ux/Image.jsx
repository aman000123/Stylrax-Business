
import PropTypes from "prop-types";
import dummyImage from "../../src/assets/image/dummyImage.webp";

const Image = ({ alt, className, imageUrl }) => {
  return (
    <img
      src={imageUrl || dummyImage}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = dummyImage;
        e.target.alt = "Default Image";
      }}
    />
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
