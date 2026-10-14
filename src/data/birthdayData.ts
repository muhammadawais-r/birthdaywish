export interface PhotoItem {
  id: number;
  filename: string;
  localPath: string;
  assetPath: string;
  fallbackKeywords: string;
  title: string;
  caption: string;
  detail: string;
  accent: string;
}

export interface BirthdayMissionData {
  recipient: {
    fullName: string;
    nickname: string;
    title: string;
    subtitle: string;
  };
  introSequence: {
    terminalSteps: string[];
    mainHeadline: string;
    supportingMessage: string;
    enterButtonLabel: string;
  };
  confession: {
    eyebrow: string;
    mainTitle: string;
    paragraphs: string[];
    humorousNote: string;
    buttonLabel: string;
  };
  introvertJokes: {
    title: string;
    subtitle: string;
    jokes: {
      id: number;
      tag: string;
      quote: string;
      batteryLevel?: number;
    }[];
    buttonLabel: string;
  };
  photos: PhotoItem[];
  letter: {
    heading: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  cake: {
    title: string;
    instruction: string;
    actionLabel: string;
    wishedMessage: string;
  };
  celebration: {
    title: string;
    statements: string[];
    replayButtonLabel: string;
    footerText: string;
  };
}

export const BIRTHDAY_DATA: BirthdayMissionData = {
  recipient: {
    fullName: "Zyan Jigri",
    nickname: "Introvert",
    title: "THE INTROVERT EXPERIENCE",
    subtitle: "A Special Birthday Mission for Zyan Jigri",
  },
  introSequence: {
    terminalSteps: [
      "ACCESSING A VERY IMPORTANT MISSION…",
      "RECIPIENT IDENTIFIED: ZYAN JIGRI",
      "CLASSIFICATION: INTROVERT",
      "MISSION: MAKE THIS GUY FEEL SPECIAL.",
    ],
    mainHeadline: "Hey, Introvert. This One Is For You.",
    supportingMessage: "Your silence has been detected. Your birthday has been confirmed.",
    enterButtonLabel: "ENTER YOUR BIRTHDAY EXPERIENCE",
  },
  confession: {
    eyebrow: "CONFIDENTIAL TRANSMISSION",
    mainTitle: "WAIT… I HAVE A CONFESSION.",
    paragraphs: [
      "Your birthday deserved a message earlier. I was late, and I'm not going to pretend otherwise.",
      "BUT BEING LATE DOESN'T MEAN YOU'RE ANY LESS IMPORTANT, BRO.",
    ],
    humorousNote: "Even my birthday mission needed a system restart.",
    buttonLabel: "FINE, I'LL FORGIVE YOU… MAYBE",
  },
  introvertJokes: {
    title: "UNDERSTANDING THE LEGEND: INTROVERT",
    subtitle: "Documented behavioural anomalies of Zyan Jigri",
    jokes: [
      {
        id: 1,
        tag: "BATTERY DIAGNOSTIC",
        quote: "Social battery: 2%. Friendship level: 100%.",
        batteryLevel: 2,
      },
      {
        id: 2,
        tag: "COMMUNICATION PROTOCOL",
        quote: "Replies when he feels like it. Legendary behavior.",
      },
      {
        id: 3,
        tag: "INNER CIRCLE LAW",
        quote: "Doesn't need a crowd. Just the right people.",
      },
      {
        id: 4,
        tag: "TRUE IDENTITY",
        quote: "Quiet outside. Certified menace around his friends.",
      },
    ],
    buttonLabel: "OKAY, ENOUGH EXPOSING ME",
  },
  photos: [
    {
      id: 1,
      filename: "WhatsApp Image 2026-10-13 at 10.12.46 PM.jpeg",
      localPath: "/photos/zyan-1.jpg",
      assetPath: "/src/assets/images/zyan_photo_hoodie_1791956936158.jpg",
      fallbackKeywords: "Zyan Jigri in black hoodie before golden floral arch",
      title: "The Signature Presence",
      caption: "Another frame in the story.",
      detail: "Poised in the hoodie, golden floral arch, pure calm focus and warmth.",
      accent: "#f43f5e",
    },
    {
      id: 2,
      filename: "WhatsApp Image 2026-10-13 at 10.13.04 PM.jpeg",
      localPath: "/photos/zyan-2.jpg",
      assetPath: "/src/assets/images/zyan_photo_kurta_1791956937452.jpg",
      fallbackKeywords: "Zyan Jigri in traditional sky blue kurta with carved golden frame",
      title: "Sky Blue Elegance",
      caption: "Some moments deserve to stay.",
      detail: "Traditional charm, subtle warmth, quietly owning the room with effortless poise.",
      accent: "#ec4899",
    },
    {
      id: 3,
      filename: "WhatsApp Image 2026-10-13 at 10.13.05 PM (1).jpeg",
      localPath: "/photos/zyan-3.jpg",
      assetPath: "/src/assets/images/zyan_photo_cafe_1791956937718.jpg",
      fallbackKeywords: "Zyan Jigri seated in yellow shirt with arms folded candidly",
      title: "The Deep Thinker",
      caption: "Different days. Same friendship.",
      detail: "Arms crossed at the cafe table, observing the world on his own terms with quiet confidence.",
      accent: "#f59e0b",
    },
    {
      id: 4,
      filename: "WhatsApp Image 2026-10-13 at 10.13.05 PM (2).jpeg",
      localPath: "/photos/zyan-4.jpg",
      assetPath: "/src/assets/images/zyan_photo_smirk_1791956938246.jpg",
      fallbackKeywords: "Zyan Jigri at fast food cafe with subtle smirk",
      title: "Certified Menace Hours",
      caption: "Another frame in the story.",
      detail: "That slight smirk and chilled-out cafe hangout vibe — peak brother energy.",
      accent: "#db2777",
    },
    {
      id: 5,
      filename: "WhatsApp Image 2026-10-13 at 10.13.05 PM.jpeg",
      localPath: "/photos/zyan-5.jpg",
      assetPath: "/src/assets/images/zyan_photo_suv_1791956938187.jpg",
      fallbackKeywords: "Zyan Jigri leaning on white Land Cruiser with cap and sporty shirt",
      title: "Roadside Maverick",
      caption: "Some moments deserve to stay.",
      detail: "Blue cap, sporty fit, white SUV backdrop, effortless outdoor road trip cool.",
      accent: "#e11d48",
    },
    {
      id: 6,
      filename: "WhatsApp Image 2026-10-13 at 10.13.06 PM.jpeg",
      localPath: "/photos/zyan-6.jpg",
      assetPath: "/src/assets/images/zyan_photo_garden_1791956938560.jpg",
      fallbackKeywords: "Zyan Jigri seated on sunlit garden bench under tree",
      title: "Under The Tree of Calm",
      caption: "Different days. Same friendship.",
      detail: "Sunlight filtering through the canopy, peaceful afternoon, brothers sharing the day.",
      accent: "#be185d",
    },
  ],
  letter: {
    heading: "To Zyan Jigri — My Introvert, My Brother.",
    paragraphs: [
      "Happy Birthday, bro. ❤️",
      "First of all, yes, I'm late. You can officially add that to the list of things you'll never let me forget.",
      "Jokes aside, I'm genuinely glad to have you in my life. Not every friendship needs constant conversations, dramatic speeches, or a hundred messages every day. Sometimes, just knowing someone is there is enough.",
      "You're more than just a friend to me. You're someone I respect, someone I can laugh with, and someone whose place in my life isn't measured by how often we talk.",
      "I hope this new chapter brings you peace, happiness, success, and opportunities that make you proud of yourself. I hope you keep growing, keep smiling, and never forget that you deserve good things.",
      "May your problems get smaller, your dreams get bigger, and your bank balance finally stop acting introverted.",
    ],
    closing: "Always got your back,",
    signature: "Your Brother",
  },
  cake: {
    title: "MAKE A BIRTHDAY WISH",
    instruction: "Blow out the candles, Zyan.",
    actionLabel: "BLOW OUT THE CANDLES",
    wishedMessage: "Candles blown. The wish has been locked into the universe.",
  },
  celebration: {
    title: "HAPPY BIRTHDAY, ZYAN JIGRI",
    statements: [
      "May this year bring you real peace, massive wins, and fewer forced social gatherings.",
      "Never change who you are. The world has enough loud people; it needs more genuine brothers like you.",
      "Stay blessed, stay legendary, and enjoy your birthday.",
    ],
    replayButtonLabel: "REPLAY THE MISSION",
    footerText: "THE INTROVERT EXPERIENCE — EXCLUSIVE EDITION FOR ZYAN JIGRI",
  },
};
