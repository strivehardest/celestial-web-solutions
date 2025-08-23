import "../styles/globals.css";
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { pageTransitions } from "../utils/pageTransitions";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const transition =
    pageTransitions[router.route.replace("/", "")] || pageTransitions.home;

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}


