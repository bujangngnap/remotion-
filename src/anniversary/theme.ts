import { loadFont as loadScript } from "@remotion/google-fonts/GreatVibes";
import { loadFont as loadSans } from "@remotion/google-fonts/Poppins";

export const { fontFamily: fontScript } = loadScript("normal", { weights: ["400"], subsets: ["latin"] });
export const { fontFamily: fontSans } = loadSans("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const WARNA = {
  bg: "#1a0b1e",
  bg2: "#2b0f2e",
  emas: "#ffd6a5",
  krem: "#fff5f8",
};
