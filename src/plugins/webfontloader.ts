import webFontLoader from "webfontloader";
export function useFonts() {
  webFontLoader.load({
    classes: false,
    google: {
      families: ["Google Sans:100,300,400,500,700,900&display=swap"],
    },
  });
}
