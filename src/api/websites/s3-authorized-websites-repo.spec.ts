import { AUTHORIZED_WEBSITES_S3_BUCKET_NAME } from "../config";
import { testAuthorizedWebsitesRepo } from "./authorized-websites-repo.spec";
import { S3AuthorizedWebsitesRepo } from "./s3-authorized-websites-repo";

describe("S3AuthorizedWebsiteRepo", () => {
  testAuthorizedWebsitesRepo(
    () =>
      new S3AuthorizedWebsitesRepo({
        bucketName: AUTHORIZED_WEBSITES_S3_BUCKET_NAME!,
      }),
    {
      name: "Test Website",
      url: "test.com",
      contactEmail: "info@test.com",
      recaptchaSecretKey: "test-secret-key",
    }
  );
});
