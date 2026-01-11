# 🚀 Live Dashboard - Real-time System Monitoring Application

A high-performance, real-time monitoring dashboard built with Next.js 16, React 19, and TypeScript. This application features a custom rendering engine using HTML5 Canvas for ultra-smooth data visualization with backpressure management and Web Worker integration.

![Live Dashboard Preview](./images/image_live_dashboard.png)

## 📺 Demo Video

<video width="100%" autoplay muted loop controls>
  <source src="./images/2026-01-11%2009-05-34.mp4" type="video/mp4">
  Your browser doesn't support video playback. <a href="./images/2026-01-11%2009-05-34.mp4">Download the video</a>
</video>

## ✨ Features

### 🎯 Core Capabilities
- **Real-time Data Streaming**: Live visualization of incoming data streams with minimal latency
- **Custom Rendering Engine**: High-performance Canvas 2D rendering optimized for smooth 60 FPS
- **Web Worker Integration**: Off-main-thread data processing for better performance
- **Backpressure Management**: Intelligent frame dropping to prevent UI lag under heavy load
- **Responsive Design**: Fully responsive layout with Tailwind CSS

### 📊 Dashboard Components
1. **Metric Cards**: Four dynamic metric cards displaying:
   - Events per Second (EPS) with delta indicators
   - Average Latency
   - Maximum Latency
   - Connection Status with uptime tracking

2. **Live Chart Canvas**: Real-time line chart with:
   - Gradient fill effects
   - Glowing animated lines
   - Grid overlays
   - Pulsing data point indicator
   - Time-based positioning for smooth animations

3. **Recent Events Log**: Scrollable event table showing:
   - Timestamped events
   - Event sources
   - Event types (INFO, SUCCESS, WARN, DEBUG)
   - Performance values

4. **Client Performance Panel**: Monitoring client-side metrics:
   - FPS (Frames Per Second)
   - OPS (Operations Per Second)
   - DROP (Dropped Frames)

### 🎨 UI/UX Features
- Dark mode optimized design with slate color palette
- Smooth animations and transitions
- Material Design inspired icons (Lucide React)
- Interactive navigation bar with:
  - Real-time UTC clock
  - Live/Offline status indicator
  - User profile menu with dropdown
  - Breadcrumb navigation

## 🏗️ Project Architecture

### Directory Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & Tailwind configuration
│   ├── layout.tsx               # Root layout with navbar
│   └── page.tsx                 # Main dashboard page
│
├── components/                   # React Components
│   ├── ChartCanvas.tsx          # Main chart rendering component
│   ├── clock_component_navbar.tsx  # UTC clock display
│   ├── livedatacard.tsx         # Online/Offline status indicator
│   ├── logStats.tsx             # Event log table
│   ├── metric_card.tsx          # Metric display cards
│   ├── Navbar_path_show.tsx     # Breadcrumb navigation
│   ├── Navbar.tsx               # Main navigation component
│   ├── PerformancePanel.tsx     # Client performance metrics
│   ├── profile_icon.tsx         # User profile dropdown menu
│   └── ui/
│       └── card.tsx             # Reusable card component
│
├── engine/                       # Core Rendering Engine
│   ├── backpressure.ts          # Frame dropping logic
│   ├── batcher.ts               # Data batching utilities
│   ├── databuffer.ts            # Circular buffer implementation
│   ├── metrics.ts               # FPS counter
│   ├── renderer.ts              # Canvas rendering functions
│   ├── scheduler.ts             # Render loop management
│   └── stats.ts                 # Global statistics tracker
│
├── lib/                         # Utilities
│   ├── fakestream.ts            # Mock data stream generator
│   └── utils.ts                 # Tailwind class utilities
│
├── types/                       # TypeScript Type Definitions
│   ├── client_performance.ts    # Client performance types & hooks
│   └── metrics.tsx              # Metrics types & hooks
│
├── worker/                      # Web Workers
│   └── steam.worker.ts          # Data processing worker
│
├── components.json              # shadcn/ui configuration
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies
├── postcss.config.mjs           # PostCSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🔧 Technical Implementation

