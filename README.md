# Photography Portfolio Site

This is a NextJS project that houses my photography portfolio.

## Technicals

All of the site is statically generated with NextJS. React handles all display of pages. Photos are fetched from an AWS S3 bucket, and the site as a whole is hosted on an AWS instance behind an nginx reverse proxy.

## Running with Docker

To run with docker, use the following commands:  
Build: `docker build . -t photo-site`  
Run: `docker run -p 3000:3000 photo-site`
