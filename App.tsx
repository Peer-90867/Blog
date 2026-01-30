
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Post, Category } from './types';
import { SAMPLE_POSTS } from './constants';

// --- Helper Components ---

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600 font-serif">
              LUMINA
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Technology', 'Lifestyle', 'Design', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/?cat=${item}`}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Home', 'Technology', 'Lifestyle', 'Design', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/?cat=${item}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Link to={`/post/${post.id}`} className="group block">
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            {post.category}
          </span>
          <span className="text-xs text-slate-400">{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-900">By {post.author}</span>
          <span className="text-xs text-slate-400">{post.date}</span>
        </div>
      </div>
    </div>
  </Link>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <span className="text-2xl font-black tracking-tighter text-white font-serif mb-4 block">LUMINA</span>
          <p className="text-slate-400 text-sm max-w-xs mb-6">
            Exploring the intersection of technology, design, and modern lifestyle through thoughtful analysis and storytelling.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/?cat=Technology" className="hover:text-white">Technology</Link></li>
            <li><Link to="/?cat=Lifestyle" className="hover:text-white">Lifestyle</Link></li>
            <li><Link to="/?cat=Design" className="hover:text-white">Design</Link></li>
            <li><Link to="/?cat=Future" className="hover:text-white">Future</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <p className="text-sm text-slate-400 mb-4">Get the latest insights delivered straight to your inbox.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2024 Lumina Blog. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="/ads.txt" className="hover:text-slate-300">Ads.txt</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catParam = query.get('cat');

  const filteredPosts = useMemo(() => {
    if (!catParam) return SAMPLE_POSTS;
    return SAMPLE_POSTS.filter(p => p.category.toLowerCase() === catParam.toLowerCase());
  }, [catParam]);

  const featuredPost = SAMPLE_POSTS[0];
  const gridPosts = filteredPosts.filter(p => p.id !== (catParam ? '' : featuredPost.id));

  return (
    <div className="animate-in fade-in duration-700">
      {!catParam && (
        <section className="mb-16">
          <Link to={`/post/${featuredPost.id}`} className="relative group overflow-hidden rounded-3xl block shadow-2xl">
            <div className="aspect-[21/9] w-full">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-3xl">
                <span className="inline-flex items-center rounded-full bg-indigo-500 px-3 py-1 text-sm font-bold text-white mb-4">
                  Featured Article
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight font-serif">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-200 text-lg mb-6 line-clamp-2 md:line-clamp-none">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                  <span>{featuredPost.author}</span>
                  <span className="h-1 w-1 bg-slate-500 rounded-full"></span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {catParam ? `${catParam} Articles` : 'Recent Stories'}
          </h2>
          {!catParam && (
             <Link to="/?cat=Technology" className="text-sm font-bold text-indigo-600 hover:text-indigo-500">
                View all &rarr;
             </Link>
          )}
        </div>
        
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl text-slate-400">No posts found in this category.</h3>
            <Link to="/" className="text-indigo-600 font-bold mt-4 block">Return to Home</Link>
          </div>
        )}
      </section>

      {/* Ad Placeholder (Simulating where AdSense would go) */}
      <section className="my-16 py-12 bg-slate-100 rounded-3xl text-center border-2 border-dashed border-slate-300">
        <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Advertisement</p>
        <div className="mt-4 h-[250px] flex items-center justify-center">
          <span className="text-slate-300 italic">Sponsored Content</span>
        </div>
      </section>
    </div>
  );
};

const PostDetailPage: React.FC = () => {
  const { id } = useLocation().pathname.split('/').slice(-1)[0] ? {id: useLocation().pathname.split('/').pop()} : {id: ''};
  const post = SAMPLE_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Post not found.</h2>
        <Link to="/" className="text-indigo-600 mt-4 block">Back to homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      <header className="mb-12">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700 mb-6 uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8 font-serif">
          {post.title}
        </h1>
        <div className="flex items-center justify-between pb-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img src={`https://ui-avatars.com/api/?name=${post.author}&background=6366f1&color=fff`} className="w-12 h-12 rounded-full shadow-inner" alt={post.author} />
            <div>
              <p className="font-bold text-slate-900">{post.author}</p>
              <p className="text-sm text-slate-500">{post.date} · {post.readTime}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-3xl shadow-lg mb-12" />

      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-xl leading-relaxed text-slate-700 font-medium mb-8">
          {post.excerpt}
        </p>
        <div className="text-slate-700 space-y-6 text-lg leading-relaxed">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <blockquote className="border-l-4 border-indigo-500 pl-6 italic font-serif text-2xl text-slate-800 my-10">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
          </p>
        </div>
      </div>

      <div className="mt-16 py-12 border-y border-slate-200 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <span className="font-bold text-slate-900">Share this post</span>
          <div className="flex gap-4">
             <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Twitter</button>
             <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">Facebook</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
              Subscribe to Lumina
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/about" element={<div className="py-20 text-center"><h1 className="text-4xl font-black">About Lumina</h1><p className="mt-4 text-slate-500">A modern publication for the digital age.</p></div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
