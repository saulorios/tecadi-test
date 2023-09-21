import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function MenuDropDown({label, options, selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    console.log(label, options, selected)
    return (
        <div className="drop-down">
            <div className="drop-down-btn" onClick={(e) => 
                setIsActive(!isActive)}>
                    {label}
            <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive && (
                <div className="drop-down-content">
                {options.map((opt) => (
                    <div 
                        onClick={(e) => {
                            setSelected({qtd: opt})
                            setIsActive(false)
                        }}
                    className="drop-down-item">
                        {opt}
                    </div>
                ))}
                </div>                
            )}
        </div>
    );
}
export default MenuDropDown;