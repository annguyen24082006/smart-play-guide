import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import SetupGuide from '@/pages/SetupGuide';
import DIY from '@/pages/DIY';
import Challenge from '@/pages/Challenge';
import Leaderboard from '@/pages/Leaderboard';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ve-chung-toi" element={<About />} />
          <Route path="/huong-dan-cai-dat" element={<SetupGuide />} />
          <Route path="/hoat-dong-cung-con" element={<DIY />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/bang-xep-hang" element={<Leaderboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
