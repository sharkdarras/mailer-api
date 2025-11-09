import { AuthorizedWebsite } from "./authorized-website";

export class HardcodedAuthorizedWebsiteRepo {
  private websites: AuthorizedWebsite[];

  public constructor(websites: AuthorizedWebsite[]) {
    this.websites = websites;
  }

  public async getAuthorizedWebsite(
    url: string
  ): Promise<AuthorizedWebsite | null> {
    return this.websites.find((website) => website.url === url) || null;
  }
}
