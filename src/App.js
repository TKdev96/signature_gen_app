import React, { useState } from "react";
import Template from "./components/Template";
import AddData from "./components/AddData";

function App() {
  const [userData, setUserData] = useState([]);

  const addDataHandler = (name, firstname, job, email, phone, file) => {
    setUserData((prevUserData) => {
      return [
        ...prevUserData,
        {
          name: name,
          firstname: firstname,
          job: job,
          email: email,
          phone: phone,
          file: file
        },
      ];
    });
  };

  return (
    <div className="join-form__content">
      <img
        className="logo-img"
        src="https://deligoo.pl/_next/image?url=%2Fimages%2Fshared%2Flogo-with-text.svg&w=256&q=75"
      />
      <h3 className="title">Signature Generator</h3>
      <h5 className="subtitle">for employees of the DeliGoo company</h5>
      <div className="form-wrapper">
        <AddData onAddData={addDataHandler} />
        <Template data={userData} />
      </div>
    </div>
  );
}

export default App;
