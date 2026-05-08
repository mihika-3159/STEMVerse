# STEMVerse 🌌

**Interactive AI Simulation World for STEM Education**

Built for **DSH Hacks V1** | AI x STEM Education

STEMVerse is a living simulation world where complex STEM concepts behave like dynamic systems. Students explore physics, biology, chemistry, and math through interactive playgrounds, receiving real-time guidance from a Gemini-powered AI tutor that adapts to their experiments.

---

## 🚀 Vision
STEMVerse aims to replace static textbooks with interactive, AI-driven exploration. We believe the best way to learn is by doing—manipulating variables, breaking systems, and observing outcomes in a safe, visual environment.

## ✨ Key Features

- **Physics World (Projectile Motion):** Master kinematics with real-time trajectory calculation and variable gravity.
- **Biology World (Ecosystem Sim):** Balance predator-prey dynamics using Lotka-Volterra equations.
- **Chemistry World (Reaction Lab):** Visualize collision theory and reaction kinetics.
- **Math World (Optimization):** Explore gradient descent and find global minima visually.
- **Adaptive AI Tutor:** A Gemini-integrated sidebar that explains simulation behavior and identifies misconceptions.
- **Student Dashboard:** Track your progress across different worlds and earn badges.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **Visualizations:** Recharts, HTML5 Canvas
- **AI Engine:** Google Gemini API
- **State Management:** React Hooks (Custom Simulation Hooks)

## 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mihika-3159/STEMVerse.git
   cd STEMVerse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to enter the STEMVerse.

## 🤖 AI Usage & Educational Impact
STEMVerse leverages the **Gemini 1.5 Flash** model to provide:
1. **Contextual Explanations:** The AI knows exactly what variables you've changed and explains the physical/chemical result.
2. **Misconception Detection:** If a student sets "impossible" parameters or repeats mistakes, the AI intervenes with guiding questions.
3. **Personalized Difficulty:** The system suggests experiments based on the student's current understanding.

## 🔮 Future Roadmap
- [ ] Multiplayer "Lab Rooms" for collaborative experiments.
- [ ] 3D simulations using Three.js/React Three Fiber.
- [ ] Voice-integrated AI tutor for hands-free learning.
- [ ] Support for more worlds: Astronomy, Engineering, and Finance.

---
Built with ❤️ for student innovators everywhere.
