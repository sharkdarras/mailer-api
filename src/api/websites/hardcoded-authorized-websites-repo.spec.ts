import { testAuthorizedWebsitesRepo } from "./authorized-websites-repo.spec";
import { HardcodedAuthorizedWebsiteRepo } from "./hardcoded-authorized-website-repo";

describe("HardcodedAuthorizedWebsiteRepo", () => {
  testAuthorizedWebsitesRepo(
    () => {
      const testFilePath =
        __dirname + "/../../../test-assets/hardcoded-websites.json";
      return new HardcodedAuthorizedWebsiteRepo(testFilePath);
    },
    {
      name: "Another Company",
      url: "another.com",
      contactEmail: "contact@another.com",
    }
  );
});
