import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const RadialProgressBar = ({ progress, size, strokeWidth, color, hidden }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.svg
        width={size}
        height={size}
        className="progress-bar text-xs"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <circle
          className="opacity-20"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <AnimatePresence>
          {!hidden && (
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".35em"
              fontSize="1.5em"
              fontWeight="700"
              fill={color}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {progress}
            </motion.text>
          )}
        </AnimatePresence>
      </motion.svg>
    </AnimatePresence>
  );
};

export default RadialProgressBar;
