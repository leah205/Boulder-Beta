SELECT * FROM POSTS
WHERE ('uploadedAt' < $2) OR ('uploadedAt' = $2 AND id > $1)
ORDER BY  "uploadedAt" DESC, id DESC
LIMIT $3