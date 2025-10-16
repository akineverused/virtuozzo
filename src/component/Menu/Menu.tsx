import React, {useEffect, useState} from 'react';
import styles from './Menu.module.scss'
import {Modal, Segmented, Select} from "antd";
import {MyInputNumber} from "@/component/MyInputNumber/MyInputNumber";
import {FieldWrapper} from "@/component/FieldWrapper/FieldWrapper";

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [period, setPeriod] = useState("в день");
    const [totalCost, setTotalCost] = useState(3000);
    const [values, setValues] = useState({
        cpuCores: 0,
        ramGb: 0,
        nvmeDiskGb: 0,
        archive_disk_gb: 0,
        public_network: "none",
        routable_ips: 0,
        router_type: "compact"
    });

    const publicNetworkOptions = [
        {label: "Не заказывать", value: "none", cost: 0},
        {label: "Заказывать", value: "ordered", cost: 2000},
    ];

    const routerTypeOptions =[
        {label: "1 vCPU, 512 MB RAM", value: "compact", cost: 3000},
        {label: "2 vCPU, 1 GB RAM", value: "large", cost: 6000},
    ]

    const currentPublicNetwork = publicNetworkOptions.find(o => o.value === values.public_network)?.cost ?? 0;
    const currentRouterType = routerTypeOptions.find(o => o.value === values.router_type)?.cost ?? 0;

    const fields = [
        {
            label: "Ядра процессора",
            image: "/core.svg",
            cost: 1900,
            text: " за ядро",
            children: (
                <MyInputNumber
                    value={values.cpuCores}
                    onChange={(val) => setValues(prev => ({ ...prev, cpuCores: val }))}
                    min={0}
                />
            )
        },
        {
            label: "Оперативная память, ГБ",
            image: "/Ram.svg",
            cost: 5200,
            text: " за ГБ",
            children: (
                <MyInputNumber
                    value={values.ramGb}
                    onChange={(val) => setValues(prev => ({ ...prev, ramGb: val }))}
                    min={0}
                />
            )
        },
        {
            label: "Быстрый диск NVME, ГБ",
            image: "/HDD.svg",
            cost: 160,
            text: " за ГБ",
            info: true,
            children: (
                <MyInputNumber
                    value={values.nvmeDiskGb}
                    onChange={(val) => setValues(prev => ({ ...prev, nvmeDiskGb: val }))}
                    min={0}
                />
            )
        },
        {
            label: "Архивный диск, ГБ",
            image: "/Archive_Disk.svg",
            cost: 10,
            text: " за ГБ",
            info: true,
            children: (
                <MyInputNumber
                    value={values.archive_disk_gb}
                    onChange={(val) => setValues(prev => ({ ...prev, archive_disk_gb: val }))}
                    min={0}
                />
            )
        },
        {
            label: "Публичная сеть",
            image: "/Public_Network.svg",
            cost: currentPublicNetwork,
            children: (
                <Select
                    defaultValue="Не заказывать"
                    variant="borderless"
                    onChange={(val) => setValues((prev) => ({ ...prev, public_network: val }))}
                    className={styles.select}
                    options={publicNetworkOptions.map((o) => ({
                        value: o.value,
                        label: o.label,
                    }))}
                />
            )
        },
        {
            label: "Маршрутизируемые IP-адреса",
            image: "/Routable_IPs.svg",
            cost: 1000,
            text: " за адрес",
            info: true,
            children: (
                <MyInputNumber
                    value={values.routable_ips}
                    onChange={(val) => setValues(prev => ({ ...prev, routable_ips: val }))}
                    min={0}
                />
            )
        },
        {
            label: "Маршрутизатор",
            image: "/Router.svg",
            cost: currentRouterType,
            info: true,
            children: (
                <Select
                    defaultValue="1 vCPU, 512 MB RAM"
                    variant="borderless"
                    onChange={(val) => setValues((prev) => ({ ...prev, router_type: val }))}
                    className={styles.select}
                    options={routerTypeOptions.map((o) => ({
                        value: o.value,
                        label: o.label,
                    }))}
                />
            )
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(()=> {
        let cost =
            values.cpuCores * 1900 +
            values.ramGb * 5200 +
            values.nvmeDiskGb * 160 +
            values.archive_disk_gb * 10 +
            currentPublicNetwork +
            values.routable_ips * 1000 +
            currentRouterType;

        if (period === "в месяц") {
            cost *= 30;
        }

        setTotalCost(cost);
    }, [values, period, currentPublicNetwork, currentRouterType]);

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                Ресурсы вашего облака Virtuozzo PaaS
                <Segmented
                    options={["в день", "в месяц"]}
                    value={period}
                    onChange={(val) => setPeriod(val)}
                    style={{
                        backgroundColor: "#F2F5F7",
                        fontFamily: "Open Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: 12,
                    }}
                />
            </div>
            <div className={styles.fieldGrid}>
                {fields.map((field) => (
                    <FieldWrapper
                        key={field.label}
                        image={field.image}
                        label={field.label}
                        cost={field.cost}
                        info={field.info}
                        period={period}
                    >
                        {field.children}
                    </FieldWrapper>
                ))}
            </div>
            <div className={styles.order}>
                <button onClick={showModal}>
                    Заказать
                </button>
                <Modal
                    title="Добавлено в корзину"
                    closable
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />

                <div>
                    за <span>{totalCost}</span> тг/{period}
                </div>
            </div>
        </div>
    );
};

export default Menu;