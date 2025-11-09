import { AuthorizedWebsitesRepo } from "./websites/authorized-webistes-repo";
import { HardcodedAuthorizedWebsiteRepo } from "./websites/hardcoded-authorized-website-repo";

export class ResourceProvider {
  public get authorizedWebsitesRepo(): AuthorizedWebsitesRepo {
    return new HardcodedAuthorizedWebsiteRepo([]);
  }
}
