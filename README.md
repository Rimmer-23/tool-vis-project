# Trivia Visualization Tool

A React-based data visualization application that fetches trivia questions from the Open Trivia Database API and presents interactive charts and filtering capabilities.

> **⚙️ Development Notice**
>
> This project is currently being upgraded on the `features` branch.  
> Active work includes UI improvements and feature enhancements.  
> Please refer to the `main` branch for the stable version.


- **API**: Open Trivia Database (https://opentdb.com)
- **Questions**: 185+ questions from 6 categories
- **Features**: Category list, distribution charts, difficulty breakdown, filtering
- **Tech**: React functional components, Recharts library, clean UI


##  Technology Stack

- **React 19.1.1** - Functional components with hooks
- **Recharts 3.3.0** - Data visualization library
- **Axios 1.8.4** - HTTP client for API requests
- **Vite 7.1.7** - Build tool and dev server

##  Features

### 1. **Category Overview**
- Grid layout with question counts
- Clean card-based design

### 2. **Interactive Bar Chart**
- Visual representation of questions per category
- Custom hover effects and responsive design

### 3. **Difficulty Distribution Pie Chart**
- Percentage breakdown of Easy/Medium/Hard questions
- Color-coded segments with interactive tooltips

### 4. **Smart Filtering**
- Dropdown filter in header
- Real-time chart updates
- Only shows loaded categories

### 5. **Loading & Error Handling**
- Animated spinner during fetch
- Sequential API calls to handle rate limits
- Graceful error handling

##  Project Structure

```
src/
├── components/
│   ├── Header.jsx                    # Navigation & filtering
│   ├── MainSection.jsx               # Data orchestration
│   └── main section components/
│       ├── CategoriesListSection.jsx     # Category cards
│       ├── CategoryDistributionSection.jsx   # Bar chart
│       └── DifficultyDistributionSection.jsx # Pie chart
├── pages/MainPage.jsx                # Main layout
└── App.jsx                           # Root component
```

## Key Technical Solutions

- **Rate Limiting**: Sequential fetching with 5-second delays
- **Data Processing**: HTML entity decoding for proper display
- **Responsive Design**: Mobile-first CSS approach
- **State Management**: Efficient React hooks usage

## Getting Started

```bash
# Clone and install
git clone https://github.com/Rimmer-23/tool-vis-project.git
cd tool-vis-project
npm install

# Development
npm run dev

# Production build
npm run build
```
