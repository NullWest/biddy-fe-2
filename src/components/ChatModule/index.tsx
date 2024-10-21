import { useQueryMachine } from '../../stateMachines/queryMachine';
import LargeQuery from '../largeQuery';
import UserInputField from '../userInputField';
import ChatBubble from './chatBubble';

export default function ChatModule() {
    const { conversationsData, addConversationsData } = useQueryMachine();
    const isInitialChat = conversationsData.length < 1;
    const initialQuery = "What are we building?";
    const handleSubmit = (response: string) => {
        console.log('user wrote', response);
        addConversationsData({
            userName: 'guest', // TODO if username, add here
            message: response,
            timestamp: Date.now(),
            isUser: true,
        });
        addConversationsData({
            userName: 'biddybot', // TODO if username, add here
            message: "I don't have any response yet.",
            timestamp: Date.now(),
            isUser: false,
        });
    };

    const printPastMessages = conversationsData.map((msg, idx) => {
        return (
            <ChatBubble
                key={idx}
                userName={msg.userName}
                message={msg.message}
                timestamp={msg.timestamp}
                isUser={msg.isUser}
            />
        );
    });

    if(isInitialChat){
        return (
            <div className={`flex justify-center`}>
                <div className="flex flex-col w-[70%]">
                    <div className="flex-grow">
                        <div className="pb-4">
                            <LargeQuery queryString={initialQuery} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <UserInputField onSubmit={(response: string) => handleSubmit(response)} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`flex justify-center h-screen`}>
                <div className="flex flex-col w-[70%] h-full">
                    <div className="flex-grow overflow-y-auto">
                        <div>
                            {printPastMessages}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <UserInputField onSubmit={(response: string) => handleSubmit(response)} />
                    </div>
                </div>
            </div>
        ); 
    }
       
}