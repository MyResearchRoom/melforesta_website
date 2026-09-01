import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({ initialRating = 0, onRate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    setRating(value);
    if (onRate) onRate(value); 
  };

  return (
    <div className="flex items-center space-x-1">
      <p className="text-xs md:text-sm xl:text-base mr-2">Rate</p>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        const isFilled = value <= (hover || rating);

        return (
          <span
            key={index}
            className="text-xl cursor-pointer transition-colors"
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
          >
            {isFilled ? (
              <AiFillStar className="text-yellow-400" />
            ) : (
              <AiOutlineStar className="text-gray-400" />
            )}
          </span>
        );
      })}
    </div>
  );
}
