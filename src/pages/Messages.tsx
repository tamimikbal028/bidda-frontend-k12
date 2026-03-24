import { ConversationList, ChatArea } from "../components/Messages";

const Messages = () => {
  return (
    <div className="flex h-[calc(100vh-88px)] overflow-hidden rounded-lg bg-white shadow-sm">
      <ChatArea />
      <ConversationList />
    </div>
  );
};

export default Messages;