### 1. **Rendering Engine** (`/engine`)

#### DataBuffer (`databuffer.ts`)
- **Circular buffer** implementation for efficient data storage
- Fixed-size buffer (300 data points)
- Maintains chronological order with automatic wraparound
- Provides snapshot functionality for rendering

```typescript
class DataBuffer {
  - push(value): Add new data point
  - getsnapshot(): Get all data in chronological order
}
```

#### Renderer (`renderer.ts`)
- **Canvas 2D** rendering optimized for performance
- Features:
  - Smooth line interpolation
  - Gradient fill under curves
  - Glow effects with shadow blur
  - Pulsing dot at latest data point
  - Anti-aliasing enabled

#### Scheduler (`scheduler.ts`)
- **requestAnimationFrame** based render loop
- Graceful cleanup on component unmount
- Consistent 60 FPS target

#### Backpressure (`backpressure.ts`)
- Prevents UI freezing under heavy load
- Throttles rendering to 16ms intervals (~60 FPS)
- Tracks dropped frames for monitoring

#### Metrics (`metrics.ts`)
- **FPSCounter** class for real-time FPS tracking
- Updates every second
- Provides accurate frame rate measurements

#### Stats (`stats.ts`)
- Global statistics object tracking:
  - Total events processed
  - Dropped frames
  - Batch operations
  - Raw data values
  - Current FPS

### 2. **Web Worker Architecture** (`/worker`)

#### Stream Worker (`steam.worker.ts`)
- Runs on separate thread to avoid blocking main UI
- **Batching strategy**:
  - Buffers incoming data points (MAX_BUFFER_SIZE = 2)
  - Calculates average of batch
  - Sends processed batch back to main thread
- Reduces main thread workload by ~50%

### 3. **State Management** (`/types`)

#### Metrics Hook (`metrics.tsx`)
```typescript
useMetrics() - Custom hook providing:
  - Events Per Second (EPS)
  - EPS Delta (% change)
  - Average Latency
  - Max Latency
  - Progress bar values
  - Connection status
  - Uptime tracking
```

Updates every 1000ms by polling global `stats` object.

#### Client Performance Hook (`client_performance.ts`)
```typescript
useClientPerformance() - Tracks client-side metrics:
  - FPS (Frames Per Second)
  - OPS (Operations Per Second)
  - Dropped Frames
  - Progress percentages
```

### 4. **Component Architecture** (`/components`)

#### ChartCanvas Component
- Main visualization component
- **Lifecycle**:
  1. Initializes Web Worker
  2. Sets up Canvas context
  3. Starts fake data stream
  4. Begins render loop
  5. Applies backpressure
  6. Cleans up on unmount
- Uses refs for:
  - Canvas element
  - Container dimensions
  - Data buffer
  - FPS counter
  - Worker reference
  - Last render timestamp

#### MetricCards Component
- Displays 4 key metrics with:
  - Animated icons
  - Delta indicators (trending up/down)
  - Progress bars with custom colors
  - Live status badges

#### LogStats Component
- Static event log table
- Features:
  - Color-coded event types
  - Hover effects
  - Sticky header
  - Custom scrollbar (hidden)

#### PerformancePanel Component
- Real-time client performance metrics
- Progress bars with color coding:
  - Emerald: FPS
  - Blue: OPS
  - Orange: Dropped Frames

#### Navbar Components
- **Navbar**: Main header container
- **ClockComponentNavbar**: UTC time display with auto-update
- **LiveDataCard**: Online/offline status with network detection
- **Navbar_path_show**: Breadcrumb navigation
- **ProfileIcon**: Dropdown menu using Headless UI

## 📦 Dependencies

### Core Framework
- **Next.js 16.1.1**: React framework with App Router
- **React 19.2.3**: UI library
- **TypeScript 5**: Type safety

