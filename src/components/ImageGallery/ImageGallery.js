import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onModal={onModal} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onModal: PropTypes.func.isRequired,
};
export default ImageGallery;
