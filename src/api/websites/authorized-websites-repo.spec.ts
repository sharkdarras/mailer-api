import { AuthorizedWebsitesRepo } from "./authorized-webistes-repo";
import { AuthorizedWebsite } from "./authorized-website";

export const testAuthorizedWebsitesRepo = (
  buildRepo: () => AuthorizedWebsitesRepo,
  websiteThatExists: AuthorizedWebsite
) => {
  let repo: AuthorizedWebsitesRepo;

  beforeEach(() => {
    repo = buildRepo();
  });

  it("should return an authorized website by URL", async () => {
    const website = await repo.getAuthorizedWebsite(websiteThatExists.url);
    expect(website).toEqual(websiteThatExists);
  });

  it("should return null for an unknown website", async () => {
    const website = await repo.getAuthorizedWebsite("unknown.com");
    expect(website).toBeNull();
  });
};

test("dummy test to avoid empty spec file error", () => {});
