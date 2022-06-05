const dayjs = require('../../dayjs');
const getCollection = require('../getCollection');

const shiftDeleted = async ({ shiftId }) => {
  const shifts = await getCollection('shifts');
  const foundShift = shifts.find((shift) => shift.id === shiftId);

  const from = dayjs(foundShift.from);

  return `<p>
    Your shift on <strong>${from.format('LLL')}</strong> has been cancelled. Click on the button below to see your updated schedule.
  </p>
  <a
    style="
      display: block;
      width: min-content;
      white-space: nowrap;
      margin: 24px 0;
      padding: 10px 18px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      color: #fff;
      background-color: #413659;
      border-radius: 99px;
    "
    href="https://app.sparkscheduler.com"
    >Go to Spark</a
  >
  <p>
    If you believe a mistake has been made, please let us know by replying to this email.
  </p>`;
};

module.exports = shiftDeleted;
