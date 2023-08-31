import { useState } from "react";
import "./menu-lateral.css";

export const MenuLateral = () => {

  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="box">
      <div className="side-menu">
        <img className="logo" alt="Logo" src="src\assets\menu-lateral\logo-menu-bg-branco.png" />
        <div className="list">
          <div className={`dashboard menu-item ${activeItem === "dashboard" ? "active" : ""}`} 
            onClick={() => handleItemClick("dashboard")}>
            <img className="icone" alt="Icone" src={`src\components\menu-lateral\imagens\icon-dashboard-${activeItem === "dashboard" ? "branco" : "cinza"}.png`}/>
            <div className={`text ${activeItem === "dashboard" ? "active" : ""}`}>Dashboard</div>
          </div>
          <div className={`unidade-geradora menu-item ${activeItem === "unidade-geradora" ? "active" : ""}`} onClick={() => handleItemClick("unidade-geradora")}>
            <img className="icone" alt="Icone" src={`src\components\menu-lateral\imagens\icone-cadastrar-${activeItem === "dashboard" ? "branco" : "cinza"}.png`} />
            <div className={`text ${activeItem === "unidade-geradora" ? "active" : ""}`}>Unidades</div>
          </div>
          <div className={`consumo menu-item ${activeItem === "consumo" ? "active" : ""}`} onClick={() => handleItemClick("consumo")}>
            <img className="icone" alt="Icone" src={`src/componentes/manu-lateral/imagens/icone-unidades-${activeItem === "dashboard" ? "branco" : "cinza"}.png`} />
            <div className={`text ${activeItem === "consumo" ? "active" : ""}`}>Cadastro de energia grada</div>
          </div>
        </div>
      </div>
    </div>
  )
};
