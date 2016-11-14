Created a Quora-like web app where people can ask and answer questions.

Questions-to-Users: Many-to-Many relationship;
Questions-to-Answers: One-to-Many relationship;


message: "Welcome to Sophie's personal api! Here's what you need to know!",
documentationUrl: "https://github.com/sophieluo/express-personal-api/blob/master/README.md",
baseUrl: "http://shielded-peak-37764.herokuapp.com",
endpoints: [
    {method: "GET", path: "/api", description: "Describes all available endpoints"},
    {method: "GET", path: "/api/profile", description: "Profile of creator"},
    {method: "GET", path: "/api/questions", description: "Questions posted on my site"},
    {method: "GET", path: "/api/questions/:id", description: "Look up one particular question by question id"},
    {method: "GET", path: "/api/users", description: "All user profiles"},
    {method: "POST", path: "/api/questions", description: "Ask new questions"},
    {method: "POST", path: "api/questions/:question_id/answers", description: "Post new answers to questions"}
  ]
