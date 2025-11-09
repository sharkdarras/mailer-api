import { readEnvVarOrThrow } from "../read-env-var";
import { AuthorizedWebsite } from "./authorized-website";
import * as fs from "fs";

export class HardcodedAuthorizedWebsiteRepo {
  private websites: AuthorizedWebsite[];

  constructor() {
    const websitesFilePath = readEnvVarOrThrow(
      "HARDCODED_WEBSITES_FILE_PATH",
      new Error("Missing HARDCODED_WEBSITES_FILE_PATH environment variable.")
    );
    this.websites = JSON.parse(fs.readFileSync(websitesFilePath, "utf8"));
  }

  public async getAuthorizedWebsite(
    url: string
  ): Promise<AuthorizedWebsite | null> {
    return this.websites.find((website) => website.url === url) || null;
  }
}
