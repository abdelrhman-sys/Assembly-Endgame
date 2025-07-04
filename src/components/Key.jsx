export default function Key(props) {
    let keyObj= undefined;
    
    for(const keyElement of props.keysColors){
        if (keyElement.key === props.value) {
            keyObj = keyElement;
            break;
        }
    }
    let keyStyle = {backgroundColor: keyObj? keyObj.color: "#FCBA29"};

    return (
         <button 
            className="key" 
            onClick={props.onClick} 
            style={keyStyle} 
            disabled={props.disable} 
            aria-disabled={props.disable}
        >
        {props.value}
        </button>
    )
}