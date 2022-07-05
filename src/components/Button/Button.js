import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onShowMore }) => {
  return (
    <div className={s.Container}>
      <button className={s.Button} type="button" onClick={onShowMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onShowMore: PropTypes.func.isRequired,
};
export default Button;
