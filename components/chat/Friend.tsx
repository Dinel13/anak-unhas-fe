import Image from "next/image";
import { FC } from "react";
import { Friend } from "../../pages/chat";

interface FriendProps {
   crrnFrn: Friend;
   setCrrnFrn: (crrnFrn: Friend) => void;
 }

const Friend: FC<FriendProps> = ({ crrnFrn, setCrrnFrn }) => {
   return (
     <div
       className="flex p-3 hover:bg-d3 cursor-pointer"
       onClick={() => setCrrnFrn(crrnFrn)}
     >
       <div className="relative h-14">
         <Image
           src={crrnFrn.frn_image ? crrnFrn.frn_image : "/image/avatar.svg"}
           alt="avatar"
           className="rounded-full"
           layout="fill"
         />
       </div>
       <div className="ml-2 flex-grow flex flex-col items-start h-full">
         <div className="text-xl font-bold">{crrnFrn.frn_name}</div>
         <p className="text-sm text-gray-300 chat-truncate">{crrnFrn.message}</p>
       </div>
     </div>
   );
 };

 export default Friend;