import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'
import Filter from 'bad-words'
// import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware.js'

// PUT YOUR ALLOWED DOMAINS THE ACCESS THIS SERVER HERE:

const allowedOrigins = ['https://put_your_client_side_url_here/', 'https://gptclone-ten.vercel.app/', 'https://chatgptclient.vercel.app', 'http://localhost' , 'https://chatgptclient-29dj.vercel.app/']

const filter = new Filter()

// Load environment variables from .env file
try {
  dotenv.config()
} catch (error) {
  console.error('Error loading environment variables:', error)
  process.exit(1)
}

// Create OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

// Create OpenAI API client
const openai = new OpenAIApi(configuration)

// Create Express app
const app = express()

let conversationContext = ''

// Parse JSON in request body
app.use(express.json())

// Enable CORS
app.use(cors())

// ratelimiter middleware function
// app.use('/davinci')
// app.use('/dalle')

/**
 * GET /
 * Returns a simple message.
 */
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World! by Aon',
  })
})

/**
 * POST /davinci
 * Returns a response from OpenAI's text completion model.
 */
app.post('/davinci', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `Q: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You will reply to all my questions in markdown format.
${conversationContext}
A: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


//AIBot

app.post('/davinci2', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `Q: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You are the smartest artificial intelligence chat bot. Reply to all of my questions.
${conversationContext}
A: `,
      temperature: 0.4,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


//Therapist

app.post('/davinci3', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `me: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
      You are a very friendly therapist and will reply to me in detail and friendly manner.
      ${conversationContext}
you: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})





app.post('/davinci4', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `Q: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You are a cool and entertaining chatbot who has only all entertainment related data and nothing else. Don't respond to irreverent questions.
${conversationContext}
A: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


//Career advice


app.post('/davinci5', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `Q: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You are a career counselor. Reply to my questions.
${conversationContext}
A: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


//correct grammer


app.post('/davinci6', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `incorrect: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You will correct my grammer. ${conversationContext}
correct: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `correct: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


//best friend


app.post('/davinci7', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `me: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
You are my best friend.
${conversationContext}
you: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `you: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})


/**
 * POST /php
 * Returns a response from OpenAI's text completion model only in php code.
 */
app.post('/php', async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    })
  }

  try {
    // Call OpenAI API
    const prompt = req.body.prompt
    const cleanPrompt = filter.isProfane(prompt) ? filter.clean(prompt) : prompt
    console.log(cleanPrompt)

    // Add the current prompt to the conversation context
    conversationContext += `Q: ${cleanPrompt}\n`

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
Never use normal text instead I want you to reply to all my questions in php code only in markdown format. 
${conversationContext}
A: `,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    })

    // Add the response to the conversation context
    conversationContext += `A: ${response.data.choices[0].text}\n`

    console.log(response.data.choices[0].text)
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].text,
      // limit: res.body.limit
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})

/**
 * POST /dalle
 * Returns a response from OpenAI's image generation model.
 */
app.post('/dalle', async (req, res) => {
  const prompt = req.body.prompt

  try {
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "256x256",
    })

    console.log(response.data.data[0].url)
    res.status(200).send({
      bot: response.data.data[0].url,
      // limit: res.body.limit,
      // limit:15
    })
  } catch (error) {
    // Log error and return a generic error message
    console.error(error)
    res.status(500).send({
      error: 'Something went wrong',
    })
  }
})



// Start server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server has started on port ${port}`))

