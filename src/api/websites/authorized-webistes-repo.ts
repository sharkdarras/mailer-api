import { AuthorizedWebsite } from "./authorized-website";

export interface AuthorizedWebsitesRepo {
  getAuthorizedWebsite(url: string): Promise<AuthorizedWebsite | null>;
}
