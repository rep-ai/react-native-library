// dateTimeConvert.js
const dateTimeConvert = (date = new Date()) => (
    new Date(Date.parse(date)).toISOString()
)

export default dateTimeConvert
