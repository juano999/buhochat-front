import Header from "@/components/Header";
import Footer from "@/components/Footer.js";
import Body from "@/components/Body.js";
import { useAuth } from "@/contexts/auth";
import ChatBody from "./chats/ChatBody";
import ChatHeader from "@/components/ChatHeader.js"
import Loading  from "@/components/Loading";

const IndexPage = () => {
  const { user } = useAuth();
  return (
    <div>
      {user === null ? <Header /> : user === false ? <Header /> : <ChatHeader />}
      {user === null ? <Loading /> : user === false ? <Body /> : <ChatBody />}
      <Footer />
    </div>
  );
};

export default IndexPage;
