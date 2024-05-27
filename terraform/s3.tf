resource "aws_s3_bucket" "beanstalk_file_bucket" {
  bucket        = "noinfluence-deployment-bucket"
  force_destroy = true
}

resource "aws_s3_bucket" "website" {
  bucket        = "noinfluence-frontend"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "website" {
  bucket = aws_s3_bucket.website.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = jsonencode({
    "Version" : "2008-10-17",
    "Id" : "PolicyForCloudFrontPrivateContent",
    "Statement" : [
      {
        "Sid" : "AllowCloudFrontServicePrincipal",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        "Resource" : [
          "${aws_s3_bucket.website.arn}/*",
          "${aws_s3_bucket.website.arn}"
        ],
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "${aws_cloudfront_distribution.frontend.arn}"
          }
        }
      }
    ]
  })
}