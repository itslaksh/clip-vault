import express from 'express';
import cors from 'cors';
import ytdlp from 'yt-dlp-exec';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

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

const getVideoInfo = async (url) => {
    try {
        const info = await ytdlp(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            youtubeSkipDashManifest: true,
            cookies: path.join(__dirname, 'cookies', 'youtube-cookies.txt'),
        });
        return info;
    } catch (error) {
        console.error('Error fetching video info:', error);
        throw new Error('Failed to fetch video info');
    }
};


app.get('/video-details', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const videoInfo = await getVideoInfo(url);

        const { title, thumbnails, formats } = videoInfo;

        // Get the highest resolution thumbnail
        const bestThumbnail = thumbnails?.sort((a, b) => (b.width || 0) - (a.width || 0))[0]?.url || '';

        // Include all formats, including separate audio and video streams
        const availableFormats = formats
            .map((format) => ({
                itag: format.itag,
                quality: format.qualityLabel || `${format.height}p`,
                ext: format.ext,
                hasVideo: format.vcodec !== 'none',
                hasAudio: format.acodec !== 'none',
                url: format.url,
            }))
            .sort((a, b) => parseInt(b.quality) - parseInt(a.quality));

        res.json({
            title,
            thumbnail: bestThumbnail,
            videoUrl: videoInfo.webpage_url,
            formats: availableFormats,
        });
    } catch (error) {
        console.error('Error fetching video details:', error);
        res.status(500).json({ error: 'Failed to fetch video details' });
    }
});

app.get('/download', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const uniqueId = uuidv4();
    const outputFileName = `video_${uniqueId}.mp4`;
    const outputFilePath = path.join(TEMP_DOWNLOAD_DIR, outputFileName);

    try {
        await ytdlp(url, {
            output: path.join(TEMP_DOWNLOAD_DIR, `video_${uniqueId}.%(ext)s`),
            format: 'bestvideo+bestaudio/best', // Allow separate streams
            mergeOutputFormat: 'mp4',
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            cookies: path.join(__dirname, 'cookies', 'youtube-cookies.txt'),
        });

        if (!fs.existsSync(outputFilePath)) {
            return res.status(404).json({ error: 'Failed to combine video and audio' });
        }

        res.setHeader('Content-Disposition', `attachment; filename=${outputFileName}`);
        res.setHeader('Content-Type', 'video/mp4');

        const readStream = fs.createReadStream(outputFilePath);
        readStream.pipe(res);

        readStream.on('close', () => {
            fs.unlinkSync(outputFilePath);
        });
    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).json({ error: 'Failed to download video' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});