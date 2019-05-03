import React from "react";
import PropTypes from "prop-types";
import { animated, interpolate } from "react-spring/hooks";

class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const { name, text, pic } = data[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div className="card">
            <img src={pic} alt="profilePicture" />
            <h2>{name}</h2>
            <h5>{text}</h5>
          </div>
        </animated.div>
      </animated.div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  genre: PropTypes.string,
  director: PropTypes.string,
  text: PropTypes.string,
  pic: PropTypes.array
};

export default Card;