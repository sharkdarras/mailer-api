export class MessageBodyBuilder {
  public buildMessage(params: MessageBodyParams): string {
    let messageBody = this.replaceNewLinesWithBr(params.text);

    messageBody += "<br/><br/>---<br/><br/>";

    messageBody += `<strong>Adresse courriel:</strong> ${params.senderEmail}<br/>`;

    if (params.senderPhoneNumber) {
      messageBody += `<strong>Numéro de téléphone:</strong> ${params.senderPhoneNumber}<br/>`;
    }

    messageBody += `<em>Ce message a été envoyé depuis le formulaire de contact du site <a href="https://${params.websiteUrl}">${params.websiteUrl}</a>.</em>`;

    return `<html><body>${messageBody}</body></html>`;
  }

  private replaceNewLinesWithBr(text: string): string {
    return text.replace(/\r?\n/g, "<br/>");
  }
}

export interface MessageBodyParams {
  senderEmail: string;
  senderPhoneNumber?: string;
  text: string;
  websiteUrl: string;
}
