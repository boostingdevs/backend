import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from 'cors';


const app = express();

const corsOrigins = {
  origin: ["https://boostingdevs.com","http://localhost:4200", "https://backend-4rye.onrender.com"],
}

app.use(cors({
  origin: corsOrigins, 
}));

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = createClient('https://ujmvnzcbcgavpknmqcfx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbXZuemNiY2dhdnBrbm1xY2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3MjkyNTEsImV4cCI6MjAzMTMwNTI1MX0.B0AxNh-3Z2ZrZc5F2xnHetG2deK1MXWaHbtbsRr9vPo');

app.get('/challenges', async (req, res) => {
  const {data, error} = await supabase
      .from('challenges')
      .select()
  res.send(data);
});

app.get('/challenges/:id', async (req, res) => {
  const {data, error} = await supabase
      .from('challenges')
      .select()
      .eq('id', req.params.id)

  res.send(data[0]);
});

app.get('/auth', async (req, res) => {
  const data = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })

  res.send(data);
})

app.get('/auth/github', async (req, res) => {
  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
})


app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
