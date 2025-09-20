import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  UseGuards,
  Req,
  Param,
  Query,
  Inject,
  ParseIntPipe
} from '@nestjs/common';
import { UserpdfService } from './userpdf.service';
import { Response } from 'express';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Controller('userpdf')
export class UserpdfController {
  constructor(private readonly userpdfService: UserpdfService,
     @Inject("PRODUCT_SERVICE") private readonly productService:ClientProxy
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('download')
  async downloadPDF(@Res() res: Response, @Body() pdfData: any, @Req() req) {
    const role = req.user.role;
    const orderId = Math.floor(Math.random() * 100000);
    const { userName } = pdfData;
    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
            background: #f4f6f8;
            color: #333;
          }
          .invoice-box {
            max-width: 850px;
            margin: auto;
            padding: 25px;
            border: 1px solid #ddd;
            background: #fff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
          }
          .company, .customer {
            padding: 15px;
            border-radius: 8px;
            color: #fff;
            width: 48%;
          }
          .company {
            background: #2c3e50;
          }
          .customer {
            background: #16a085;
          }
          .company h2, .customer h2 {
            margin: 0 0 10px;
          }
          .invoice-title {
            text-align: center;
            margin-bottom: 20px;
          }
          .invoice-title h1 {
            color: #2c3e50;
            margin: 0;
          }
          .invoice-details table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          .invoice-details th,
          .invoice-details td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
          .invoice-details th {
            background-color: #34495e;
            color: #fff;
          }
          .summary {
            margin-top: 20px;
            text-align: right;
          }
          .summary p {
            font-size: 15px;
            margin: 5px 0;
          }
          .description {
            margin-top: 30px;
            padding: 15px;
            border: 1px dashed #aaa;
            background: #fafafa;
            font-size: 13px;
            color: #555;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div class="company">
              <h2>ShopKart Pvt Ltd</h2>
              <p>123 E-commerce Street</p>
              <p>Mumbai, India</p>
              <p>Email: support@shopkart.com</p>
              <p>GSTIN: 27ABCDE1234F1Z5</p>
            </div>
            <div class="customer">
              <h2>Customer Details</h2>
              <p><b>Name:</b> ${userName}</p>
              <p><b>Role:</b> ${role}</p>
              <p>123 Customer Lane</p>
              <p>Pune, India</p>
              <p>Phone: +91-9876543210</p>
            </div>
          </div>
    
          <div class="invoice-title">
            <h1>Invoice</h1>
            <p>Invoice Date: ${new Date().toLocaleDateString()}</p>
            <p>Invoice #: INV-${orderId}</p>
          </div>
    
          <div class="invoice-details">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wireless Mouse</td>
                  <td>1</td>
                  <td>₹800</td>
                  <td>₹800</td>
                </tr>
                <tr>
                  <td>Mechanical Keyboard</td>
                  <td>1</td>
                  <td>₹2,200</td>
                  <td>₹2,200</td>
                </tr>
                <tr>
                  <td>Monitor 24"</td>
                  <td>1</td>
                  <td>₹7,500</td>
                  <td>₹7,500</td>
                </tr>
              </tbody>
            </table>
          </div>
    
          <div class="summary">
            <p><b>Subtotal:</b> ₹10,500</p>
            <p><b>Tax (18% GST):</b> ₹1,890</p>
            <p><b>Total:</b> ₹12,390</p>
          </div>
    
          <div class="description">
            <p><b>Note:</b> This invoice is generated electronically and does not require a physical signature.</p>
            <p>For queries, contact <b>support@shopkart.com</b> or call <b>+91-9876543210</b>.</p>
            <p>Return/Exchange policy: Items can be returned within <b>7 days</b> of delivery under return conditions.</p>
          </div>
    
          <div class="footer">
            <p>Thank you for shopping with ShopKart! 🛒</p>
            <p>© ${new Date().getFullYear()} ShopKart Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;

    

    // Generate PDF file
    const filePath = await this.userpdfService.generatePDF(
      html,
      orderId.toString(),
    );

  //  await firstValueFrom(
  //  this.productService.send("pdf-status",orderId));
    // Send file as download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${orderId.toString()}.pdf`,
    );
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  @Get(':id/:item/:itemId')
  collecteID(@Param('id',ParseIntPipe) userId, @Param('itemId',ParseIntPipe) itemId) {
    return { userId, itemId };
  }

  @Get('data')
  data(@Query('name') name: string, @Query('age') age: number) {
    return {
      name,
      age,
    };
  }
}
