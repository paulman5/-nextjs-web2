import react from "react";  
import Homeicon from "../icons/Sidebaricons/Homeicon";
import Drafticon from "../icons/Sidebaricons/Drafticon";
import Cpqicon from "../icons/Sidebaricons/Cpqicon";
import Calendaricon from "../icons/Sidebaricons/Calendaricon";
import Invoiceicon from "../icons/Sidebaricons/Invoiceicon";

export const navData3 = [
    {
        id:1,
        link:"/Home",
        title:() => "Home",
        icon:() => <Homeicon />
    },
    {
        id: 2,
        link: "/Drafthome",
        title:() => "Draft",
        icon: () => <Drafticon />,
      },
      {
        id: 3,
        link: "/Cpq",
        title:() => "Cpq",
        icon: () => <Cpqicon />,
      },
      {
        id: 4,
        link: "/Calendar",
        title:() => "Calendar",
        icon: () => <Calendaricon />,
      },
      {
        id: 5,
        link: "/Invoice",
        title:() => "Invoice",
        icon: () => <Invoiceicon />,
      },
];