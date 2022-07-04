import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';
const ImageGallery = ({ images, showModal }) => {
  console.log(images);
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} showModal={showModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
