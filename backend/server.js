require('dotenv').config()
const cors = require('cors')
const OpenAI = require('openai')
const express = require('express');




const PORT = process.env.PORT || 4040;
const client = new OpenAI({ apiKey: process.env.API_KEY, });


const server = express();

server.use(cors())
server.use(express.json())

server.get("/", (_, res) => {
    res.send("Server is running fine")
})

server.post("/data", async (req, res) => {
    const { userPrompt, temperature, maxTokens, presencePenelty, frequencyPenelty } = req.body;
    // console.log(userPrompt, temperature, maxTokens, presencePenelty, frequencyPenelty)
    if (userPrompt && temperature && maxTokens && presencePenelty && frequencyPenelty) {
        let response = await generateResponse(userPrompt, temperature, maxTokens, presencePenelty, frequencyPenelty);
        let data = response.choices[0].message.content;
        // console.log(data);
        res.status(200).json({ msg: data});
        return;
    }
    res.status(400).json({ msg: "please provide all the details" })
})


// OpenAI code

async function generateResponse(userPrompt, temperature, maxTokens, presencePenelty, frequencyPenelty) {
    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a product description writer.' },
                { role: 'user', content: userPrompt },
            ],
            temperature: temperature,
            max_tokens: maxTokens,
            frequency_penalty: frequencyPenelty,
            presence_penalty: presencePenelty
        });

        // console.log(completion.choices[0].message.content);
        return completion;
    } catch (error) {
        console.log("Erro while response:", error)
    }
}



server.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})


