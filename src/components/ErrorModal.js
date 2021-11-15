import classes from "./ErrorModal.module.css";
import Card from "./Card";


const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h3>{props.title}
          </h3>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <button className="btn btn--primary" onClick={props.onConfirm}>Zamknij</button>
        </footer>
      </Card>
    </div>
  );
};
export default ErrorModal;
