# TrackItNow Pro - v1

Status: In progress

Tags: BrightData, CRONJobs, Cheerio, NextJS, Puppeteer

# Project Title: “TrackItNow Pro v1”

### Project Overview/Abstract :

**TrackItNow Pro**, a comprehensive solution designed to address the challenges consumers face with fluctuating eCommerce prices and timely purchasing decisions. TrackItNow Pro offers a robust system for tracking and analyzing product prices, complete with historical price analysis and an auto-buying feature that automatically purchases products when they hit user-defined thresholds. A Chrome extension allows users to easily add and monitor products directly from eCommerce sites. Additionally, an integrated chatbot, powered by Gemini or GPT, provides real-time interaction, allowing users to inquire about various eCommerce products, compare options, and receive insights. The solution is built using Next.js for both frontend and backend development, Puppeteer with Cheerio for efficient web scraping, and CRON jobs for automated notifications. The integration of AI-powered chatbot technology enhances user engagement, making the shopping experience more interactive and informed. TrackItNow Pro not only saves time but also ensures that users never miss out on the best deals, revolutionizing how consumers navigate and interact with eCommerce platforms.

### Key Features:

1. **Product Tracking**:
   - Users can add products they are interested in tracking.
   - The system will regularly check the prices of these products from specified eCommerce sites.
2. **Price Monitoring and Alerts**:
   - Automated price checks using web scraping techniques.
   - Users receive notifications (via email) when there is a significant price change or when the price drops below a certain threshold.
3. **Historical Price Analysis**:
   - Track and display historical price data for products.
   - Provide insights and trends on price movements over time.
4. **User Dashboard**:
   - A dashboard where users can view tracked products, current prices, historical data, and set alert preferences.
   - User-friendly interface for adding/removing products and managing notifications.
5. **Chrome Extension**:
   - A Chrome extension that allows users to easily add products to their tracking list directly from eCommerce sites.
   - Quick access to the dashboard and recent alerts.

### Technologies Used:

1. **Next.js**:
   - Utilized for building the frontend of the application.
   - Provides server-side rendering for improved performance and SEO.
   - Supports API routes for backend functionality.
2. **Puppeteer with Cheerio**:
   - Puppeteer: A Node.js library which provides a high-level API to control Chrome or Chromium over the Dev-Tools Protocol. It is used for web scraping to simulate browsing activities and extract data.
   - Cheerio: A fast, flexible, and lean implementation of core jQuery designed specifically for the server. Used for parsing and manipulating the HTML data fetched by Puppeteer.
3. **CRON Jobs**:
   - Scheduled tasks for periodic price checks.
   - Automates the process of sending email notifications to users about price changes.

### Implementation outline:

1. **Backend Development**:
   - Set up Next.js with API routes to handle user authentication, product management, and data storage.
   - Implement Puppeteer scripts to fetch product prices from various eCommerce sites.
   - Use Cheerio to parse and extract relevant price information.
2. **Frontend Development**:
   - Develop a user-friendly interface using Next.js for adding and managing tracked products.
   - Implement charts and graphs for historical price analysis.
   - Create a notification system for price alerts.
3. **Chrome Extension**:
   - Develop a Chrome extension to enable users to add products directly from eCommerce sites.
   - Ensure seamless integration with the main application.
4. **Automation and Notification**:
   - Set up CRON jobs for periodic execution of web scraping scripts.
   - Implement email notifications using services like SendGrid or Node mailer.
