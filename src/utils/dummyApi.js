export const fetchData = async (start, end, timezone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "SHIELD", date: start, amount: "$120", status: "Paid" },
        { name: "SUDHAKAR", date: end, amount: "$90", status: "Pending" },
        { name: "Calender", date: end, amount: "$90", status: "Adjusted" },
        { name: "shieldtask", date: end, amount: "$90", status: "paid" },
      ]);
    }, 500);
  });
};
