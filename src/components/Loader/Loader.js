import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.Container}>
      <Oval color="#00BFFF" height={120} width={120} />
    </div>
  );
};

export default Loader;
