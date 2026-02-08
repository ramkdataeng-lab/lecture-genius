# Project Structure

```
lecture-genius/
├── docs/                                    # Documentation files
│   ├── DEVPOST_SUBMISSION_REFERENCE.md     # Devpost submission guide
│   ├── GEMINI_INTEGRATION.md               # Gemini integration details
│   ├── VERCEL_DEPLOYMENT_FIX.md            # Deployment instructions
│   ├── HOW_TO_CONVERT_PDF.md               # PDF conversion guide
│   ├── submission-guide.html               # Visual submission guide
│   ├── gemini-integration.html             # Gemini showcase page
│   ├── README.html                         # HTML version of README
│   └── LectureGenius.pdf                   # PDF documentation
│
├── screenshots/                             # Application screenshots
│   ├── 0_Home_Page.jpg                     # Dashboard screenshot
│   ├── 1_Home_Page.jpg                     # Alternative home view
│   ├── 1_Setting.jpg                       # Settings page
│   ├── 2_Recording.jpg                     # Recording interface
│   └── 3_Transcript.jpg                    # Transcript results
│
├── scripts/                                 # Utility scripts
│   ├── convert-to-pdf.js                   # Node.js PDF converter
│   └── convert-to-pdf.py                   # Python PDF converter
│
├── src/                                     # Source code
│   ├── app/                                # Next.js app directory
│   │   ├── api/                           # API routes
│   │   │   ├── auth/                      # NextAuth endpoints
│   │   │   ├── process-lecture/           # Lecture processing
│   │   │   ├── translate/                 # Translation API
│   │   │   └── history/                   # User history
│   │   ├── record/                        # Recording page
│   │   ├── settings/                      # Settings page
│   │   ├── layout.tsx                     # Root layout
│   │   └── page.tsx                       # Dashboard
│   │
│   ├── components/                         # React components
│   │   └── Sidebar.tsx                    # Navigation sidebar
│   │
│   └── lib/                                # Utility libraries
│       ├── gemini.ts                      # Gemini API integration
│       └── drive.ts                       # Google Drive helpers
│
├── public/                                  # Static assets
│   └── logo.png                           # App logo
│
├── .env.local                              # Environment variables (not in git)
├── .gitignore                              # Git ignore rules
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── next.config.ts                          # Next.js config
├── tailwind.config.ts                      # Tailwind config
├── postcss.config.mjs                      # PostCSS config
├── eslint.config.mjs                       # ESLint config
└── README.md                               # Main documentation
```

## Key Directories

### `/docs`
Contains all documentation files including submission guides, deployment instructions, and HTML/PDF versions of documentation.

### `/screenshots`
Application screenshots for Devpost submission and documentation.

### `/scripts`
Utility scripts for PDF conversion and other tasks.

### `/src/app`
Next.js 14 app directory with pages and API routes.

### `/src/lib`
Shared libraries for Gemini AI and Google Drive integration.

### `/public`
Static assets served directly by Next.js.
