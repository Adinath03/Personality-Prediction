const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const personality = ["ENFJ", "ENFP", "ENTJ", "ENTP", "ESFJ", "ESFP", "ESTJ", "ESTP", "INFJ", "INFP", "INTJ", "INTP", "ISFJ", "ISFP", "ISTJ", "ISTP"];

const info = ["A Protagonist (ENFJ) is a person with the Extraverted, Intuitive, Feeling, and Judging personality traits. These warm, forthright types love helping others, and they tend to have strong ideas and values. They back their perspective with the creative energy to achieve their goals.",
  "A Campaigner (ENFP) is someone with the Extraverted, Intuitive, Feeling, and Prospecting personality traits. These people tend to embrace big ideas and actions that reflect their sense of hope and goodwill toward others. Their vibrant energy can flow in many directions.",
  "A Commander (ENTJ) is someone with the Extraverted, Intuitive, Thinking, and Judging personality traits. They are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them.",
  "A Debater (ENTP) is a person with the Extraverted, Intuitive, Thinking, and Prospecting personality traits. They tend to be bold and creative, deconstructing and rebuilding ideas with great mental agility. They pursue their goals vigorously despite any resistance they might encounter.",
  "A Consul (ESFJ) is a person with the Extraverted, Observant, Feeling, and Judging personality traits. They are attentive and people-focused, and they enjoy taking part in their social community. Their achievements are guided by decisive values, and they willingly offer guidance to others.",
  "An Entertainer (ESFP) is a person with the Extraverted, Observant, Feeling, and Prospecting personality traits. These people love vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They can be very social, often encouraging others into shared activities.",
  "An Executive (ESTJ) is someone with the Extraverted, Observant, Thinking, and Judging personality traits. They possess great fortitude, emphatically following their own sensible judgment. They often serve as a stabilizing force among others, able to offer solid direction amid adversity.",
  "An Entrepreneur (ESTP) is someone with the Extraverted, Observant, Thinking, and Prospecting personality traits. They tend to be energetic and action-oriented, deftly navigating whatever is in front of them. They love uncovering life’s opportunities, whether socializing with others or in more personal pursuits.",
  "An Advocate (INFJ) is someone with the Introverted, Intuitive, Feeling, and Judging personality traits. They tend to approach life with deep thoughtfulness and imagination. Their inner vision, personal values, and a quiet, principled version of humanism guide them in all things.",
  "A Mediator (INFP) is someone who possesses the Introverted, Intuitive, Feeling, and Prospecting personality traits. These rare personality types tend to be quiet, open-minded, and imaginative, and they apply a caring and creative approach to everything they do.",
  "An Architect (INTJ) is a person with the Introverted, Intuitive, Thinking, and Judging personality traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one.",
  "A Logician (INTP) is someone with the Introverted, Intuitive, Thinking, and Prospecting personality traits. These flexible thinkers enjoy taking an unconventional approach to many aspects of life. They often seek out unlikely paths, mixing willingness to experiment with personal creativity.",
  "A Defender (ISFJ) is someone with the Introverted, Observant, Feeling, and Judging personality traits. These people tend to be warm and unassuming in their own steady way. They’re efficient and responsible, giving careful attention to practical details in their daily lives.",
  "An Adventurer (ISFP) is a person with the Introverted, Observant, Feeling, and Prospecting personality traits. They tend to have open minds, approaching life, new experiences, and people with grounded warmth. Their ability to stay in the moment helps them uncover exciting potentials.",
  "A Logistician (ISTJ) is someone with the Introverted, Observant, Thinking, and Judging personality traits. These people tend to be reserved yet willful, with a rational outlook on life. They compose their actions carefully and carry them out with methodical purpose.",
  "A Virtuoso (ISTP) is someone with the Introverted, Observant, Thinking, and Prospecting personality traits. They tend to have an individualistic mindset, pursuing goals without needing much external connection. They engage in life with inquisitiveness and personal skill, varying their approach as needed."];

  const traits = [  ["Charismatic and inspiring", "Empathetic and compassionate", "Energetic and enthusiastic", "Dedicated and responsible", "Idealistic and romantic", "Diplomatic and tactful"], // ENFJ
  ["Enthusiastic and creative", "Curious and open-minded", "Spontaneous and playful", "Energetic and friendly", "Imaginative and original", "Passionate and expressive"], // ENFP
  ["Efficient and strategic", "Assertive and confident", "Ambitious and determined", "Decisive and authoritative", "Responsible and reliable", "Objective and logical"], // ENTJ
  ["Quick-witted and curious", "Inventive and original", "Enthusiastic and energetic", "Excellent brainstormers", "Charismatic and inspiring", "Charming and confident"], // ENTP
  ["Friendly and sociable", "Responsible and dutiful", "Conscientious and practical", "Sociable and talkative", "Sensible and cooperative", "Organized and thorough"], // ESFJ
  ["Spontaneous and energetic", "Enthusiastic and fun-loving", "Flexible and adaptable", "Friendly and sociable", "Creative and artistic", "Charming and optimistic"], // ESFP
  ["Practical and dependable", "Organized and efficient", "Logical and analytical", "Dutiful and responsible", "Loyal and hard-working", "Sensible and traditional"], // ESTJ
  ["Energetic and action-oriented", "Adventurous and spontaneous", "Resourceful and quick-witted", "Charismatic and confident", "Optimistic and fun-loving", "Charming and lively"], // ESTP
  ["Insightful and inspiring", "Introspective and reflective", "Determined and passionate", "Altruistic and empathetic", "Complex and imaginative", "Idealistic and principled"], // INFJ
  ["Creative and idealistic", "Open-minded and curious", "Supportive and empathetic", "Enthusiastic and energetic", "Determined and passionate", "Flexible and adaptable"], // INFP
  ["Strategic and independent", "Intellectual and insightful", "Visionary and innovative", "Driven and ambitious", "Confident and authoritative", "Logical and analytical"], // INTJ
  ["Inventive and curious", "Independent and creative", "Logical and analytical", "Objective and critical", "Reserved and detached", "Flexible and adaptable"], // INTP
  ["Friendly and outgoing", "Caring and practical", "Hardworking and dedicated", "Sensible and reliable", "Conscientious and dutiful", "Sociable and talkative"], // ISFJ
  ["Spontaneous and playful", "Sensitive and gentle", "Flexible and adaptable", "Enthusiastic and fun-loving", "Artistic and creative", "Charming and optimistic"], // ISFP
  ["Responsible and dependable", "Organized and efficient", "Logical and practical", "Sensible and dependable", "Loyal and hardworking", "Practical and realistic"], // ISTJ
  ["Adventurous and spontaneous", "Flexible and resourceful", "Logical and analytical", "Energetic and action-oriented", "Independent and self-reliant", "Spontaneous and playful"], // ISTP
];

