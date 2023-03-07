import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ list, onClickImage }) {
  return (
    <ul className="ImageGallery">
      {list.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickImage: PropTypes.func.isRequired,
};
