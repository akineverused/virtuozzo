import React from 'react';
import styles from './MyInputNumber.module.scss'

export const MyInputNumber:React.FC<MyInputNumberProps> = ({value, onChange, min}) => {
    const increment = () => {
        onChange(value + 1);
    };

    const decrement = () => {
        const newValue = Math.max(value - 1, min);
        onChange(newValue);
    };

    return (
        <div className={styles.wrap}>
            <div>
                <img
                    src="/minus.svg"
                    alt="minus"
                    onClick={decrement}
                />
                {value}
            </div>
            <img
                src="/plus.svg"
                alt="plus"
                onClick={increment}
            />
        </div>
    );
};

interface MyInputNumberProps{
    value: number;
    onChange: (newValue: number) => void;
    min: number;
}