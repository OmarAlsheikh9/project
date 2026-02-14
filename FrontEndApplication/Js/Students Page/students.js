import { getDataFromServer } from "../modules/getDataFromServer.js";
import { dispalyTable } from "../modules/dispalyTable.js";

const Url = "http://localhost:3000/students";
const data = await getDataFromServer(Url);


dispalyTable(data, 1, 10);
