import techLogo from '../icons/techLogo.ico';

const IconComponent = () => {
  return (
    <div>
      <img className='w-auto h-6 sm:h-7' src={techLogo} alt="Tech Logo" />
    </div>
  );
};

export default IconComponent;