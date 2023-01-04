export class Line {
  young: boolean;
  yang: boolean;

  constructor(yang: boolean, young = false) {
    this.young = young;
    this.yang = yang;
  }

  toString(): string {
    return `${this.yang ? "---" : "- -"} ${
      this.young ? " " : this.yang ? "o" : "x"
    }`;
  }
}

export type TrigramLines = [Line, Line, Line];

export class Trigram {
  lines: TrigramLines;

  constructor(lines: TrigramLines) {
    this.lines = lines;
  }

  toString(): string {
    return this.lines.reduce((prev, curr) => {
      return prev + curr.toString() + "\n";
    }, "");
  }
}

const enum HexagramTypes {
  Original = "original",
  Mutual = "mutual",
  Change = "change",
  Complementary = "complementary",
  Reverse = "reverse",
}

export type HexagramLines = [Line, Line, Line, Line, Line, Line];
export type HexagramLinesOptional = [Line?, Line?, Line?, Line?, Line?, Line?];

export class Hexagram {
  lines: HexagramLines;
  type: HexagramTypes;

  constructor(
    lines: HexagramLines,
    type: HexagramTypes = HexagramTypes.Original
  ) {
    this.lines = lines;
    this.type = type;
  }

  upper(): Trigram {
    return new Trigram(this.lines.slice(0, 3) as TrigramLines);
  }

  lower(): Trigram {
    return new Trigram(this.lines.slice(3, 6) as TrigramLines);
  }

  mutual(): Hexagram | undefined {
    if (this.type !== HexagramTypes.Original) {
      console.error(
        `Not finding ${HexagramTypes.Mutual} hexagram on ${HexagramTypes.Original}`
      );
      return;
    }
    return new Hexagram(
      this.lines.slice(1, 4).concat(this.lines.slice(2, 5)) as HexagramLines,
      HexagramTypes.Mutual
    );
  }

  change(): Hexagram | undefined {
    if (this.type !== HexagramTypes.Original) {
      console.error(
        `Not finding ${HexagramTypes.Change} hexagram on ${HexagramTypes.Original}`
      );
      return;
    }
    return new Hexagram(
      this.lines.map((line) => {
        if (line.young) {
          return line;
        }
        return new Line(!line.yang, !line.young);
      }) as HexagramLines,
      HexagramTypes.Change
    );
  }

  complementary(): Hexagram | undefined {
    if (this.type !== HexagramTypes.Original) {
      console.error(
        `Not finding ${HexagramTypes.Complementary} hexagram on ${HexagramTypes.Original}`
      );
      return;
    }
    return new Hexagram(
      this.lines.map((line) => {
        return new Line(!line.yang, line.young);
      }) as HexagramLines,
      HexagramTypes.Complementary
    );
  }

  reverse(): Hexagram | undefined {
    if (this.type !== HexagramTypes.Original) {
      console.error(
        `Not finding ${HexagramTypes.Reverse} hexagram on ${HexagramTypes.Original}`
      );
      return;
    }
    return new Hexagram(
      this.lines.slice().reverse() as HexagramLines,
      HexagramTypes.Reverse
    );
  }

  toString(): string {
    return (
      this.type +
      "\n" +
      this.lines
        .slice()
        .reverse()
        .reduce((prev, curr) => {
          return prev + curr.toString() + "\n";
        }, "")
    );
  }
}

// let lines = [
//     new Line(true, false),  // --- o
//     new Line(true, false),  // --- o
//     new Line(true, true),   // ---
//     new Line(false, false), // - - x
//     new Line(false, true),  // - -
//     new Line(true, false),  // - - o
// ] as HexagramLines;
// let hex = new Hexagram(lines);
// console.log(hex.toString());
// console.log(hex.mutual()?.toString());
// console.log(hex.change()?.toString());
// console.log(hex.complementary()?.toString());
// console.log(hex.reverse()?.toString());
// console.log(hex);
// console.log(hex.reverse());
