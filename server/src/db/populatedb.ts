import { Client } from "pg";
import config from "../config";
console.log(config.db_url);
const SQL = `
INSERT INTO posts (title, content, published, "authorId")
VALUES 
('taco', 'cat', true, 12);


INSERT INTO comments (content, "authorId", "postId")
VALUES
  ('cool taco', 12,
(SELECT id FROM posts WHERE title = 'taco')),
  ('ugly taco', 13, (SELECT id FROM posts WHERE title = 'taco'))
  

`;
// INSERT INTO posts (title, content, "authorId", published)
// VALUES
//   ('title 1', 'content 1', 1, FALSE),
//   ('title 2', 'content 2', 1, TRUE);

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: config.db_url,
  });

  await client.connect();
  const check = await client.query("SELECT * FROM users WHERE id = 2");
  console.log(check["rows"]);
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
