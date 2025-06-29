
// README.md
# AI Summarized News Dashboard

A modern, AI-powered news dashboard built with Next.js 14, TypeScript, and OpenAI integration.

## 🚀 Features

### Core Features
- **Latest News**: Fetch and display top headlines from NewsAPI
- **AI Summaries**: Generate intelligent summaries using OpenAI GPT
- **Search & Filter**: Advanced search with category and date filtering
- **Responsive Design**: Mobile-first design with dark/light themes
- **Bookmarking**: Save articles for later reading
- **Real-time Updates**: Loading states and error handling

### AI-Powered Features
- **Article Summarization**: Concise summaries with key points
- **Sentiment Analysis**: Understand article tone and sentiment
- **Keyword Extraction**: Important topics and entities
- **Reading Time**: Estimated reading duration
- **Difficulty Level**: Content complexity assessment

### Technical Features
- **Performance Optimized**: Image optimization and caching
- **SEO Ready**: Meta tags and structured data
- **Error Boundaries**: Graceful error handling
- **Progressive Enhancement**: Works without JavaScript
- **Type Safety**: Full TypeScript coverage

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **AI Integration**: OpenAI GPT-3.5/4
- **News API**: NewsAPI.org
- **Icons**: Lucide React
- **Utilities**: date-fns, clsx

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ai-news-dashboard.git
cd ai-news-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Add your API keys:
```env
NEWS_API_KEY=your_newsapi_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
Visit [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### NewsAPI
1. Visit [NewsAPI.org](https://newsapi.org)
2. Sign up for a free account
3. Copy your API key to `.env.local`

### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create account and add billing
3. Generate API key and add to `.env.local`

## 🧪 API Testing

Use the included Postman collection to test all API endpoints:

### Endpoints
- `GET /api/news` - Fetch news articles
- `POST /api/summarize` - Generate AI summaries
- `POST /api/analyze` - Perform content analysis

Import `postman/AI-News-Dashboard.postman_collection.json` into Postman.

## 🎨 Where I Used AI

### Development Process
- **Code Generation**: Used Claude/ChatGPT for boilerplate component creation
- **API Integration**: AI assistance for OpenAI API implementation
- **Error Handling**: AI-suggested patterns for robust error boundaries
- **TypeScript Types**: AI help with complex type definitions
- **Testing Strategies**: AI recommendations for API testing approaches

### AI Features Implementation
- **Summarization**: OpenAI GPT for intelligent article summaries
- **Sentiment Analysis**: Natural language processing for article tone
- **Keyword Extraction**: AI-powered topic and entity recognition
- **Fallback Systems**: Rule-based alternatives when AI APIs are unavailable

### UI/UX Decisions
- **Component Architecture**: AI suggestions for reusable component patterns
- **Responsive Design**: AI recommendations for mobile-first approach
- **Loading States**: AI-suggested skeleton loading patterns
- **Error States**: AI-designed user-friendly error messages

## 📱 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Configure build settings
- **Railway**: Add environment variables
- **Digital Ocean**: Use App Platform

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## 📊 Project Structure

```
src/
├── app/             # Next.js App Router
├── components/      # React components
├── lib/            # Utilities and services
├── types/          # TypeScript definitions
└── hooks/          # Custom React hooks
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- NewsAPI for news data
- OpenAI for AI capabilities
- shadcn/ui for component library
- Vercel for hosting platform

---

Built with ❤️ using Next.js and AI