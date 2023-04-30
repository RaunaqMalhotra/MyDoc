import axios from 'axios';

const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
};

const data = {
    "prompt": "Hello, how are you?",
    "temperature": 0.5,
    "max_tokens": 30,
    "stop": "\n"
  };

axios.post(apiEndpoint, data, { headers })
  .then(response => console.log(response))
  .catch(error => console.error(error));

export default apis
