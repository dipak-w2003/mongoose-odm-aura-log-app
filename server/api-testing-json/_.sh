#!/bin/bash

API_URL="http://localhost:4406/api/user/blog"
AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWMzZTU2NWFjOGI2MjRjY2RjYTBhNiIsImlhdCI6MTc1NjExODYyNCwiZXhwIjoxNzU2NzIzNDI0fQ.hogjVb4lFxEBw-L2vsOaFj7IZ414lPYHvR1F6z863pU"

for i in $(seq 1 20); do
  TITLE="Sample Blog Post $i"
  SLUG="sample-blog-post-$i"
  CONTENT="## Heading $i\n\nThis is blog post number $i. Written in **MDX style** with _some markdown_."
  TAGS="[\"tag$i\",\"demo\"]"
  COVER="https://picsum.photos/seed/$i/600/400"

  http POST $API_URL \
    Authorization:"$AUTH_TOKEN" \
    title="$TITLE" \
    slug="$SLUG" \
    content="$CONTENT" \
    tags:="$TAGS" \
    coverImage="$COVER" \
    isPublished:=true

  echo "✅ Posted blog $i"
done
