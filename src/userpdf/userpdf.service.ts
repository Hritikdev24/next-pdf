import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserpdfService {
  async generatePDF(html: string, fileName: string): Promise<string> {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // Use system-installed Chrome if available, else Puppeteer bundled Chromium
      executablePath: process.env.CHROME_PATH || undefined,
    });

    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // PDF file path
    const filePath = path.join(outputDir, `${fileName}.pdf`);

    // Generate PDF
    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return filePath;
  }
}
