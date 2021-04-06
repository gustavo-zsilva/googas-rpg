import { useContext } from "react";
import { LegendsContext } from "../contexts/LegendsContext";

export function Counter() {

    const { seconds } = useContext(LegendsContext);

    return (
        <div>
            {seconds}
        </div>
    );
}