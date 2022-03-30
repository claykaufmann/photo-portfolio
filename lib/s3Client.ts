import { S3Client } from '@aws-sdk/client-s3'
const bucketRegion = process.env.AWS_BUCKET_REGION // should be "Ohio"

const s3Client = new S3Client({ region: bucketRegion })

const bucketName = 'photo-website-45hjfg734hgf'

export { s3Client, bucketName, bucketRegion }
