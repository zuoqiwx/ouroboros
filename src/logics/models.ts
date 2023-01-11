export class Line {
  young: boolean;
  yang: boolean;
  changed: boolean;

  constructor(yang: boolean, young = true, changed = false) {
    this.young = young;
    this.yang = yang;
    this.changed = changed;
  }

  setChanged() {
    this.young = false;
    this.changed = true;
  }

  getIndex(): number {
    return this.yang ? 0 : 1;
  }

  toString(): string {
    const noChange = this.young && !this.changed;
    const isCross =
      (this.young && this.yang && this.changed) || (!this.young && !this.yang);
    return `${this.yang ? "---" : "- -"} ${
      noChange ? " " : isCross ? "x" : "o"
    }`;
  }

  static fromObject(value: Line): Line {
    return new Line(value.yang, value.young);
  }
}
export type LineOptional = Line | undefined;

export type TrigramLines = [Line, Line, Line];

export class Trigram {
  lines: TrigramLines;
  index: number;

  constructor(lines: TrigramLines) {
    this.lines = lines;
    this.index = this.getIndex();
  }

  getIndex(): number {
    return (
      this.lines[0].getIndex() * 4 +
      this.lines[1].getIndex() * 2 +
      this.lines[2].getIndex()
    );
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
export type HexagramLinesOptional = [
  LineOptional,
  LineOptional,
  LineOptional,
  LineOptional,
  LineOptional,
  LineOptional
];

type HexagramTransforms = {
  original: Hexagram;
  mutual: Hexagram | undefined;
  change: Hexagram | undefined;
  complementary: Hexagram | undefined;
  reverse: Hexagram | undefined;
};

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
    return new Trigram(this.lines.slice(3, 6) as TrigramLines);
  }

  lower(): Trigram {
    return new Trigram(this.lines.slice(0, 3) as TrigramLines);
  }

  getIndex(): number {
    return this.lower().getIndex() * 8 + this.upper().getIndex();
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
          return new Line(line.yang, line.young);
        }
        return new Line(!line.yang, !line.young, true);
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

  static getTransforms(hexagram: Hexagram): HexagramTransforms {
    return {
      original: hexagram,
      mutual: hexagram.mutual(),
      change: hexagram.change(),
      complementary: hexagram.complementary(),
      reverse: hexagram.reverse(),
    };
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

  static fromTrigrams(lower: Trigram, upper: Trigram, changeIndex: number) {
    const result = new Hexagram(
      lower.lines.concat(upper.lines) as HexagramLines
    );
    result.lines[changeIndex - 1].setChanged();
    return result;
  }

  static fromObject(value: Hexagram): Hexagram {
    return new Hexagram(
      value.lines.map((line) => Line.fromObject(line)) as HexagramLines,
      value.type
    );
  }
}
