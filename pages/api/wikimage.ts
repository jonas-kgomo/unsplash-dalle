export default async function handler(req: { query: { title: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { imageUrl?: any; error?: string; }): void; new(): any; }; }; }) {
 const { title } = req.query;
 const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;

 try {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].original.source;
  res.status(200).json({ imageUrl });
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to fetch image URL' });
 }
}
