import { useGlobalState } from "../GlobalStateContext";

const getChats = async () => {
    const res = await axios