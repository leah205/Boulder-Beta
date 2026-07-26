SELECT posts.*, betas.*, beta_author.username, beta_author.idFROM POSTS
INNER_JOIN betas ON posts.id = betas["postId"]
INNER_JOIN videos ON posts["attemptId"] = videos["attemptId"]
INNER_JOIN attempts ON videos["attemptId"] = attempts.id
INNER_JOIN climbs ON attempts.climb_id = climbs.id
INNER_JOIN users creator ON climbs.creatorId = users.id
INNER_JOIN users beta_author ON betas.user_id = users.id
LIMIT $1