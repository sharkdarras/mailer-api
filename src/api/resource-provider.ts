import {
  AUTHORIZED_WEBSITES_S3_BUCKET_NAME,
  HARDCODED_WEBSITES_FILE_PATH,
} from "./config";
import { readEnvVarOrNull, readEnvVarOrThrow } from "./read-env-var";
import { MessageBodyBuilder } from "./send-message/message-body-builder";
import { MessageSender } from "./send-message/message-sender";
import { ZeptoMailMessageSender } from "./send-message/zepto-mail-message-sender";
import { AuthorizedWebsitesRepo } from "./websites/authorized-webistes-repo";
import { HardcodedAuthorizedWebsiteRepo } from "./websites/hardcoded-authorized-website-repo";
import { S3AuthorizedWebsitesRepo } from "./websites/s3-authorized-websites-repo";

export class ResourceProvider {
  public get authorizedWebsitesRepo(): AuthorizedWebsitesRepo {
    if (AUTHORIZED_WEBSITES_S3_BUCKET_NAME) {
      return new S3AuthorizedWebsitesRepo({
        bucketName: AUTHORIZED_WEBSITES_S3_BUCKET_NAME,
      });
    }

    if (HARDCODED_WEBSITES_FILE_PATH) {
      return new HardcodedAuthorizedWebsiteRepo(HARDCODED_WEBSITES_FILE_PATH);
    }

    throw new Error(
      "No authorized websites repository configured. Please set either AUTHORIZED_WEBSITES_S3_BUCKET_NAME or HARDCODED_WEBSITES_FILE_PATH environment variable."
    );
  }

  public get messageSender(): MessageSender {
    return new ZeptoMailMessageSender();
  }

  public get messageBodyBuilder(): MessageBodyBuilder {
    return new MessageBodyBuilder();
  }
}
