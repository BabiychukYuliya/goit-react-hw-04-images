import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={() => onClickImage(largeImageURL)}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
