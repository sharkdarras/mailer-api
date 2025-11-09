import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { AuthorizedWebsitesRepo } from "./authorized-webistes-repo";
import { AuthorizedWebsite } from "./authorized-website";
import { AuthorizedWebsiteLoadingError } from "./authorized-website-loading-error";

export class S3AuthorizedWebsitesRepo implements AuthorizedWebsitesRepo {
  private FILE_KEY: string = "authorized-websites.json";

  private s3Client: S3Client;
  private bucketName: string;
  private websites: AuthorizedWebsite[] = [];

  constructor(config: AuthorizedWebsitesS3BucketConfig) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
    });
    this.bucketName = config.bucketName;
  }

  public async getAuthorizedWebsite(
    url: string
  ): Promise<AuthorizedWebsite | null> {
    if (this.websites.length === 0) await this.loadWebsitesFromS3();

    return this.websites.find((website) => website.url === url) || null;
  }

  private async loadWebsitesFromS3(): Promise<void> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: this.FILE_KEY,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new AuthorizedWebsiteLoadingError(
          "Empty response body from S3 bucket."
        );
      }

      const bodyContents = await response.Body.transformToString();
      this.websites = JSON.parse(bodyContents) as AuthorizedWebsite[];
    } catch (error) {
      console.error("Error loading websites from S3:", error);
      throw new AuthorizedWebsiteLoadingError(
        `Failed to load authorized websites from S3: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export interface AuthorizedWebsitesS3BucketConfig {
  bucketName: string;
}
