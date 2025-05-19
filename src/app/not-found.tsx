import NotFoundIllustration from "@/components/ui/NotFoundIllustration";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <NotFoundIllustration />
      <h1 className="text-secondary mt-4 text-2xl">صفحه مورد نظر پیدا نشد</h1>
      <Link className="bg-secondary-400 mt-4 flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-white" href="/">
        <AiOutlineHome size={25} />
        بازگشت به خانه
      </Link>
    </div>
  );
}

export default NotFound;
