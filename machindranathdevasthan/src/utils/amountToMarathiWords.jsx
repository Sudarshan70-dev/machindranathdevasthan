export const toMarathiWords = (num) => {
    if (!num) return "";
    // Remove commas if any
    const n = parseInt(num.toString().replace(/,/g, ""));
    if (isNaN(n)) return "";

    const a = [
      "",
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
    ];
    const b = [
      "",
      "",
      "वीस",
      "तीस",
      "चाळीस",
      "पन्नास",
      "साठ",
      "सत्तर",
      "ऐंशी",
      "नव्वद",
    ];

    const convert = (amount) => {
      if (amount < 20) return a[amount];
      if (amount < 100)
        return (
          b[Math.floor(amount / 10)] +
          (amount % 10 !== 0 ? " " + a[amount % 10] : "")
        );
      if (amount < 1000)
        return (
          a[Math.floor(amount / 100)] +
          " शे " +
          (amount % 100 !== 0 ? convert(amount % 100) : "")
        );
      if (amount < 100000)
        return (
          convert(Math.floor(amount / 1000)) +
          " हजार " +
          (amount % 1000 !== 0 ? convert(amount % 1000) : "")
        );
      if (amount < 10000000)
        return (
          convert(Math.floor(amount / 100000)) +
          " लाख " +
          (amount % 100000 !== 0 ? convert(amount % 100000) : "")
        );
      return "";
    };

    return n === 0 ? "शून्य" : convert(n) + " रुपये फक्त";
  };