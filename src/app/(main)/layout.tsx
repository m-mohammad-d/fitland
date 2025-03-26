import PromoBar from "@/components/layout/PromoBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PromoBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
