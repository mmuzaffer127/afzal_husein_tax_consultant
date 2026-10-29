import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import GeminiChatModal from '../components/GeminiChatModal';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-[72px] pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
      <GeminiChatModal />
    </div>
  );
}
