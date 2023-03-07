import PropTypes from 'prop-types';

const Button = ({onClick}) => {
    return(<button className="Button" onClick={onClick}>Load more</button>)
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}