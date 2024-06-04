import "../app/globals.css"

const Alert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

export default Alert;