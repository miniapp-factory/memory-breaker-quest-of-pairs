import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import MainMenu from "@/components/MainMenu";
import GameScreen from "@/components/GameScreen";

export { generateMetadata };

export default function Home() {
  // Render the main menu or game screen based on URL
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  if (path === "/game") {
    return <GameScreen />;
  }
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <MainMenu />
    </main>
  );
}
