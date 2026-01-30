
import { GoogleGenAI } from "@google/genai";

// --- Global Type Declarations ---
// Fix: Declare custom properties on the global Window interface to satisfy TypeScript
declare global {
  interface Window {
    route: (target: string) => void;
    filterPosts: (cat: string) => void;
    toggleAI: () => void;
  }
}

// --- State Management & Constants ---

const posts = [
  {
    id: '1',
    title: 'The Synthesis of AI and Human Creativity',
    excerpt: 'How large language models and latent diffusion are becoming the next brush and canvas for modern artists.',
    content: `We are entering a new era where the barrier between thought and visual execution is dissolving. Generative AI isn't just a shortcut; it's a partner in the creative process. Designers today are using prompts to explore thousands of iterations in minutes, a feat that would have taken months just five years ago.\n\nHowever, the 'soul' of the art remains human. It is the selection, the curation, and the emotional intent that defines great design. This post explores the technical breakthroughs in 2025 that are making AI tools feel more like intuition and less like software.`,
    author: 'Alex Sterling',
    date: 'March 15, 2025',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'The Architecture of Silence',
    excerpt: 'Why modern interior design is shifting back towards minimalism to combat digital overstimulation.',
    content: `In a world that never stops pinging, our physical homes are becoming our last true sanctuaries. The 'Architecture of Silence' is a movement focusing on acoustic dampening, natural light management, and the removal of visual noise.\n\nBy using tactile materials like raw linen, stone, and reclaimed wood, architects are creating spaces that lower cortisol levels upon entry. This isn't just about looks; it's about neural health in an age of constant connectivity.`,
    author: 'Elena Vance',
    date: 'March 12, 2025',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Urban Re-wilding: The Green Metropolis',
    excerpt: 'How major cities are tearing up concrete to bring back indigenous ecosystems.',
    content: `Cities like Tokyo, London, and Paris are leading a radical shift in urban planning. The goal is no longer just 'parks' but functional ecosystems that can manage rainwater, cool the air, and provide habitats for local wildlife.\n\nWe look at the modular balcony forests in Singapore and how they are successfully lowering the city's average temperature by several degrees. The future city isn't made of steel—it's made of life.`,
    author: 'Marcus Chen',
    date: 'March 10, 2025',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1600',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Quantum Advantage in Daily Life',
    excerpt: 'Breaking down how quantum processors are finally reaching the consumer cloud.',
    content: `Quantum computing has long been a 'five years away' technology. But in 2025, we are seeing the first real-world applications in logistics and pharmaceutical research that directly affect the average person.\n\nFrom optimizing delivery routes to simulating new battery materials for longer-lasting smartphones, the quantum advantage is subtly weaving itself into the fabric of our lives.`,
    author: 'Sarah Jenkins',
    date: 'March 08, 2025',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600',
    readTime: '6 min read'
  }
];

let currentFilter = 'All';

// --- Routing & Rendering ---

function render() {
  const path = window.location.hash.replace('#', '');
  
  if (path.startsWith('post/')) {
    const id = path.split('/')[1];
    renderPost(id);
  } else {
    renderHome();
  }
}

