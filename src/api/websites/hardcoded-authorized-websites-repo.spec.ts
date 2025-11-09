import { testAuthorizedWebsitesRepo } from "./authorized-websites-repo.spec";
import { HardcodedAuthorizedWebsiteRepo } from "./hardcoded-authorized-website-repo";

describe("HardcodedAuthorizedWebsiteRepo", () => {
  testAuthorizedWebsitesRepo(() => new HardcodedAuthorizedWebsiteRepo());
});
