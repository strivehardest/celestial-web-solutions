#!/bin/bash
# Download all jsDelivr tech icons locally for Next.js caching

mkdir -p public/images/tech

BASE="https://cdn.jsdelivr.net/gh/devicons/devicon/icons"

curl -o public/images/tech/react.svg "$BASE/react/react-original.svg"
curl -o public/images/tech/nextjs.svg "$BASE/nextjs/nextjs-original.svg"
curl -o public/images/tech/javascript.svg "$BASE/javascript/javascript-original.svg"
curl -o public/images/tech/css3.svg "$BASE/css3/css3-original.svg"
curl -o public/images/tech/html5.svg "$BASE/html5/html5-original.svg"
curl -o public/images/tech/typescript.svg "$BASE/typescript/typescript-original.svg"
curl -o public/images/tech/woocommerce.svg "$BASE/woocommerce/woocommerce-original.svg"
curl -o public/images/tech/nodejs.svg "$BASE/nodejs/nodejs-original.svg"
curl -o public/images/tech/python.svg "$BASE/python/python-original.svg"
curl -o public/images/tech/mongodb.svg "$BASE/mongodb/mongodb-original.svg"
curl -o public/images/tech/django.svg "$BASE/django/django-plain.svg"
curl -o public/images/tech/figma.svg "$BASE/figma/figma-original.svg"
curl -o public/images/tech/bootstrap.svg "$BASE/bootstrap/bootstrap-original.svg"
curl -o public/images/tech/wordpress.svg "$BASE/wordpress/wordpress-plain.svg"

echo "Done. Update techStackCategories icon paths to /images/tech/[name].svg"