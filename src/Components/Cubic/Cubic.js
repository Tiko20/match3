import "./Cubic.css"
const Cubic = (props) => {
    return(
        <div className={`cubic ${props.class}`}>
            [{props.col},
            {props.row}]
        </div>
    )
};
export default Cubic;
