import { motion } from "framer-motion";
import carIcon from "../assets/car-svgrepo-com.svg";
import vanIcon from "../assets/van-svgrepo-com.svg";
import truckIcon from "../assets/truck-svgrepo-com.svg";
import motorcycleIcon from "../assets/motorcycle-svgrepo-com.svg";
import ambulanceIcon from "../assets/ambulance-svgrepo-com.svg";
import policeIcon from "../assets/police-car-svgrepo-com.svg";

const icons = {
  car: carIcon,
  van: vanIcon,
  truck: truckIcon,
  motorcycle: motorcycleIcon,
  ambulance: ambulanceIcon,
  police: policeIcon,
};

export default function Vehicle({ type = "car", x, y, stopped = false, id }) {
  const icon = icons[type] || carIcon;
  return (
    <motion.img
      src={icon}
      alt={type}
      style={{
        position: "absolute",
        width: 60,
        height: 60,
        zIndex: 20,
        filter: stopped ? "grayscale(0.7) opacity(0.7)" : "none",
        pointerEvents: "none",
        left: x,
        top: y,
      }}
      animate={{ left: x, top: y }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      id={id}
    />
  );
} 