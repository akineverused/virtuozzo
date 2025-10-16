import React from 'react';
import styles from "./FieldWrapper.module.scss"

export const FieldWrapper:React.FC<FieldWrapperProps> = (
    {
        image,
        cost,
        period = "в день",
        label,
        text,
        info,
        children
    }
) => {
    return (
        <div className={styles.wrap}>
            <img src={image} alt={image}/>
            <div className={styles.body}>
                <div className={styles.field}>
                    <div>
                        {label}
                        {info && <img src="/info.svg" alt="info"/>}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                <h5>
                    {period === "в день"? cost : cost*30} <span>тг{text}/{period}</span>
                </h5>
            </div>
        </div>
    );
};

interface FieldWrapperProps{
    image: string;
    cost: number;
    label: string;
    text?: string;
    info?: boolean;
    period: string;
    children: React.ReactNode;
}