app.get('/', (req, res) => {
  res.render('quiz');
});

app.post('/submit', (req, res) => {
  const numericResponses = [];
  let textualResponses = "";
  //Collecting to Numeric Questions Response
  for (let i = 1; i <= 32; i++) {
    numericResponses.push(req.body["q" + i]);
  }
  //Collecting to Textual Questions Response
  for (let i = 1; i <= 5; i++) {
    textualResponses += req.body["tq" + i] + " ";
  }

  // console.log(numericResponses);
  //console.log(textualResponses);

  // spawn a Python process and pass the numeric and textual responses as arguments
  const pythonProcess = spawn('python', ['script.py']);

  // Send the responses to the Python process through standard input
  pythonProcess.stdin.write(JSON.stringify({ numeric: numericResponses, textual: textualResponses }));
  pythonProcess.stdin.end();

  let result = '';
  // Listen for data events on the standard output stream of the Python process
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  // Listen for the close event of the Python process
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // The Python script exited successfully, so you can use the result here
      // res.send('Your result is: ' + result);
      let intResult = parseInt(result);
      res.render("result", { index: intResult, output1: personality, output2: info, output3: traits });
    } else {
      // The Python script exited with an error
      console.error('Python script exited with error code ' + code);
      res.status(500).send('Something went wrong');
    }
  });
});

app.post('/newsLetter',(req,res) => {
    console.log("request received");
})
app.listen(80, () => {
  console.log();
});
