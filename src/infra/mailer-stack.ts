import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import * as apiGw from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as path from "path";
import {
  Charset,
  NodejsFunction,
  OutputFormat,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { stackId } from "./config";

export class MailerStack extends cdk.Stack {
  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, `${stackId}-stack`, {
      description: "Mailer",
      tags: { stack: stackId },
      ...props,
    });

    const mailerFn = new NodejsFunction(this, "MailerApi", {
      description: this.stackId,
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.X86_64,
      loggingFormat: lambda.LoggingFormat.JSON,
      systemLogLevelV2: lambda.SystemLogLevel.INFO,
      entry: path.join(__dirname, "../api/lambda.ts"),
      bundling: {
        target: "es2023",
        format: OutputFormat.CJS,
        charset: Charset.UTF8,
        forceDockerBundling: true,
      },
      environment: {
        ZEPTO_MAIL_API_KEY_NAME: process.env.ZEPTO_MAIL_API_KEY_NAME || "",
        ZEPTO_MAIL_API_KEY: process.env.ZEPTO_MAIL_API_KEY || "",
      },
    });

    const authorizedWebsitesBucket = s3.Bucket.fromBucketName(
      this,
      "AuthorizedWebsitesS3Bucket",
      "mailer-authorized-websites"
    );
    authorizedWebsitesBucket.grantRead(mailerFn);

    mailerFn.addEnvironment(
      "AUTHORIZED_WEBSITES_S3_BUCKET_NAME",
      authorizedWebsitesBucket.bucketName
    );

    const apiGwLogGroup = new logs.LogGroup(this, "ApiGatewayAccessLogs", {
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new apiGw.LambdaRestApi(this, "ApiGwEndpoint", {
      handler: mailerFn,
      restApiName: "MailerApi",
      binaryMediaTypes: ["*/*"],
      deployOptions: {
        loggingLevel: apiGw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
        accessLogDestination: new apiGw.LogGroupLogDestination(apiGwLogGroup),
      },
    });
  }
}
