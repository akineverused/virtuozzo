'use client';

import styles from "./page.module.scss";
import {Avatar, Badge, ConfigProvider, Layout} from "antd";
import Menu from "@/component/Menu/Menu";

const { Header, Content, Sider } = Layout;

export default function Home() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Badge: {
                        dotSize: 8,
                    },
                },
            }}
        >
            <Layout>
                <Header style={{
                    backgroundColor: '#FFFFFF',
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 14px',
                    justifyContent: "space-between",
                    lineHeight: 'normal',
                }}>
                    <div className={styles.logoName}>
                        <img src="/pscs_logo 1.svg" alt="Company logo"/>
                        <div className={styles.text}>
                            <div>Консоль</div>
                            <div>управления</div>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <Badge
                            dot
                            color={"#51BB76"}
                            offset={[-3, 3]}
                        >
                            <div className={styles.notifications}>
                                <img src="/bellIcon.svg" alt="bell"/>
                            </div>
                        </Badge>
                        <div className={styles.accountBalance}>
                            <Avatar
                                size={30}
                                icon={<img src="/tenge.svg" alt="тенге" style={{ width: 16, height: 'auto' }} />}
                                style={{
                                    backgroundColor: '#F2F5F7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            />
                            <div className={styles.text}>
                                ID123456 <span>0 тг</span>
                            </div>
                        </div>
                        <div className={styles.accountBalance}>
                            <Avatar
                                size={30}
                                style={{
                                    backgroundColor: '#B03273',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                K
                            </Avatar>
                            <div className={styles.text}>
                                Имя <span>Фамилия</span>
                            </div>
                        </div>
                    </div>
                </Header>
                <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
                    <Sider
                        className={styles.sider}
                        width={60}

                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <div className={styles.iconContainer}>
                                <img src="/menu.svg" alt="menu" />
                                <div className={styles.badge}>
                                    <img src="/help.svg" alt="help" />
                                </div>
                            </div>

                            <div className={styles.iconContainer}>
                                <img src="/help.svg" alt="help" />
                            </div>

                            <div className={styles.iconContainer}>
                                <img src="/night.svg" alt="menu" />
                                <img src="/language.svg" alt="menu" />
                                <img src="/bi_pin-angle-fill.svg" alt="menu" />
                            </div>
                        </div>
                    </Sider>
                    <Content>
                        <Menu/>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>

    );
}