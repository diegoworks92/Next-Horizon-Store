import { MainProducts } from "../../components/home/MainProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Horizon",
  description: "Welcome to the future world, an ecommerce from other century",
  keywords: [
    "ecommerce",
    "future",
    "next",
    "horizon",
    "technology",
    "innovation",
  ],
  icons: { icon: "/svg/robot.svg" },
};

export default function Home() {
  return <main>{/*  <MainProducts /> */}</main>;
}