function renderHome() {
  const app = document.getElementById('app');
  if (!app) return;
  const filtered = currentFilter === 'All' ? posts : posts.filter(p => p.category === currentFilter);
  
  const heroPost = posts[0];
  const gridPosts = filtered.filter(p => p.id !== heroPost.id || currentFilter !== 'All');

  app.innerHTML = `
    <div class="fade-in">
      ${currentFilter === 'All' ? `
        <section class="mb-16">
          <div onclick="route('post/${heroPost.id}')" class="relative cursor-pointer group rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img src="${heroPost.image}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-8 md:p-16 flex flex-col justify-end">
              <span class="inline-block bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">Top Story</span>
              <h1 class="text-3xl md:text-5xl font-black text-white font-serif italic mb-4 max-w-3xl leading-tight">
                ${heroPost.title}
              </h1>
              <p class="text-slate-200 text-lg mb-6 max-w-2xl line-clamp-2 md:line-clamp-none">${heroPost.excerpt}</p>
              <div class="flex items-center gap-4 text-white/80 text-sm">
                <span class="font-bold">${heroPost.author}</span>
                <span class="w-1 h-1 bg-white/40 rounded-full"></span>
                <span>${heroPost.date}</span>
              </div>
            </div>
          </div>
        </section>
      ` : ''}

      <div class="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <h2 class="text-2xl font-black text-slate-900 font-serif italic tracking-tight">${currentFilter} Stories</h2>
        <div class="flex gap-2">
          ${['All', 'Technology', 'Lifestyle', 'Design'].map(cat => `
            <button onclick="window.filterPosts('${cat}')" class="text-xs px-3 py-1.5 rounded-full font-bold transition ${currentFilter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${gridPosts.map(post => `
          <div onclick="route('post/${post.id}')" class="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="aspect-video overflow-hidden">
              <img src="${post.image}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            </div>
            <div class="p-6">
              <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">${post.category}</span>
              <h3 class="text-xl font-bold mb-3 group-hover:text-indigo-600 transition leading-tight">${post.title}</h3>
              <p class="text-slate-500 text-sm mb-6 line-clamp-2">${post.excerpt}</p>
              <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>By ${post.author}</span>
                <span>${post.readTime}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Ad Placeholder -->
      <div class="mt-20 p-8 bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl text-center">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advertisement</span>
        <div class="h-40 flex items-center justify-center text-slate-300 italic">Sponsored Content Spot</div>
      </div>
    </div>
  `;
}

function renderPost(id: string) {
  const post = posts.find(p => p.id === id);
  const app = document.getElementById('app');
  if (!app) return;

  if (!post) {
    app.innerHTML = `<div class="py-20 text-center"><h2 class="text-2xl font-bold">404 - Post not found</h2><a href="#" onclick="route('home')" class="text-indigo-600 mt-4 block">Return home</a></div>`;
    return;
  }

  app.innerHTML = `
    <article class="fade-in max-w-3xl mx-auto">
      <header class="mb-12">
        <button onclick="route('home')" class="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Journal
        </button>
        <span class="inline-block text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">${post.category}</span>
        <h1 class="text-4xl md:text-6xl font-black font-serif italic mb-8 leading-tight">${post.title}</h1>
        <div class="flex items-center gap-4 py-6 border-y border-slate-100">
          <img src="https://ui-avatars.com/api/?name=${post.author}&background=6366f1&color=fff" class="w-10 h-10 rounded-full" />
          <div class="text-sm">
            <p class="font-bold text-slate-900">${post.author}</p>
            <p class="text-slate-400">${post.date} · ${post.readTime}</p>
          </div>
          <button onclick="summarizePost('${post.id}')" class="ml-auto flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-100 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            AI SUMMARIZE
          </button>
        </div>
      </header>

      <img src="${post.image}" class="w-full rounded-3xl shadow-lg mb-12" />

      <div id="summary-box" class="hidden mb-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <h4 class="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-4.742A1 1 0 0016.446 10h-2.113l.392-2.352a1 1 0 00-1.742-.76l-4.595 5.17A1 1 0 009.108 13h2.113l-.392 2.352a1 1 0 00.922 1.648z"/></svg>
          AI Insight Summary
        </h4>
        <div id="summary-content" class="text-sm text-indigo-800 leading-relaxed italic">Generating summary...</div>
      </div>

      <div class="post-content prose prose-lg prose-slate max-w-none text-slate-700 text-lg">
        ${post.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        <p>In addition to these points, the evolving nature of our digital landscapes means that adaptability is the most valuable trait a modern professional can possess. Whether it's the tools we use or the spaces we inhabit, the convergence of aesthetic value and functional performance is non-negotiable.</p>
      </div>

      <div class="mt-20 pt-12 border-t border-slate-100">
        <h4 class="text-sm font-black mb-8">Related Articles</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${posts.filter(p => p.id !== id).slice(0, 2).map(p => `
            <div onclick="route('post/${p.id}')" class="group cursor-pointer flex gap-4">
              <img src="${p.image}" class="w-24 h-24 rounded-xl object-cover" />
              <div>
                <span class="text-[9px] font-black text-indigo-600 uppercase tracking-widest">${p.category}</span>
                <h5 class="text-sm font-bold group-hover:text-indigo-600 transition leading-tight mt-1">${p.title}</h5>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  `;
  window.scrollTo(0, 0);
}

// --- AI Logic (Gemini API) ---

async function askAI(question: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const systemPrompt = `You are Lumina AI, an intelligent assistant for Lumina Blog. 
  Our blog covers Technology, Design, and Lifestyle. 
  Current articles: ${posts.map(p => `"${p.title}"`).join(', ')}.
  Respond in a modern, professional, yet friendly tone. Keep answers concise (max 3 sentences).`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: question,
      config: { systemInstruction: systemPrompt }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('AI Error:', error);
    return "I'm having a bit of a brain fog right now. Could you try asking again?";
  }
}

async function summarizePost(id: string) {
  const box = document.getElementById('summary-box');
  const content = document.getElementById('summary-content');
  if (!box || !content) return;
  box.classList.remove('hidden');
  content.innerHTML = '<div class="flex items-center gap-2"><div class="loader w-4 h-4 border-2 rounded-full"></div> Thinking...</div>';

  const post = posts.find(p => p.id === id);
  if (!post) {
    content.innerText = "Post not found.";
    return;
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this blog post into 3 short bullet points: ${post.title}\n\n${post.content}`,
    });
    content.innerText = response.text || "Summary could not be generated.";
  } catch (error) {
    content.innerText = "Unable to generate summary at this time.";
  }
}

// --- Event Handlers & Global Utils ---

// Fix: Add explicit global window properties to fix 'Property does not exist' errors
window.route = (target: string) => {
  window.location.hash = target;
  render();
};

window.filterPosts = (cat: string) => {
  currentFilter = cat;
  window.location.hash = 'home';
  render();
};

window.toggleAI = () => {
  const modal = document.getElementById('ai-modal');
  if (modal) {
    modal.classList.toggle('hidden');
  }
};

// Fix: Cast elements to appropriate types to resolve property access errors
const aiForm = document.getElementById('ai-form') as HTMLFormElement;
if (aiForm) {
  aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('ai-input') as HTMLInputElement;
    const messages = document.getElementById('ai-messages');
    
    if (!input || !messages) return;
    
    const query = input.value.trim();
    
    if (!query) return;

    // Add user message
    messages.innerHTML += `
      <div class="bg-indigo-600 p-4 rounded-2xl rounded-tr-none ml-12 text-white">
        ${query}
      </div>
    `;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // AI Response
    const aiResponse = await askAI(query);
    messages.innerHTML += `
      <div class="bg-slate-100 p-4 rounded-2xl rounded-tl-none mr-12 text-slate-700">
        ${aiResponse}
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  });
}

// Init
window.addEventListener('hashchange', render);
window.onload = render;
