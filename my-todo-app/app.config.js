import 'dotenv/config';

export default {
  expo: {
    name: "my-todo-app",
    slug: "my-todo-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash/IconSplash.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash/IconSplash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: ""
    },
    plugins: ["expo-font"],
    extra: {
      BASE_URL: process.env.BASE_URL,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    }
  }
}
