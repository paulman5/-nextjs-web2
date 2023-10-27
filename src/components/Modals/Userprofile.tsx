import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../UI/hover-card";
import Credentials from "../UI/Credentials";

type UserprofileProps = {
  children: React.ReactNode;
};

export default function Userprofile(props: UserprofileProps) {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-center">
              <Credentials
                user={{
                  firstName: "Paul",
                  lastName: "Mierlo",
                }}
                displayInitials={false}
              />
            </div>
            <div className="flex justify-center mt-10">
              <button className="bg-newblack text-white w-20 h-7 text-sm hover:bg-gray-600 transition-all">
                <a href="/api/auth/logout">Log out</a>
              </button>
            </div>
          </HoverCardContent>
          {props.children}
        </HoverCardTrigger>
      </HoverCard>
    </div>
  );
}
