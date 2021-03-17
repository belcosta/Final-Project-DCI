import React from "react";
import { Rating } from "semantic-ui-react";

// Helper function to generate a SVG star and control its fill color
function SvgStar(props) {
  // Initial State: Star is empty (fill=none)
  const { fill = "none" } = props;
  return (
    //className="star-icon"
    <Rating
      style={{ width: "40px", margin: "auto" }}
      icon="star"
      size="large"
      defaultRating={1}
      maxRating={1}
      className="star-icon"
      fill={fill}
      height="24"
      stroke="#2F2E41"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      ></path>
    </Rating>
  );
}

export default function Star(props) {
  const starColor = "#706fd3";
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;
  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return starColor;
    } else if (!hoverRating && rating >= index) {
      return starColor;
    }
    return "none";
  }, [rating, hoverRating, index]);
  return (
    <figure
      style={{ margin: "5px" }}
      className="star-container"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <SvgStar fill={fill} />
    </figure>
  );
}
