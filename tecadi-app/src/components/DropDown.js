import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function DropDown(props) {
    // console.log(props)
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="drop-down">
            <div 
                className="drop-down-btn" 
                onClick={(e) => setIsActive(!isActive)}>
                {props.label}
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isActive && (
                <div className="drop-down-content">
                {props?.options.map((item, index) => 
                    <div key={index}>
                        <div name={props.name} onClick={(e) => {
                            props.onChange(props.name, item)
                            setIsActive(false)
                        }} className="drop-down-item">{item}</div>
                    </div>
                )}
                </div> 
            )}
        </div>
    );
}

export default DropDown;