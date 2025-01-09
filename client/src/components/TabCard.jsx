import React, { useState } from "react";

const TabCard = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => setActiveTab("tab1")}
            >
              Preguntas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => setActiveTab("tab2")}
            >
              Documentos
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body">
        {activeTab === "tab1" && (
          <>
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </>
        )}
        {activeTab === "tab2" && (
          <>
            <h5 className="card-title">Another title treatment</h5>
            <p className="card-text">
              Different supporting text below as a natural lead-in to additional
              content.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TabCard;