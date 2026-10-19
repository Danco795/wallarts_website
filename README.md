# WallArts starter website

A lightweight static website starter for a custom portrait and wall-art business.

## Preview locally
Open `index.html` in a browser. Some images and fonts load from external services.

## Before publishing
1. Replace the placeholder WhatsApp number `254723106225` in `script.js` with your Kenyan number in international format (e.g. `2547...`, without `+`).
2. Confirm all product prices and replace example images with photos you have permission to use.
3. Replace the brand name and add your actual business contact/location details.
4. The contact form opens a prefilled WhatsApp message. It does not store form submissions or send messages automatically.

## Deploy on Vercel
1. Create a GitHub repository and upload `index.html`, `styles.css`, `script.js`, and `README.md` to its root.
2. In Vercel, choose **Add New → Project**, import the repository.
3. For this static site, choose **Other** as the framework if Vercel asks, and leave the build command and output directory blank unless the interface asks otherwise. Deploy.
4. Test the assigned `.vercel.app` address.
5. In Project → Settings → Domains, add your domain and follow the exact DNS instructions Vercel shows. Your friend should make the DNS changes at the registrar if they own the domain.

## Folder
- `index.html`: page content
- `styles.css`: layout and visual design
- `script.js`: WhatsApp enquiry behavior
