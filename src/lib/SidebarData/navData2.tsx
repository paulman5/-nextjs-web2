import React from 'react'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    HomeOutlined,
  } from '@ant-design/icons';
  import Drafticon from "../icons/Sidebaricons/Drafticon";
  import Calendaricon from '../icons/Sidebaricons/Calendaricon';
  import type { MenuProps } from "antd";

export const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <Drafticon />,
      label: 'Documenteditor',
      className:"customicon"
    },
    {
      key: '3',
      icon: <Calendaricon />,
      label: 'Kanban',
      className:"customicon"
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Settings',
    },
    {
      key: '5',
      icon: <CloudOutlined />,
      label: 'Account',
    },
    {
      key: '6',
      icon: <AppstoreOutlined />,
      label: 'Store',
    },
    {
      key: '7',
      icon: <TeamOutlined />,
      label: 'Team',
    },
    {
      key: '8',
      icon: <ShopOutlined />,
      label: 'Shop',
    },
  ];