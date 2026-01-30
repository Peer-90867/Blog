
import { Category, Post } from './types';

export const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Generative AI in Creative Design',
    excerpt: 'Explore how AI is reshaping the landscape of modern design and what it means for professional creators.',
    content: `Generative AI has evolved from a novelty to a fundamental tool in the creative toolkit. Design workflows are being reimagined as AI models assist in brainstorming, prototyping, and final asset generation. This shift doesn't replace the designer but rather amplifies their capabilities, allowing them to focus on high-level strategy and emotional connection.`,
    author: 'Alex Sterling',
    date: 'Oct 24, 2023',
    category: Category.TECHNOLOGY,
    imageUrl: 'https://picsum.photos/seed/ai-design/1200/600',
    readTime: '6 min read'
  },
  {
    id: '2',
    title: 'Minimalism: A Path to Mental Clarity',
    excerpt: 'How stripping away the excess in our physical environment can lead to a more focused and peaceful mind.',
    content: `Minimalism is more than an aesthetic; it's a philosophy of intentional living. By choosing to surround ourselves with only what brings value, we create space for thoughts to breathe. This post explores the psychological benefits of decluttering and practical steps to start your minimalist journey.`,
    author: 'Elena Vance',
    date: 'Oct 22, 2023',
    category: Category.LIFESTYLE,
    imageUrl: 'https://picsum.photos/seed/minimal/800/500',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Sustainable Architecture in Urban Jungles',
    excerpt: 'Innovative ways cities are incorporating nature into high-rise living to combat climate change.',
    content: `Biophilic design is taking center stage as urban areas face rising temperatures. From vertical forests to modular green roofing, architects are finding ways to bring ecosystems back into the concrete jungle. These solutions not only improve air quality but also provide vital habitats for local biodiversity.`,
    author: 'Marcus Chen',
    date: 'Oct 20, 2023',
    category: Category.DESIGN,
    imageUrl: 'https://picsum.photos/seed/green-city/800/500',
    readTime: '8 min read'
  },
  {
    id: '4',
    title: 'Quantum Computing: Breaking the Silicon Barrier',
    excerpt: 'A deep dive into the next frontier of processing power and its potential to solve impossible problems.',
    content: `While traditional computers rely on bits, quantum computers use qubits, leveraging entanglement and superposition to perform complex calculations in seconds. This leap in processing power holds the key to breakthroughs in medicine, materials science, and cryptography.`,
    author: 'Sarah Jenkins',
    date: 'Oct 18, 2023',
    category: Category.FUTURE,
    imageUrl: 'https://picsum.photos/seed/quantum/800/500',
    readTime: '10 min read'
  }
];
