import React from "react";

interface PageHeaderProps {
    label: string;
    titleOutline: string;
    titleSolid: string;
    titleColorClass?: "title-cyan" | "title-pink" | "title-amber" | string;
    description: string;
}

export default function PageHeader({
    label,
    titleOutline,
    titleSolid,
    titleColorClass = "title-cyan",
    description,
}: PageHeaderProps) {
    return (
        <div
            className="reveal"
            style={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto 4rem",
                position: "relative",
                zIndex: 1,
            }}
        >
            <div className="s-label" style={{ justifyContent: "center" }}>
                {label}
            </div>
            <h1 className="hero-title" style={{ fontSize: "clamp(3rem,8vw,6rem)", marginBottom: "1rem" }}>
                <span className="title-outline">{titleOutline}</span>{" "}
                <span className={titleColorClass}>{titleSolid}</span>
            </h1>
            <p className="hero-desc" style={{ margin: "0 auto" }}>
                {description}
            </p>
        </div>
    );
}
