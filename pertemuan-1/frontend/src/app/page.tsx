import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    // Background menggunakan gradasi pink pastel dan ungu lembut
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 py-16 font-sans">
      <Container>
        <div className="flex flex-col items-center justify-center space-y-10">
          
          {/* Bagian Judul Utama (Hero Section) */}
          <div className="text-center space-y-5 max-w-2xl">
            <Badge className="bg-pink-200 text-pink-800 hover:bg-pink-300 border-none px-5 py-1.5 text-sm rounded-full shadow-sm tracking-wide">
              ❀ Girls' Love Visual Novel ❀
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-pink-950 drop-shadow-sm font-serif italic">
              Yuri <span className="text-rose-500">Aesthetics</span>
            </h1>
            
            <p className="text-lg text-rose-800/80 leading-relaxed">
              Selamat datang di galeri rute cerita. Temukan keindahan interaksi, harmoni, dan narasi emosional yang menyentuh hati di setiap chapternya.
            </p>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4">
            <Button className="bg-rose-400 text-white hover:bg-rose-500 rounded-full px-8 py-6 text-lg shadow-lg shadow-rose-200 transition-all">
              Mulai Cerita Baru
            </Button>
            <Button variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-100 hover:text-rose-900 rounded-full px-8 py-6 text-lg bg-white/50 backdrop-blur-sm">
              Muat Data (Load)
            </Button>
          </div>

          {/* Grid Karakter / Rute */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl pt-8">
            
            {/* Kartu Rute 1 */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-[2rem] border-2 border-pink-100 shadow-xl shadow-pink-900/5 flex flex-col gap-4 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-rose-900 group-hover:text-rose-600 transition-colors">
                  Rute Bunga Lili
                </h3>
                <Badge className="bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 border-none">
                  Chapter 4
                </Badge>
              </div>
              <p className="text-rose-700/80 mt-2">
                "Di bawah pohon sakura itu, senyumnya terasa lebih hangat dari musim semi."
              </p>
              <div className="mt-4 pt-4 border-t border-pink-200/50 flex justify-between items-center">
                <span className="text-sm text-pink-600 font-medium">Status: Terbuka</span>
                <Button variant="ghost" className="text-rose-600 hover:bg-rose-100 rounded-xl">
                  Lanjutkan ➔
                </Button>
              </div>
            </div>

            {/* Kartu Rute 2 */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-[2rem] border-2 border-pink-100 shadow-xl shadow-pink-900/5 flex flex-col gap-4 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-rose-900 group-hover:text-rose-600 transition-colors">
                  Rute Musim Gugur
                </h3>
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                  Terkunci
                </Badge>
              </div>
              <p className="text-rose-700/80 mt-2">
                Selesaikan rute pertama untuk mengungkap rahasia yang tersimpan di perpustakaan lama.
              </p>
              <div className="mt-4 pt-4 border-t border-pink-200/50 flex justify-between items-center opacity-50">
                <span className="text-sm text-slate-500 font-medium">Syarat belum terpenuhi</span>
                <Button disabled variant="outline" className="rounded-xl">
                  Terkunci 🔒
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </main>
  );
}