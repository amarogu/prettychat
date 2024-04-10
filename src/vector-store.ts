import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function embedAndStoreDocs(
    // @ts-ignore docs type error
    docs: Document<Record<string, any>>[]
) {
    try {
        const embeddings = new OpenAIEmbeddings();
        const docsRes = await embeddings.embedDocuments(docs);
    } catch (err) {
        console.log(err);
        throw new Error('Failed to embed and store docs');
    }
}