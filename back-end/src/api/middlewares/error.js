const error = async (err, _req, res, _next) => {
    if (err.isJoi) return res.status(400).json({ error: err.details[0].message });
    if (err.isExpected) return res.status(err.code).json({ error: err.message });

    console.log({ ...err });
    return res.status(500).json({ error: err });
};

module.exports = error;
