const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const response = await openai.createImage({
//   prompt: "A cute baby sea otter",
//   n: 2,
//   size: "1024x1024",
// });


// return results on api endpoint 
export default async function (req: any, res: any) {
  const completion = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 2,
    size: "1024x1024",
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}


