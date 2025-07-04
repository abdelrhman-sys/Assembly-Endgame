export default function Language(props) {
    let isDead = 1;
    if (props.langCount >= props.index) {
        isDead = 0.2;
    }

    let langStyle = {
        opacity: isDead,
        backgroundColor: `${props.bg}`,
        color: `${props.color}`
    }
    
    return (
        <div className="lang-container">
            <button 
                style={langStyle} 
                className="lang">
            {props.name}
            </button>
            <span className="lang-span" style={{display : isDead !==1? "block": "none"}}>💀</span>
        </div>
    )
}