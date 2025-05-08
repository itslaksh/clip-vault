import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer'; // Add Puppeteer
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

const TEMP_DOWNLOAD_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DOWNLOAD_DIR)) {
    fs.mkdirSync(TEMP_DOWNLOAD_DIR);
}

app.use(cors());
app.use(express.json());

// Puppeteer function to fetch video URL
const fetchVideoUrlWithPuppeteer = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Example: Extract video URL (adjust selector based on the site)
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            return videoElement ? videoElement.src : null;
        });

        if (!videoUrl) {
            throw new Error('Failed to extract video URL.');
        }

        console.log(`Extracted video URL: ${videoUrl}`);
        return videoUrl;
    } catch (error) {
        console.error('Error fetching video URL:', error.message);
        throw error;
    } finally {
        await browser.close();
    }
};

// Updated /download endpoint
app.get('/download', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const uniqueId = uuidv4();
    const outputFileName = `video_${uniqueId}.mp4`;
    const outputFilePath = path.join(TEMP_DOWNLOAD_DIR, outputFileName);

    try {
        // Fetch the video URL using Puppeteer
        const videoUrl = await fetchVideoUrlWithPuppeteer(url);

        // Download the video using the fetched URL
        const response = await fetch(videoUrl);
        const fileStream = fs.createWriteStream(outputFilePath);
        response.body.pipe(fileStream);

        fileStream.on('finish', () => {
            res.setHeader('Content-Disposition', `attachment; filename=${outputFileName}`);
            res.setHeader('Content-Type', 'video/mp4');

            const readStream = fs.createReadStream(outputFilePath);
            readStream.pipe(res);

            readStream.on('close', () => {
                fs.unlinkSync(outputFilePath);
            });
        });

        fileStream.on('error', (error) => {
            console.error('Error writing video file:', error.message);
            res.status(500).json({ error: 'Failed to download video' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to download video' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is Live!`);
});
