// App.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lottie from "lottie-react";
import loadingAnimation from "./assets/loading.json";
import bot_icon from "./assets/bot_icon.jpg";

const API_URL =
    "https://opv17qccr5.execute-api.us-east-1.amazonaws.com/dev/invoke-agent";

// -------- Compact Embed Styles --------
const staticStyles = {
    container: {
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        padding: "8px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },

    header: {
        margin: "0 0 6px 0",
        padding: "4px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#009DB4",
    },

    subtitle: {
        margin: "0 0 8px 0",
        fontSize: "11px",
        color: "#666",
    },

    chatWindow: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        border: "1px solid #ddd",
        padding: "8px",
        overflowY: "auto",
        background: "#f9f9f9",
        borderRadius: "8px",
        marginBottom: "8px",
    },

    userBubbleContainer: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: "6px",
    },

    botBubbleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: "6px",
    },

    messageBubble: {
        padding: "8px",
        borderRadius: "9px",
        maxWidth: "78%",
        fontSize: "12px",
        lineHeight: 1.35,
        wordBreak: "break-word",
        overflowWrap: "anywhere",
    },

    userBubble: {
        backgroundColor: "#009DB4",
        color: "white",
        textAlign: "left",
    },

    botBubble: {
        backgroundColor: "#e5e5ea",
        color: "black",
        textAlign: "left",
    },

    botAvatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        marginRight: "6px",
        flexShrink: 0,
    },

    chatbox: {
        display: "flex",
        gap: "6px",
        alignItems: "center",
        width: "100%",
    },

    input: {
        flex: 1,
        height: "36px",
        fontSize: "12px",
        padding: "8px",
        resize: "none",
        border: "1px solid #ccc",
        borderRadius: "6px",
        outline: "none",
        boxSizing: "border-box",
    },

    button: {
        height: "36px",
        padding: "0 12px",
        fontSize: "12px",
        cursor: "pointer",
        backgroundColor: "#009DB4",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "700",
        whiteSpace: "nowrap",
    },

    loadingAnimation: {
        width: 34,
        height: 34,
    },
};

function useResponsiveStyles() {
    const [styles, setStyles] = useState(staticStyles);

    useEffect(() => {
        function handleResize() {
            const isVerySmall = window.innerWidth < 340;

            setStyles({
                ...staticStyles,
                container: {
                    ...staticStyles.container,
                    padding: isVerySmall ? "6px" : "8px",
                },
                header: {
                    ...staticStyles.header,
                    fontSize: isVerySmall ? "14px" : "16px",
                },
                subtitle: {
                    ...staticStyles.subtitle,
                    fontSize: isVerySmall ? "10px" : "11px",
                },
                messageBubble: {
                    ...staticStyles.messageBubble,
                    fontSize: isVerySmall ? "11px" : "12px",
                    maxWidth: isVerySmall ? "82%" : "78%",
                },
                botAvatar: {
                    ...staticStyles.botAvatar,
                    width: isVerySmall ? "28px" : "32px",
                    height: isVerySmall ? "28px" : "32px",
                },
                input: {
                    ...staticStyles.input,
                    fontSize: isVerySmall ? "11px" : "12px",
                },
                button: {
                    ...staticStyles.button,
                    padding: isVerySmall ? "0 10px" : "0 12px",
                    fontSize: isVerySmall ? "11px" : "12px",
                },
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return styles;
}

const normalizeMarkdown = (s) =>
    (s ?? "")
        .replace(/\r\n/g, "\n")
        .replace(/\u00A0/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/(^|\n)\s+(\d+)\.\s/g, "$1$2. ");

function App() {
    const responsiveStyles = useResponsiveStyles();

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([
        {
            text: `Hi! I'm Ask Me Bot. Ask about Shusei's projects, skills, background, or data science experience.`,
            sender: "bot",
        },
    ]);

    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const handleSend = async () => {
        if (!prompt.trim() || loading) return;

        const currentPrompt = prompt;
        const userMessage = { text: currentPrompt, sender: "user" };

        setMessages((prev) => [...prev, userMessage]);
        setPrompt("");
        setLoading(true);

        const thinkingMessage = {
            text: "Thinking...",
            sender: "bot",
            isThinking: true,
        };

        setMessages((prev) => [...prev, thinkingMessage]);

        try {
            const res = await axios.post(
                API_URL,
                { prompt: currentPrompt },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessages((prev) => prev.filter((msg) => !msg.isThinking));

            const clean = normalizeMarkdown(res.data?.response);
            const botMessage = { text: clean, sender: "bot" };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling API:", error);

            setMessages((prev) => prev.filter((msg) => !msg.isThinking));

            const errorMessage = {
                text: "Sorry, something went wrong. Please try again.",
                sender: "bot",
            };

            setMessages((prev) => [...prev, errorMessage]);
        }

        setLoading(false);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div style={responsiveStyles.container}>
            <h2 style={responsiveStyles.header}>Ask Me</h2>
            <p style={responsiveStyles.subtitle}>
                Ask about Shusei&apos;s projects, skills, and experience.
            </p>

            <div style={responsiveStyles.chatWindow}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={
                            msg.sender === "user"
                                ? responsiveStyles.userBubbleContainer
                                : responsiveStyles.botBubbleContainer
                        }
                    >
                        {msg.sender === "bot" && (
                            <img
                                src={bot_icon}
                                alt="Bot"
                                style={responsiveStyles.botAvatar}
                            />
                        )}

                        <div
                            style={{
                                ...responsiveStyles.messageBubble,
                                ...(msg.sender === "user"
                                    ? responsiveStyles.userBubble
                                    : responsiveStyles.botBubble),
                                whiteSpace: msg.sender === "user" ? "pre-wrap" : "normal",
                            }}
                        >
                            {msg.isThinking ? (
                                <Lottie
                                    animationData={loadingAnimation}
                                    style={responsiveStyles.loadingAnimation}
                                />
                            ) : (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ node, ...props }) => (
                                            <p style={{ margin: 0 }} {...props} />
                                        ),
                                        ol: ({ node, ...props }) => (
                                            <ol
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: 18,
                                                    listStylePosition: "outside",
                                                }}
                                                {...props}
                                            />
                                        ),
                                        ul: ({ node, ...props }) => (
                                            <ul
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: 18,
                                                    listStylePosition: "outside",
                                                }}
                                                {...props}
                                            />
                                        ),
                                        li: ({ node, ...props }) => (
                                            <li style={{ margin: "0.2rem 0" }} {...props} />
                                        ),
                                        a: ({ node, ...props }) => (
                                            <a target="_blank" rel="noopener noreferrer" {...props} />
                                        ),
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                ))}

                <div ref={chatEndRef} />
            </div>

            <div style={responsiveStyles.chatbox}>
                <textarea
                    style={responsiveStyles.input}
                    placeholder="Ask about Shusei..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        (e.preventDefault(), handleSend())
                    }
                />

                <button
                    style={responsiveStyles.button}
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
}

export default App;