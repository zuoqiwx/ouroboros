import { parse } from "node-html-parser";

import analysisInfo from "./analysis_urls.json";
import { Hexagram } from "../logics/models";

// export function fetchAnalysisURLs() {
//   const apiURL = "https://www.zhouyi.cc";
//   const tableURL = `${apiURL}/zhouyi/yijing64/`;
//   fetch(tableURL)
//     .then((respose) => {
//       if (respose.status !== 200) {
//         throw new Error("GET request failed");
//       }
//       return respose.text();
//     })
//     .then((text) => {
//       const root = parse(text);
//       const list = root
//         .querySelector(".zhlist")
//         ?.childNodes[1].childNodes?.filter((node) => node.childNodes.length > 0)
//         .filter((node, index) => index >= 9 && index % 9 > 0);
//       const urlInfo = list?.map((node) => {
//         return {
//           name: node.childNodes[3].childNodes[0].childNodes[0].text,
//           url: `${apiURL}${node.childNodes[1].childNodes[0].attributes.href}`,
//         };
//       });
//       console.log(urlInfo);
//     })
//     .catch((error) => console.error(error));
// }

export async function fetchAnalysisForHexagram(
  hexagram: Hexagram
): Promise<string> {
  return fetch(analysisInfo[hexagram.getIndex()].url).then((response) => {
    if (response.status !== 200) {
      throw new Error("GET request failed");
    }
    return response.text();
  });
}
