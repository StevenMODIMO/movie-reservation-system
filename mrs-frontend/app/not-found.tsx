import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page No Found",
};

export default function GlobalNotFound() {
  return (
    <div className="bg-black/50 md:text-center text-2xl mt-56 p-2 w-fit rounded-md mx-auto">
      <div>404: Resource or Page Not Found!!😒😒</div>
    </div>
  );
}
