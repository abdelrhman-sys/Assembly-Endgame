export default function Letter(props) {
    let color = "#EC5D49";
    if (props.guessedKeys[0] && props.guessedKeys.some(keyObj=> props.value === keyObj.key)) { // this letter is guessed right
        color = "#F9F4DA";
    }
        
    function showLetter() {
        if (props.guessedKeys.some(({key})=> key === props.value) || props.isWon===false) { // guessed right or lost
            return props.value;
        }
    }

    return (
        <div className="letter-div">
            <p className="letter" style={{color: color}}>{showLetter()}</p>
        </div>
    )
}