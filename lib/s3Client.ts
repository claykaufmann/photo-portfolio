import { S3Client } from '@aws-sdk/client-s3'

const bucketRegion = process.env.AWS_BUCKET_REGION
const s3Client = new S3Client({ region: bucketRegion })
const bucketName = process.env.BUCKET_NAME

export { s3Client, bucketName, bucketRegion }
