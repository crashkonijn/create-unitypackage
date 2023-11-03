import { getInput, info } from '@actions/core';
import { readFile } from 'node:fs/promises';
import createUnityPackage from './unitypackage.js';

const IsNotNullOrWhiteSpace = (value: string) => value && value.trim();

const Split = (linesConcat: string) => {
    const splits = linesConcat.split(/\r\n|\n|\r/);
    return splits.filter(IsNotNullOrWhiteSpace);
};

const Run = async () => {
    const output = getInput("package-path", { required: true });
    const projectFolder = getInput("project-folder", { required: false }) ?? "./";

    const includeFilesPath = getInput("include-files", { required: true });
    const data = await readFile(includeFilesPath, { encoding: "utf-8" });
    const metaFiles = Split(data);
    await createUnityPackage(metaFiles, projectFolder, output, info);
};

await Run();