### UI Libraries
- **Tailwind CSS 4**: Utility-first CSS framework
- **@tailwindcss/postcss 4**: PostCSS integration
- **tw-animate-css 1.4.0**: Animation utilities
- **lucide-react 0.562.0**: Icon library
- **@headlessui/react 2.2.9**: Unstyled UI components
- **@heroicons/react 2.2.0**: Icon set
- **class-variance-authority 0.7.1**: CSS variant management
- **clsx 2.1.1**: Conditional classNames
- **tailwind-merge 3.4.0**: Tailwind class merging

### Development Tools
- **ESLint 9**: Code linting
- **eslint-config-next**: Next.js ESLint preset

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
```bash
cd 5.Live_dashbord/my-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Styling System

### Color Palette
- **Primary**: `#13ec80` (Bright Green)
- **Background**: `#0b1220`, `#0f172a` (Dark Blues)
- **Cards**: `#1e293b` (Slate 900)
- **Borders**: `#334155` (Slate 800)
- **Text**: Slate color variants

### Theme Configuration
Custom theme tokens defined in [globals.css](my-app/app/globals.css):
- CSS custom properties for colors
- Radius utilities
- Font families (Geist Sans, Geist Mono)

## 🔑 Key Technical Decisions

### 1. **Why Canvas over SVG/HTML?**
- **Performance**: Canvas is faster for high-frequency updates
- **Control**: Direct pixel manipulation for custom effects
- **Smooth Animations**: No DOM reflows on data updates

### 2. **Why Web Workers?**
- **Non-blocking**: Data processing doesn't freeze UI
- **Scalability**: Can handle higher data rates
- **Separation**: Clean separation of concerns

### 3. **Why Circular Buffer?**
- **Memory Efficient**: Fixed memory footprint
- **O(1) Operations**: Constant time push/read
- **No Memory Leaks**: Automatic old data eviction

### 4. **Why Backpressure?**
- **Stability**: Prevents UI from freezing
- **Adaptive**: Adjusts to system capabilities
- **User Experience**: Maintains smooth 60 FPS

## 📊 Performance Characteristics

- **Target FPS**: 60
- **Data Points Rendered**: 300 simultaneous
- **Update Frequency**: ~100 updates/second
- **Worker Batch Size**: 2 items
- **Render Throttle**: 16ms (60 FPS)
- **Metric Update Interval**: 1000ms

## 🔮 Future Enhancements

- [ ] Real WebSocket integration
- [ ] Configurable data sources
- [ ] Export dashboard data
- [ ] Multiple chart types
- [ ] Theme customization
- [ ] Alert thresholds
- [ ] Historical data playback
- [ ] Multi-dashboard support
- [ ] Custom metric definitions
- [ ] Data persistence

## 🛠️ Development Notes

### TypeScript Configuration
- Strict mode enabled
- ES2017 target
- React JSX transform
- Path aliases: `@/*` maps to root

### ESLint
- Next.js recommended rules
- Flat config format (ESLint 9+)

### Build Output
- Optimized production bundle
- Static optimization where possible
- Code splitting enabled

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ using Next.js, React, and TypeScript

---

## 🔍 Code Highlights

### Custom Hooks Pattern
All stateful logic is abstracted into custom hooks:
- `useMetrics()` - Server metrics
- `useClientPerformance()` - Client metrics

### Component Composition
Small, focused components that do one thing well:
- Separation of concerns
- Easy to test
- Reusable across the app

### Performance Optimization
- Web Worker for CPU-intensive tasks
- Canvas for high-performance rendering
- requestAnimationFrame for smooth animations
- Backpressure to prevent overload
- Memo-ization where appropriate

### Type Safety
- Full TypeScript coverage
- Strict null checks
- Interface-driven development
- Type inference utilized

---

**Built with cutting-edge web technologies for optimal performance and user experience.**
