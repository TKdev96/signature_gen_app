import React, { useState } from "react";
import useInput from "../hooks/use-input";
import ErrorModal from "./ErrorModal";
import classes from "../App.module.css";

const AddData = (props) => {
  const [error, setError] = useState("");
  const [inputFile, setInputFile] = useState("");



  const {
    value: inputName,
    isValid: inputNameIsValid,
    hasError: inputNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: inputNameBlurHandler,
    reset: resetInputName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: inputFirstname,
    isValid: inputFirstnameIsValid,
    hasError: inputFirstnameHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: inputFirstnameBlurHandler,
    reset: resetInputFirstname,
  } = useInput((value) => value.trim() !== "");

  const {
    value: inputJob,
    isValid: inputJobIsValid,
    hasError: inputJobHasError,
    valueChangeHandler: jobChangeHandler,
    inputBlurHandler: inputJobBlurHandler,
    reset: resetInputJob,
  } = useInput((value) => value.trim() !== "");

  const {
    value: inputEmail,
    isValid: inputEmailIsValid,
    hasError: inputEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: inputEmailBlurHandler,
    reset: resetInputEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: inputPhone,
    isValid: inputPhoneIsValid,
    hasError: inputPhoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: inputPhoneBlurHandler,
    reset: resetInputPhone,
  } = useInput((value) => value.trim() !== "" && value.length > 8);

  

  const fileChangeHandler = (event) => {
    let file = event.target.files[0];
    console.log(file);

    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Result', reader.result);
        setInputFile(reader.result);
      }
      reader.readAsDataURL(file);
    }
    
    
  };

  let formIsValid = false;

  if (
    inputNameIsValid &&
    inputFirstnameIsValid &&
    inputJobIsValid &&
    inputEmailIsValid &&
    inputPhoneIsValid
  ) {
    formIsValid = true;
  }

  const addDataHandler = (event) => {
    event.preventDefault();
    console.log("confirm");

    if (!formIsValid) {
      setError({
        title: "Brakujące dane w formularzu",
        message: "Proszę uzupełnić wszystkie pola.",
      });
      return;
    }

    console.log(
      inputName,
      inputFirstname,
      inputJob,
      inputEmail,
      inputPhone,
      inputFile
    );
    props.onAddData(
      inputName,
      inputFirstname,
      inputJob,
      inputEmail,
      inputPhone,
      inputFile
    );

    resetInputName();
    resetInputFirstname();
    resetInputJob();
    resetInputEmail();
    resetInputPhone();
    setInputFile("");
  };

  const errorHandler = () => {
    setError("");
  };

  const nameInputClasses = inputNameIsValid ? "dg-input-check" : "dg-input";
  const firstnameInputClasses = inputFirstnameIsValid ? "dg-input-check" : "dg-input";
  const phoneInputClasses = inputPhoneIsValid ? "dg-input-check" : "dg-input";
  const emailInputClasses = inputEmailIsValid ? "dg-input-check" : "dg-input";
  const jobInputClasses = inputJobIsValid ? "dg-input-check" : "dg-input";
  const fileInputClasses = inputFile ? "dg-input-check" : "dg-input";



  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={addDataHandler}>
        <div>
          <input
            className={nameInputClasses}
            placeholder="*Imię"
            type="text"
            onBlur={inputNameBlurHandler}
            onChange={nameChangeHandler}
            value={inputName}
          />
          {inputNameHasError && (
            <p className={classes.errorp}>Wprowadź imię.</p>
          )}
        </div>
        <div>
          <input
            className={firstnameInputClasses}
            placeholder="*Nazwisko"
            type="text"
            onBlur={inputFirstnameBlurHandler}
            onChange={firstnameChangeHandler}
            value={inputFirstname}
          />
          {inputFirstnameHasError && (
            <p className={classes.errorp}>Wprowadź nazwisko.</p>
          )}
        </div>
        <div>
          <input
            className={phoneInputClasses}
            placeholder="*Numer telefonu"
            type="tel"
            onBlur={inputPhoneBlurHandler}
            onChange={phoneChangeHandler}
            value={inputPhone}
          />
          {inputPhoneHasError && (
            <p className={classes.errorp}>Wprowadź numer telefonu.</p>
          )}
        </div>
        <div>
          <input
            className={emailInputClasses}
            placeholder="*Email"
            type="email"
            onBlur={inputEmailBlurHandler}
            onChange={emailChangeHandler}
            value={inputEmail}
          />
          {inputEmailHasError && (
            <p className={classes.errorp}>Wprowadź adres email.</p>
          )}
        </div>
        <div>
          <input
            className={jobInputClasses}
            placeholder="*Stanowisko"
            type="text"
            onBlur={inputJobBlurHandler}
            onChange={jobChangeHandler}
            value={inputJob}
          />
          {inputJobHasError && (
            <p className={classes.errorp}>Wprowadź zajmowane stanowisko.</p>
          )}
        </div>

        <div className={fileInputClasses}>
          <input
            className="dg-input"
            type="file"
            autoComplete="off"
            hidden
            id="upload"
            onChange={fileChangeHandler}
            accept=".jpg, .jpeg, .png,"
          />
          {!inputFile && (
            <label className="label--upload" htmlFor="upload">
              Załącz zdjęcie.jpg
            </label>
          )}
          {inputFile && (
            <label className="label--upload" htmlFor="upload">
              Zdjęcie zostało załączone.
            </label>
          )}
        </div>
            <div>
              </div>
        <div>
          <button className="btn btn--primary btn-right" type="submit">
            Potwierdź
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddData;
