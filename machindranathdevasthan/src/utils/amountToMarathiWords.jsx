export const toMarathiWords = (num) => {
  if (num === null || num === undefined || num === "") return "";

  // Remove commas if any
  const n = parseInt(num.toString().replace(/,/g, ""), 10);
  if (isNaN(n) || n < 0) return "";

  const marathi0To99 = [
    "शून्य",
    "एक",
    "दोन",
    "तीन",
    "चार",
    "पाच",
    "सहा",
    "सात",
    "आठ",
    "नऊ",
    "दहा",
    "अकरा",
    "बारा",
    "तेरा",
    "चौदा",
    "पंधरा",
    "सोळा",
    "सतरा",
    "अठरा",
    "एकोणीस",
    "वीस",
    "एकवीस",
    "बावीस",
    "तेवीस",
    "चोवीस",
    "पंचवीस",
    "सव्वीस",
    "सत्तावीस",
    "अठ्ठावीस",
    "एकोणतीस",
    "तीस",
    "एकतीस",
    "बत्तीस",
    "तेहतीस",
    "चौतीस",
    "पस्तीस",
    "छत्तीस",
    "सदतीस",
    "अडतीस",
    "एकोणचाळीस",
    "चाळीस",
    "एक्केचाळीस",
    "बेचाळीस",
    "त्रेचाळीस",
    "चव्वेचाळीस",
    "पंचेचाळीस",
    "सेहेचाळीस",
    "सत्तेचाळीस",
    "अठ्ठेचाळीस",
    "एकोणपन्नास",
    "पन्नास",
    "एक्कावन्न",
    "बावन्न",
    "त्रेपन्न",
    "चोपन्न",
    "पंचावन्न",
    "छप्पन्न",
    "सत्तावन्न",
    "अठ्ठावन्न",
    "एकोणसाठ",
    "साठ",
    "एकसष्ट",
    "बासष्ट",
    "त्रेसष्ट",
    "चौसष्ट",
    "पासष्ट",
    "सहासष्ट",
    "सडसष्ट",
    "अडुसष्ट",
    "एकोणसत्तर",
    "सत्तर",
    "एक्काहत्तर",
    "बहात्तर",
    "त्र्याहत्तर",
    "चौर्‍याहत्तर",
    "पंच्याहत्तर",
    "शहात्तर",
    "सत्याहत्तर",
    "अठ्ठ्याहत्तर",
    "एकोणऐंशी",
    "ऐंशी",
    "एक्याऐंशी",
    "ब्याऐंशी",
    "त्र्याऐंशी",
    "चौर्‍याऐंशी",
    "पंच्याऐंशी",
    "शहाऐंशी",
    "सत्त्याऐंशी",
    "अठ्ठ्याऐंशी",
    "एकोणनव्वद",
    "नव्वद",
    "एक्याण्णव",
    "ब्याण्णव",
    "त्र्याण्णव",
    "चौर्‍याण्णव",
    "पंच्याण्णव",
    "शहाण्णव",
    "सत्त्याण्णव",
    "अठ्ठ्याण्णव",
    "नव्याण्णव",
  ];

  const convert = (amount) => {
    if (amount === 0) return "";
    if (amount < 100) return marathi0To99[amount];

    if (amount < 1000) {
      const hundreds = Math.floor(amount / 100);
      const remainder = amount % 100;
      const hundredWord = `${marathi0To99[hundreds]}शे`;
      return remainder ? `${hundredWord} ${convert(remainder)}` : hundredWord;
    }

    if (amount < 100000) {
      const thousands = Math.floor(amount / 1000);
      const remainder = amount % 1000;
      return remainder
        ? `${convert(thousands)} हजार ${convert(remainder)}`
        : `${convert(thousands)} हजार`;
    }

    if (amount < 10000000) {
      const lakhs = Math.floor(amount / 100000);
      const remainder = amount % 100000;
      return remainder
        ? `${convert(lakhs)} लाख ${convert(remainder)}`
        : `${convert(lakhs)} लाख`;
    }

    if (amount < 1000000000) {
      const crores = Math.floor(amount / 10000000);
      const remainder = amount % 10000000;
      return remainder
        ? `${convert(crores)} कोटी ${convert(remainder)}`
        : `${convert(crores)} कोटी`;
    }

    return "";
  };

  return n === 0 ? "शून्य रुपये फक्त" : `${convert(n)} रुपये फक्त`;
};
