
export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
}

export interface Project {
    name: string;
    description: string;
    url: string;
    tags?: string[];
    type?: 'major' | 'minor' | 'internship' | 'github';
    downloadUrl?: string;
    detailedDescription?: string;
}


export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    url: string;
}

export interface Publication {
    title: string;
    authors: string;
    venue: string;
    type: string;
    abstract: string;
    links: {
        paper?: string;
        code?: string;
        demo?: string;
        supplement?: string;
    };
}

export const EXPERIENCES: Experience[] = [
    {
        title: "Machine Learning Engineer",
        company: "TAI Inc.",
        period: "May 2024 – Present",
        description: "Responsible for the development and deployment of machine learning models, with a focus on computer vision and large language model (LLM)-based systems. Collaborate with international teams to deliver scalable and efficient AI-driven solutions.",
        achievements: [
            "Designed and integrated computer vision models for a Document Verification System utilized in visa processing workflows",
            "Contributed to the development of a Retrieval-Augmented Generation (RAG) application, Sensei GPT, for educational content generation using LLMs",
            "Developed a FastAPI-based service for deploying a facial recognition system",
            "Worked closely with global stakeholders and senior engineers to engineer production-ready ML solutions"
        ]
    },
    {
        title: "Machine Learning Trainee – R&D Focus",
        company: "TAI Inc.",
        period: "Feb 2024 – May 2024",
        description: "Engaged in applied research in the domains of LLM fine-tuning and retrieval-augmented generation. Investigated and implemented advanced techniques to enhance model efficiency and adaptability.",
        achievements: [
            "Implemented cutting-edge RAG techniques, including Graph RAG architectures",
            "Explored and applied parameter-efficient fine-tuning methods such as LoRA and QLoRA",
            "Researched and tested model merging methodologies for optimized performance",
            "Investigated methods for extending context length in pre-trained language models"
        ]
    },
    {
        title: "Python Intern",
        company: "TAI Inc.",
        period: "Nov 2023 – Feb 2024",
        description: "Supported natural language processing model development while gaining hands-on experience with modern ML tools in a production-oriented environment.",
        achievements: [
            "Initiated development of a Nepali text summarization model using BART, including dataset curation and training",
            "Applied LoRA for fine-tuning, acquiring practical understanding of parameter-efficient fine-tuning techniques",
            "Gained experience with tools such as Docker, Jenkins, and the Neo4j graph database"
        ]
    }
];

export const MAJOR_PROJECTS: Project[] = [
    {
        name: "Automatic Music Generation",
        type: 'major',
        description: "Bachelor's Degree Final Year",
        detailedDescription: "Developed a system capable of generating novel musical compositions with multiple instrument tracks. Investigated various neural network architectures for sequential data generation, implementing an LSTM-based model for music creation. Explored hybrid approaches combining algorithmic composition (tone-matrix derived from image data) with deep learning model outputs.",
        downloadUrl: "https://drive.google.com/drive/folders/1ZsLWk0B2BmMbE0fqo6sSO5H2HlNNxwGY",
        url: "#"
    },
    {
        name: "Music Genre Recognition using Deep Learning",
        type: 'minor',
        description: "Bachelor's Degree Third Year",
        detailedDescription: "Applied Convolutional Neural Networks (CNNs) within the PyTorch framework for classifying music genres from audio features. Experimented with different CNN architectures and hyperparameters to optimize genre recognition accuracy on the GTZAN dataset.",
        url: "https://github.com/realsanjeev/Music-genre-classification-using-deep-learning"
    },
    {
        name: "Abstractive Text Summarization in Nepali using BART",
        type: 'internship',
        description: "ML Internship",
        detailedDescription: "Developed and fine-tuned a BART-based model for abstractive summarization of Nepali news articles. Implemented and evaluated the Low-Rank Adaptation (LoRA) technique for parameter-efficient fine-tuning (PEFT) in a resource-constrained setting.",
        url: "https://medium.com/@sanjeev-bhandari/nepali-text-summarization-2df72a8a3080"
    }
];

