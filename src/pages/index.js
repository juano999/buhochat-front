import Header from "@/components/Header";
import Footer from "@/components/Footer.js";
import Body from "@/components/Body.js";
import { useAuth } from "@/contexts/auth";
import ChatBody from "./chats/ChatBody";

const IndexPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      {user === null ? "Cargando..." : user === false ? <Body /> : <ChatBody />}

      <Footer />
    </div>
  );
};

export default IndexPage;
