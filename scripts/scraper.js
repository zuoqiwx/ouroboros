import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const apiURL = "https://www.zhouyi.cc";
const analysisDir = "../assets/analysis";
const analysisMapping = `${analysisDir}/map.json`;

async function fetchAnalysisURLs() {
  try {
    const mapping = [];
    const { data } = await axios.get(`${apiURL}/zhouyi/yijing64`);
    const $ = cheerio.load(data);
    $(".zhlist > ul > li p:nth-of-type(2) a").each((i, el) => {
      mapping.push({
        name: el.children[0].data,
        file: `${analysisDir}/${i}.json`,
        url: `${apiURL}/${el.attribs.href}`,
      });
    });
    return mapping;
  } catch (error) {
    throw error;
  }
}

async function fetchAnalysisFromURL(url) {
  try {
    const analysis = {
      overall: [],
      yaos: [],
    };
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    $(".gualist.tleft.f14.lh25").each((i, el) => {
      if (i > 0) {
        analysis.yaos.push([]);
      }
      const currSection =
        i === 0 ? analysis.overall : analysis.yaos[analysis.yaos.length - 1];
      el.children
        .filter(
          (child) =>
            (child.type === "tag" && child.name === "strong") ||
            (child.type === "text" && child.data.trim().length > 0)
        )
        .forEach((child) => {
          if (child.type === "tag" && child.name === "strong") {
            let firstChild = child.children[0];
            while (!firstChild.data) {
              firstChild = firstChild.children[0];
            }
            const text = firstChild.data.trim();
            currSection.push({
              title: text,
              lines: [],
            });
          } else {
            const text = child.data.trim();
            if (currSection.length === 0) {
              console.warn(`${url} section ${i}`);
              return;
            }
            currSection[currSection.length - 1].lines.push(text);
          }
        });
    });
    return analysis;
  } catch (error) {
    throw error;
  }
}

const mapping = await fetchAnalysisURLs();
fs.writeFile(
  analysisMapping,
  JSON.stringify(mapping, undefined, 2),
  {
    encoding: "utf-8",
  },
  (error) => {
    if (error) {
      console.error(error);
    }
  }
);
mapping.forEach(async ({ name, file, url }) => {
  const analysis = await fetchAnalysisFromURL(url);
  const result = { name, ...analysis };
  fs.writeFile(
    file,
    JSON.stringify(result, undefined, 2),
    {
      encoding: "utf-8",
    },
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  );
});
