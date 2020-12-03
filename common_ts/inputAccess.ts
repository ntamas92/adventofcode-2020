import { config } from "https://deno.land/x/dotenv/mod.ts";

const accessToken = config().ACCESS_TOKEN;

export const fetchInput = async (day: number): Promise<string> => {
  const cacheDir = "./inputCache";

  if (!(await exists(cacheDir))) {
    await Deno.mkdir(cacheDir);
  }

  const cachePath = `${cacheDir}/day${day}.txt`;
  if (await exists(cachePath)) {
    return (await Deno.readTextFile(cachePath));
  }

  console.log("Input not found in cache, downloading from aoc.com...");

  const uri = `https://adventofcode.com/2020/day/${day}/input`;

  const headers = new Headers();
  headers.set("Cookie", `session=${accessToken}`);

  const response = await fetch(uri, { credentials: "include", headers });

  const input = await response.text();

  await Deno.writeTextFile(cachePath, input, { create: true });
  return input;
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
};
