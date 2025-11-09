import { AuthorizedWebsitesRepo } from "./authorized-webistes-repo";

export const testAuthorizedWebsitesRepo = (
  buildRepo: () => AuthorizedWebsitesRepo
) => {
  let repo: AuthorizedWebsitesRepo;

  beforeEach(() => {
    repo = buildRepo();
  });

  it("should return an authorized website by URL", async () => {
    const website = await repo.getAuthorizedWebsite("example.com");
    expect(website).toEqual({
      name: "Example Company",
      url: "example.com",
      contactEmail: "info@example.com",
    });
  });

  it("should return null for an unknown website", async () => {
    const website = await repo.getAuthorizedWebsite("unknown.com");
    expect(website).toBeNull();
  });
};
