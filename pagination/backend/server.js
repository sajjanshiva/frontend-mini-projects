const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Pagination API is running');
});

// Real data (in-memory) - 50 items across different categories
const items = [
    // Engineering (10 items)
    { id: 1, name: "Tesla Cybertruck Production Scaling", description: "Tesla announces plans to scale Cybertruck production to 250,000 units annually with new manufacturing techniques", category: "Engineering" },
    { id: 2, name: "Quantum Computing Breakthrough", description: "IBM reveals new quantum processor with 1,000+ qubits, achieving quantum advantage in specific calculations", category: "Engineering" },
    { id: 3, name: "SpaceX Starship Updates", description: "SpaceX successfully completes orbital refueling test for Starship, paving way for Mars missions", category: "Engineering" },
    { id: 4, name: "AI Chip Revolution", description: "NVIDIA launches new AI chips that are 30x faster than previous generation for machine learning tasks", category: "Engineering" },
    { id: 5, name: "Fusion Energy Progress", description: "Scientists achieve net energy gain from fusion reaction for the third consecutive time at NIF facility", category: "Engineering" },
    { id: 6, name: "Hyperloop Development", description: "Virgin Hyperloop conducts successful passenger test at 670 mph in new commercial route prototype", category: "Engineering" },
    { id: 7, name: "3D Printing Innovation", description: "New 3D printing technology can now create entire houses in 24 hours using sustainable materials", category: "Engineering" },
    { id: 8, name: "Electric Aircraft Certification", description: "First all-electric passenger aircraft receives FAA certification for commercial flights up to 500 miles", category: "Engineering" },
    { id: 9, name: "Robotics in Manufacturing", description: "Advanced AI-powered robots reduce manufacturing costs by 40% while improving quality control", category: "Engineering" },
    { id: 10, name: "Solar Panel Efficiency Record", description: "New perovskite solar cells achieve 33% efficiency, breaking previous laboratory records", category: "Engineering" },
    
    // Medical (10 items)
    { id: 11, name: "Cancer Vaccine Trials", description: "Moderna's personalized cancer vaccine shows 79% reduction in melanoma recurrence in Phase 3 trials", category: "Medical" },
    { id: 12, name: "Alzheimer's Drug Approval", description: "FDA approves new Alzheimer's drug that slows cognitive decline by 35% in early-stage patients", category: "Medical" },
    { id: 13, name: "Gene Therapy Success", description: "CRISPR gene therapy successfully cures sickle cell disease in 95% of trial participants", category: "Medical" },
    { id: 14, name: "Artificial Pancreas System", description: "New closed-loop insulin delivery system approved, improving diabetes management for Type 1 patients", category: "Medical" },
    { id: 15, name: "Heart Disease Prevention", description: "Study reveals daily 20-minute walks reduce heart disease risk by 30% in adults over 50", category: "Medical" },
    { id: 16, name: "AI Medical Diagnosis", description: "AI system detects early-stage lung cancer with 96% accuracy, outperforming human radiologists", category: "Medical" },
    { id: 17, name: "Malaria Vaccine Rollout", description: "WHO approves second malaria vaccine with 75% efficacy for distribution in African nations", category: "Medical" },
    { id: 18, name: "3D Printed Organs", description: "Scientists successfully transplant 3D-printed liver tissue in human patients for first time", category: "Medical" },
    { id: 19, name: "Mental Health Treatment", description: "New non-invasive brain stimulation therapy shows promise for treatment-resistant depression", category: "Medical" },
    { id: 20, name: "Antibiotic Resistance Solution", description: "Researchers discover new class of antibiotics effective against drug-resistant bacteria", category: "Medical" },
    
    // Technology Details (10 items)
    { id: 21, name: "iPhone 16 Pro Features", description: "Apple unveils iPhone 16 Pro with periscope camera, titanium frame, and A18 Pro chip with 20% better performance", category: "Technology" },
    { id: 22, name: "Windows 12 Release Date", description: "Microsoft confirms Windows 12 launch for Q3 2025 with AI-powered features and redesigned interface", category: "Technology" },
    { id: 23, name: "ChatGPT-5 Announcement", description: "OpenAI announces GPT-5 with multimodal capabilities, better reasoning, and 10x larger context window", category: "Technology" },
    { id: 24, name: "Meta Quest 4 VR Headset", description: "Meta releases Quest 4 with 4K per eye resolution, pancake lenses, and mixed reality passthrough", category: "Technology" },
    { id: 25, name: "Samsung Galaxy S25 Ultra", description: "Samsung launches Galaxy S25 Ultra with 200MP camera, satellite connectivity, and S Pen improvements", category: "Technology" },
    { id: 26, name: "PlayStation 6 Specs Leaked", description: "Sony's next-gen console rumored to feature 8K gaming, ray tracing 2.0, and backwards compatibility", category: "Technology" },
    { id: 27, name: "Starlink Direct-to-Cell", description: "SpaceX activates Starlink satellites with direct smartphone connectivity, eliminating dead zones", category: "Technology" },
    { id: 28, name: "Google Pixel 9 Pro", description: "Google unveils Pixel 9 Pro with Tensor G4 chip, advanced AI photography, and 7 years of updates", category: "Technology" },
    { id: 29, name: "Tesla FSD Version 13", description: "Tesla rolls out Full Self-Driving v13 with end-to-end neural networks and improved city driving", category: "Technology" },
    { id: 30, name: "AMD Ryzen 9000 Series", description: "AMD launches Zen 5 processors with 15% IPC gains and support for DDR5-6000 memory", category: "Technology" },
    
    // News (10 items)
    { id: 31, name: "Climate Summit Agreements", description: "195 nations commit to reducing carbon emissions by 50% by 2035 at COP30 climate summit", category: "News" },
    { id: 32, name: "Global Economy Outlook", description: "IMF projects 3.2% global GDP growth for 2026 amid easing inflation and interest rate cuts", category: "News" },
    { id: 33, name: "Space Station Expansion", description: "International Space Station welcomes new commercial module for private research and tourism", category: "News" },
    { id: 34, name: "Renewable Energy Milestone", description: "Solar and wind power generate 40% of global electricity for first time in history", category: "News" },
    { id: 35, name: "Education Reform Initiative", description: "UNESCO launches global program to integrate AI literacy in school curricula across 120 countries", category: "News" },
    { id: 36, name: "Ocean Cleanup Progress", description: "Ocean cleanup project removes 100,000 tons of plastic from Pacific garbage patch in 2025", category: "News" },
    { id: 37, name: "Housing Market Trends", description: "Home prices stabilize in major cities as interest rates drop to 5.5% from peak of 7.8%", category: "News" },
    { id: 38, name: "Wildlife Conservation Win", description: "Giant panda population increases by 17% as China's conservation efforts show success", category: "News" },
    { id: 39, name: "Digital Currency Adoption", description: "European Central Bank launches digital euro for retail transactions across 20 member states", category: "News" },
    { id: 40, name: "Water Crisis Solution", description: "New desalination technology reduces costs by 60%, providing clean water to 50 million people", category: "News" },
    
    // Sports (10 items)
    { id: 41, name: "FIFA World Cup 2026 Preparations", description: "USA, Mexico, and Canada unveil 16 host cities and stadiums for largest-ever 48-team World Cup", category: "Sports" },
    { id: 42, name: "Olympics 2028 Updates", description: "Los Angeles 2028 Olympics adds breaking, surfing, and skateboarding to permanent sport roster", category: "Sports" },
    { id: 43, name: "NBA Season Highlights", description: "Victor Wembanyama leads Spurs to playoffs averaging 28 points and 4 blocks per game", category: "Sports" },
    { id: 44, name: "Premier League Title Race", description: "Arsenal and Manchester City tied on points heading into final matchday of thrilling season", category: "Sports" },
    { id: 45, name: "Tennis Grand Slam Record", description: "Carlos Alcaraz wins French Open, completing career Grand Slam at age 23", category: "Sports" },
    { id: 46, name: "Formula 1 Championship", description: "Max Verstappen secures 4th consecutive F1 title with 3 races remaining in the season", category: "Sports" },
    { id: 47, name: "Cricket World Cup Final", description: "India defeats Australia by 6 wickets to win ICC Cricket World Cup in front of record crowd", category: "Sports" },
    { id: 48, name: "Super Bowl LX Preview", description: "Kansas City Chiefs face Buffalo Bills in highly anticipated Super Bowl rematch in New Orleans", category: "Sports" },
    { id: 49, name: "Marathon World Record", description: "Kelvin Kiptum breaks marathon world record with time of 2:00:35 in Chicago Marathon", category: "Sports" },
    { id: 50, name: "UFC Championship Fight", description: "New lightweight champion crowned as Islam Makhachev defends title in Abu Dhabi main event", category: "Sports" }
];

// GET /items - Paginated endpoint
app.get('/items', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedItems = items.slice(startIndex, endIndex);
    
    res.json({
        items: paginatedItems,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / limit),
        currentPage: page,
        limit: limit
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});