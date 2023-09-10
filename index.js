const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  const slack_name = req.query.slack_name;
  const track = req.query.track;

  if (!slack_name || !track) {
    return res.status(400).json({ error: 'Both slack_name and track parameters are required.' });
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  
  const now = new Date().toISOString().slice(0, 19) + 'Z';

  const githubRepoUrl = 'https://github.com/WackyDawg/HNGX-Backend-Project-1';
  const githubFileUrl = `${githubRepoUrl}/blob/main/index.js`;

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: now,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
