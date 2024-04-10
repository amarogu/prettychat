import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function getChunkedDocsFromPDF() {
    try {
        const loader = new PDFLoader('../public/amarodosreis_gustavo_cv_en.pdf');
        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);

        return chunkedDocs;
    } catch (err: any) {
        console.log(err);
        throw new Error('Failed to load chunks');
    }
}