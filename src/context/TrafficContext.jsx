import { createContext, useContext, useState, useCallback } from "react";
import useTrafficSignalR from "../hooks/useTrafficSignalR";
import ALGORITHMS from "../data/algorithms";

const TrafficContext = createContext();
export function TrafficProvider({ children }) {
  const [lights, setLights] = useState();
  const [algorithm, setAlgorithmState] = useState(ALGORITHMS[0].value);

  const parsePhaseInfo = (phaseInfo) => {
    const directions = ["north", "east", "south", "west"];
    const colorMap = { G: "green", g: "green", R: "red", r: "red", Y: "yellow", y: "yellow" };
    let phase = phaseInfo;
    console.log("parsePhaseInfo input:", phaseInfo);
    if (typeof phaseInfo === "string" && phaseInfo.includes(":")) {
      phase = phaseInfo.split(":").pop().trim();
    }
    console.log("parsePhaseInfo parsed phase:", phase);
    if (typeof phase === "string" && phase.length === 4) {
      const result = {};
      for (let i = 0; i < 4; i++) {
        result[directions[i]] = colorMap[phase[i]] || "black";
      }
      console.log("parsePhaseInfo result:", result);
      return result;
    }
    return undefined;
  };

  const handleTrafficUpdate = useCallback((state) => {
    let parsed;
    if (typeof state === "string") {
      parsed = parsePhaseInfo(state);
    } else if (state && typeof state.PhaseInfo === "string") {
      parsed = parsePhaseInfo(state.PhaseInfo);
    }
    if (parsed && JSON.stringify(parsed) !== JSON.stringify(lights)) {
      setLights(parsed);
    }
  }, [lights]);
  const { sendAlgorithmChange } = useTrafficSignalR(handleTrafficUpdate);

  const setAlgorithm = (alg) => {
    setAlgorithmState(alg);
    sendAlgorithmChange(alg);
  };

  return (
    <TrafficContext.Provider value={{ lights, algorithm, setAlgorithm }}>
      {children}
    </TrafficContext.Provider>
  );
}

export function useTraffic() {
  return useContext(TrafficContext);
}