export const GITHUB_PROJECTS: Project[] = [
    {
        name: "Essay Writer Using Agent",
        description: "A blog-writing app that uses an autonomous agent to search the web and generate content, built with LangGraph.",
        url: "https://github.com/realsanjeev/Essay-writer-using-Agent",
    },
    {
        name: "OpenCV Object Detection",
        description: "Object detection using the Mediapipe library, along with a prototype app that enables drawing through hand gestures.",
        url: "https://github.com/realsanjeev/Object-Detection-using-OpenCV",
    },
    {
        name: "Real-Time Whisper Transcription",
        description: "A real-time transcription app powered by Whisper, useful for generating subtitles for live video content.",
        url: "https://github.com/realsanjeev/whisper-realtime-transcriber",
    },
    {
        name: "Reinforcement Learning in Python Game",
        description: "An implementation of reinforcement learning applied to the classic Snake game, demonstrating AI gameplay.",
        url: "https://github.com/defyingdemonprogram/Reinforcement-Learning-in-Python-Game",
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Nepali Text Summarization",
        excerpt: "This project addresses the challenges of Nepali text summarization using transformer models like mBART, focusing on fine-tuning for linguistic accuracy and data scarcity.",
        date: "Feb 26, 2024",
        readTime: "7 min read",
        tags: ["Nepali NLP", "Transformer Models", "mBART", "Text Summarization", "Multilingual AI"],
        url: "https://medium.com/@sanjeev-bhandari/nepali-text-summarization-2df72a8a3080"
    },
    {
        title: "Model Merging: A new way of creating model",
        excerpt: "Explore innovative techniques like SLERP, TIES, and DARE to merge multiple language models into a single, efficient model without extensive retraining.",
        date: "Jul 6, 2024",
        readTime: "4 min read",
        tags: ["Model Merging", "SLERP", "TIES", "DARE", "Language Models", "AI Efficiency"],
        url: "https://medium.com/@sanjeev-bhandari/model-merging-a-new-way-of-creating-model-e62e6d14ef97"
    },
    {
        title: "🦀 Supercharge Python with Rust: Building Fast Python Extensions with PyO3 and Maturin",
        excerpt: "Learn how to enhance Python performance by building native extensions using Rust, PyO3, and Maturin, including benchmarking for performance gains.",
        date: "May 23, 2025",
        readTime: "3 min read",
        tags: ["Python", "Rust", "PyO3", "Maturin", "Performance Optimization", "Machine Learning"],
        url: "https://medium.com/@sanjeev-bhandari/supercharge-python-with-rust-building-fast-python-extensions-with-pyo3-and-maturin-da09306d97a8"
    },
    {
        title: "Creating the SnowFlake In C using recursive method with raylib",
        excerpt: "A step-by-step guide to drawing a recursive snowflake fractal in C using Raylib, covering setup, code implementation, and build automation.",
        date: "Nov 27, 2024",
        readTime: "4 min read",
        tags: ["C Programming", "Raylib", "Graphics Programming", "Fractals", "Recursive Algorithms"],
        url: "https://medium.com/@sanjeev-bhandari/creating-the-snowflake-in-c-using-raylib-07a0c4fa5e17"
    },
    {
        title: "Understanding Edge Detection: A Mathematical Approach in Computer Vision",
        excerpt: "Delve into the fundamental role of edge detection in identifying boundaries in images, exploring mathematical gradients and pixel intensity changes.",
        date: "Jun 19, 2025",
        readTime: "6 min read",
        tags: ["Computer Vision", "Mathematics", "Edge Detection", "Image Processing"],
        url: "https://medium.com/@sanjeev-bhandari/understanding-edge-detection-a-mathematical-approach-in-computer-vision-9154407886a1"
    },
    {
        title: "A Simple Introduction to Structural Similarity Index(SSIM)",
        excerpt: "Explore SSIM as a perceptual metric for measuring image similarity, focusing on luminance, contrast, and structural information beyond individual pixels.",
        date: "Jan 11, 2026",
        readTime: "6 min read",
        tags: ["Image Quality", "SSIM", "Computer Vision", "Perceptual Metrics"],
        url: "https://medium.com/@sanjeev-bhandari/a-simple-introduction-to-structural-similarity-index-ssim-20092c4cd547"
    }
];

export const PUBLICATIONS: Publication[] = [
    {
        title: "Advances in Deep Learning for Computer Vision: A Comprehensive Survey",
        authors: "Sanjeev Bhandari, Co-Author A, Co-Author B",
        venue: "Conference on Computer Vision and Pattern Recognition (CVPR) 2023",
        type: "Conference Paper",
        abstract: "This paper presents a comprehensive survey of recent advances in deep learning architectures for computer vision tasks, highlighting breakthrough methods and future research directions.",
        links: {
            paper: "#",
            code: "#",
            demo: "#"
        }
    },
    {
        title: "Efficient Training of Large Language Models with Distributed Computing",
        authors: "Sanjeev Bhandari, Research Team",
        venue: "International Conference on Machine Learning (ICML) 2023",
        type: "Conference Paper",
        abstract: "We propose a novel distributed training framework that significantly reduces the computational overhead of training large language models while maintaining model performance.",
        links: {
            paper: "#",
            code: "#"
        }
    },
    {
        title: "Transfer Learning in Medical Image Analysis: Challenges and Opportunities",
        authors: "Sanjeev Bhandari, Medical AI Team",
        venue: "Journal of Machine Learning Research (JMLR) 2022",
        type: "Journal Article",
        abstract: "This work explores the application of transfer learning techniques in medical imaging, addressing domain adaptation challenges and presenting novel solutions for healthcare AI.",
        links: {
            paper: "#",
            supplement: "#"
        }
    }
];

export const SKILLS = [
    {
        category: "Research Interests",
        items: ['Natural Language Processing', 'Computer Vision', 'Large Language Models', 'PEFT Techniques', 'AI Safety', 'Deep Learning']
    },
    {
        category: "Technical Skills",
        items: [
            { name: "Programming Languages", value: "Python (Proficient), Java, C, C++, JavaScript" },
            { name: "AI/ML Libraries", value: "PyTorch, HuggingFace, LangChain, TensorFlow/Keras, Scikit-learn" },
            { name: "Web Frameworks", value: "FastAPI, Django, Streamlit, Flask" },
            { name: "Developer Tools", value: "Git, Docker, Jenkins, Linux/Unix" }
        ]
    }
];

export const NAV_ITEMS = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
];
