"use client";

import React from 'react';
import styles from './Logo.module.css';
import { Orbitron, Share_Tech_Mono } from 'next/font/google';

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
    weight: ["700", "900"],
});

const shareTechMono = Share_Tech_Mono({
    variable: "--font-share-tech-mono",
    subsets: ["latin"],
    weight: ["400"],
});

interface LogoProps {
    variant?: 'dark' | 'light';
    scale?: number;
    className?: string;
}

export default function Logo({ variant = 'dark', scale = 1, className = '' }: LogoProps) {
    return (
        <div
            className={`${styles.logoWrap} ${variant === 'light' ? styles.light : ''} ${orbitron.variable} ${shareTechMono.variable} ${className}`}
            style={{ "--logo-scale": scale } as React.CSSProperties}
        >
            <div className={`${styles.corner} ${styles.cornerTl}`}></div>
            <div className={`${styles.corner} ${styles.cornerTr}`}></div>
            <div className={`${styles.corner} ${styles.cornerBl}`}></div>
            <div className={`${styles.corner} ${styles.cornerBr}`}></div>
            <div className={styles.accentTop}></div>
            <div className={styles.accentBottom}></div>

            <div className={styles.wordmark}>
                <div className={styles.brandName}>
                    <span className={styles.neo}>Neo</span>
                    <span className={styles.kLetter}>K</span>
                    <span className={styles.lyn}>lyn</span>
                </div>
                <div className={styles.tagline}>Next · Gen · Technology · Solutions</div>
                <div className={styles.dots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        </div>
    );
}
