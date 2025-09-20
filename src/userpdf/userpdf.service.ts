import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserpdfService {




    async generatePDF(html: string, fileName: string): Promise<string> {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'], 
        });
    
        const page = await browser.newPage();
    
      
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
     
        const outputDir = path.join(process.cwd(), 'public', 'pdfs');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir);
        }
    
        const filePath = path.join(outputDir, `${fileName}.pdf`);
    
       
        await page.pdf({
          path: filePath,
          format: 'A4',
          printBackground: true,
        });
    
        await browser.close();
        return filePath;
      }

}
