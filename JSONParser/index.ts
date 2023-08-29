import * as fs from "fs/promises";

export async function readFile(fileName: string) {
  return await fs.readFile(fileName, "utf-8");
}

/**
 * parses a json object and reports if the object is a valid JSON file or not
 * @param fileName
 */
export async function jsonParser(fileName: string) {
  // step1: parse a simple json object i.e {}
  const stringifiedJSONData = await readFile(fileName);
  let i = 0;
  const result: Record<any, any> = {};
  return parseValue();

  function parseNumber() {
    let start = i;
    if (stringifiedJSONData[i] === "-") {
      i++;
    }
    if (stringifiedJSONData[i] === "0") {
      i++;
    } else if (stringifiedJSONData[i] >= "1" && stringifiedJSONData[i] <= "9") {
      i++;
      while (stringifiedJSONData[i] >= "0" && stringifiedJSONData[i] <= "9") {
        i++;
      }
    }

    if (stringifiedJSONData[i] === ".") {
      i++;
      while (stringifiedJSONData[i] >= "0" && stringifiedJSONData[i] <= "9") {
        i++;
      }
    }
    if (stringifiedJSONData[i] === "e" || stringifiedJSONData[i] === "E") {
      i++;
      if (stringifiedJSONData[i] === "-" || stringifiedJSONData[i] === "+") {
        i++;
      }
      while (stringifiedJSONData[i] >= "0" && stringifiedJSONData[i] <= "9") {
        i++;
      }
    }
    if (i > start) {
      return Number(stringifiedJSONData.slice(start, i));
    }
  }

  function skipWhiteSpace() {
    while (
      stringifiedJSONData[i] === " " ||
      stringifiedJSONData[i] === "\n" ||
      stringifiedJSONData[i] === "\t" ||
      stringifiedJSONData[i] === "\r"
    ) {
      i++;
    }
  }

  function parseObject() {
    if (stringifiedJSONData[i] === "{") {
      i++;
      skipWhiteSpace();
      let initial = true;
      // if it is not '}',
      // we take the path of string -> whitespace -> ':' -> value -> ...
      while (stringifiedJSONData[i] !== "}") {
        const key = parseString();
        skipWhiteSpace();
        eatColon();
        result[key!] = parseValue();
        initial = false;
      }
      // move to the next character of '}'
      i++;
      return result;
    }
  }

  function eatComma() {
    if (stringifiedJSONData[i] !== ",") {
      throw new Error("Expected ','");
    }
    i++;
  }
  function isHexadecimal(char: string) {
    return (
      (char >= "0" && char <= "9") ||
      (char.toLowerCase() >= "a" && char.toLowerCase() <= "f")
    );
  }

  function eatColon() {
    if (stringifiedJSONData[i] !== ":") {
      throw new Error("Expected ':'");
    }
    i++;
  }

  function parseString() {
    if (stringifiedJSONData[i] === '"') {
      i++;
      let result = "";
      while (stringifiedJSONData[i] !== '"') {
        if (stringifiedJSONData[i] === "\\") {
          const char = stringifiedJSONData[i + 1];
          if (
            char === '"' ||
            char === "\\" ||
            char === "/" ||
            char === "b" ||
            char === "f" ||
            char === "n" ||
            char === "r" ||
            char === "t"
          ) {
            result += char;
            i++;
          } else if (char === "u") {
            if (
              isHexadecimal(stringifiedJSONData[i + 2]) &&
              isHexadecimal(stringifiedJSONData[i + 3]) &&
              isHexadecimal(stringifiedJSONData[i + 4]) &&
              isHexadecimal(stringifiedJSONData[i + 5])
            ) {
              result += String.fromCharCode(
                parseInt(stringifiedJSONData.slice(i + 2, i + 6), 16),
              );
              i += 5;
            }
          }
        } else {
          result += stringifiedJSONData[i];
        }
        i++;
      }
      i++;
      return result;
    }
  }

  function parseValue() {
    try {
      skipWhiteSpace();
      const value =
          parseString() ??
          parseNumber() ??
          parseObject() ??
          parseArray() ??
          parseKeyword("true", true) ??
          parseKeyword("false", false) ??
          parseKeyword("null", null);
          skipWhiteSpace();
      return 0;
    } catch (e) {
      console.error("Invalid JSON object formatting");
      return 1;
    }
  }
  function parseKeyword(name: string, value: any) {
    if (stringifiedJSONData.slice(i, i + name.length) === name) {
      i += name.length;
      return value;
    }
  }

  function parseArray(): Array<any> | undefined {
    if (stringifiedJSONData[i] === "[") {
      i++;
      skipWhiteSpace();

      const result = [];
      let initial = true;
      while (stringifiedJSONData[i] !== "]") {
        if (!initial) {
          eatComma();
        }
        const value = parseValue();
        result.push(value);
        initial = false;
      }
      // move to the next character of ']'
      i++;
      return result;
    }
  }
}
