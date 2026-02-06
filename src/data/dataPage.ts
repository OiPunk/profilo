export interface PageContent {
  title: string;
  subtitle: string;
  content: string;
  lastUpdated: string;
}

export interface PageData {
  [key: string]: PageContent;
}

export const pageData: PageData = {
  documentation: {
    title: "Documentation",
    subtitle: "A comprehensive guide to setting up and customizing the DevPro Tailwind Web Developer Portfolio Template.",
    lastUpdated: "May 18, 2025",
    content: `
      <h2>Setup and Installation</h2>
      <p>Follow these steps to get DevPro up and running on your local machine.</p>
      <h3>1: Prepare Your Tools</h3>
      <p>Ensure you have the following tools installed:</p>
      <ul>
        <li><a href="https://nodejs.org" target="_blank">Node.js</a> (v16 or higher)</li>
        <li><a href="https://npmjs.com" target="_blank">npm</a> (v8 or higher, comes with Node.js)</li>
        <li><a href="https://code.visualstudio.com" target="_blank">Visual Studio Code</a> or your preferred code editor</li>
      </ul>
      <h3>2: Open the Project</h3>
      <p>Unzip the DevPro template and open the <code>devpro</code> folder in your code editor.</p>
      <code>cd devpro</code>
      <h3>3: Install and Run</h3>
      <p>Install dependencies: <code>npm install</code></p>
      <p>Start the development server: <code>npm run dev</code></p>
      <p>Open <a href="http://localhost:4321" target="_blank">http://localhost:4321</a> in your browser to view the site.</p>
      <p>To build for production: <code>npm run build</code></p>
      <p>The production-ready files will be generated in the <code>dist</code> folder.</p>
      <h2>Customization</h2>
      <p>DevPro is built with Tailwind CSS, offering flexible customization options. Modify the template as follows:</p>
      <h4>Custom Tailwind Classes:</h4>
      <p>Add or modify Tailwind classes directly in the <code>src/*.astro</code> files to adjust styling.</p>
      <h4>Modify Tailwind Configuration:</h4>
      <p>Customize styles, fonts, colors, and variables in <code>src/styles/global.css</code>. For example:</p>
      <pre><code>
@import "tailwindcss";
@theme {
    --font-sans: 'Inter', sans-serif;
    --font-code: 'Fira Code', monospace;
    --color-green-50: #f1fcf2;
    --color-green-100: #ddfbe1;
    --color-green-200: #bdf5c6;
    --color-green-300: #8aeb9a;
    --color-green-400: #39d353;
    --color-green-500: #29be43;
    --color-green-600: #1c9d32;
    --color-green-700: #197c2b;
    --color-green-800: #196227;
    --color-green-900: #175023;
    --color-green-950: #072c0f;
}
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
  input::placeholder,
  textarea::placeholder {
    color: theme(--color-gray-400);
  }
  button, [role="button"] {
    cursor: pointer;
  }
}
@custom-variant dark (&:where(.dark, .dark *));
/* addtional css */
      </code></pre>
      <h4>Custom JavaScript, Icons, and Fonts:</h4>
      <p>Update JavaScript, Font Awesome icons, or Google Fonts directly in the <code>src/layout/Layout.astro</code> files.</p>
      <h4>Replace Images:</h4>
      <p>Update images in the <code>public/img</code> folder with your own assets. Ensure file names and paths match those referenced in the HTML.</p>
      <h2>Need Help?</h2>
      <p>If you encounter issues or have questions about customizing DevPro, our support team is here to assist: <a href="mailto:Lightestcode@gmail.com">Lightestcode@gmail.com</a></p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Learn how we collect, use, and protect your personal information when you use our services.",
    lastUpdated: "June 1, 2025",
    content: `
      <h2>Introduction</h2>
      <p>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
      <h3>Information We Collect</h3>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, and other contact details provided when you contact us or subscribe to our newsletter.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, and pages visited, collected via cookies and analytics tools.</li>
      </ul>
      <h3>How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Communicate with you about updates or inquiries.</li>
        <li>Analyze website usage to enhance user experience.</li>
      </ul>
      <h3>Sharing Your Information</h3>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li>Service providers (e.g., hosting or analytics services).</li>
        <li>Legal authorities if required by law.</li>
      </ul>
      <h3>Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal information.</li>
        <li>Opt out of marketing communications.</li>
        <li>Disable cookies via your browser settings.</li>
      </ul>
      <h3>Contact Us</h3>
      <p>For questions about this Privacy Policy, contact us at: <a href="mailto:Lightestcode@gmail.com">Lightestcode@gmail.com</a></p>
    `,
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Understand the terms and conditions governing your use of our services and website.",
    lastUpdated: "June 1, 2025",
    content: `
      <h2>Introduction</h2>
      <p>By using our website or services, you agree to these Terms of Service. Please read them carefully.</p>
      <h3>Use of Services</h3>
      <p>You agree to use our services only for lawful purposes and in accordance with these terms. Prohibited activities include:</p>
      <ul>
        <li>Violating any applicable laws or regulations.</li>
        <li>Distributing malicious content, such as viruses.</li>
        <li>Attempting to gain unauthorized access to our systems.</li>
      </ul>
      <h3>Intellectual Property</h3>
      <p>All content on our website, including templates and code, is protected by copyright. You may not reproduce or distribute our content without permission, except as allowed under your license agreement.</p>
      <h3>Payments and Refunds</h3>
      <p>Payments for our services are non-refundable unless otherwise stated. Contact us for refund inquiries within 7 days of purchase.</p>
      <h3>Termination</h3>
      <p>We may terminate your access to our services if you violate these terms. You will be notified of any termination.</p>
      <h3>Limitation of Liability</h3>
      <p>Our services are provided "as is." We are not liable for any damages arising from your use of our website or services.</p>
      <h3>Contact Us</h3>
      <p>For questions about these Terms of Service, contact us at: <a href="mailto:Lightestcode@gmail.com">Lightestcode@gmail.com</a></p>
    `,
  },
};