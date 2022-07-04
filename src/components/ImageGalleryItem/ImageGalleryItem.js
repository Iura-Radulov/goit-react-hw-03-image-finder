import s from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ image, showModal }) => {
  return (
    <li className={s.Item}>
      <button
        type="button"
        className={s.Button}
        onClick={() => showModal(image.largeImageURL)}
      >
        <img className={s.Image} src={image.webformatURL} alt={image.tags} />
      </button>
    </li>
  );
};
export default ImageGalleryItem;
