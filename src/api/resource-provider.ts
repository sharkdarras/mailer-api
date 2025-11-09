import { MessageBodyBuilder } from "./send-message/message-body-builder";
import { MessageSender } from "./send-message/message-sender";
import { ZeptoMailMessageSender } from "./send-message/zepto-mail-message-sender";
import { AuthorizedWebsitesRepo } from "./websites/authorized-webistes-repo";
import { HardcodedAuthorizedWebsiteRepo } from "./websites/hardcoded-authorized-website-repo";

export class ResourceProvider {
  public get authorizedWebsitesRepo(): AuthorizedWebsitesRepo {
    return new HardcodedAuthorizedWebsiteRepo();
  }

  public get messageSender(): MessageSender {
    return new ZeptoMailMessageSender();
  }

  public get messageBodyBuilder(): MessageBodyBuilder {
    return new MessageBodyBuilder();
  }
}
