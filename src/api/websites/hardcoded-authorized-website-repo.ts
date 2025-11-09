import { AuthorizedWebsite } from "./authorized-website";
import * as fs from "fs";

export class HardcodedAuthorizedWebsiteRepo {
  private readonly websitesFilePath: string;
  private websites: AuthorizedWebsite[] = [];

  constructor(websitesFilePath: string) {
    this.websitesFilePath = websitesFilePath;
  }

  public async getAuthorizedWebsite(
    url: string
  ): Promise<AuthorizedWebsite | null> {
    if (this.websites.length === 0) await this.loadWebsitesFromFile();

    return this.websites.find((website) => website.url === url) || null;
  }

  private async loadWebsitesFromFile(): Promise<void> {
    this.websites = JSON.parse(fs.readFileSync(this.websitesFilePath, "utf8"));
  }
}
